import React from "react";
import { RobotConfig } from "./utils";


const timeoutForMicrophoneTestToRun = 50;
const timeoutWaitForMicrophoneToClose = 1300;

export function useRobotInitiator(info, verbose, playerRef) {
  const [availableRobots, setAvailableRobots] = React.useState([]);
  const [previewRobot, setPreviewRobot] = React.useState(RobotConfig.load());
  const [stageRobot, setStageRobot] = React.useState(null);
  const [stageUUID, setStageUUID] = React.useState(null);
  const [robotReady, setRobotReady] = React.useState(false);

  const [booting, setBooting] = React.useState(true);
  const [allowed, setAllowed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const isLo = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isHttps = window.location.protocol === 'https:';
    const securityAllowed = isLo || isHttps;
    securityAllowed || info('sys', `App started, allowed=${securityAllowed}`);
    securityAllowed || alert(`HTTPS is required!`);
    verbose(`App started, allowed=${securityAllowed}, lo=${isLo}, https=${isHttps}`);
    if (!securityAllowed) return;

    new Promise(resolve => {
      verbose(`Start: Open microphone`);

      navigator.mediaDevices.getUserMedia(
        { audio: true }
      ).then((stream) => {
        verbose(`Start: Microphone opened, try to record`);
        const recorder = new MediaRecorder(stream);

        const audioChunks = [];
        recorder.addEventListener("dataavailable", ({ data }) => {
          setAllowed(true);
          audioChunks.push(data);
        });
        recorder.addEventListener("stop", async () => {
          verbose(`Start: Microphone ok, chunks=${audioChunks.length}, state=${recorder.state}`);
          stream.getTracks().forEach(track => track.stop());
          setTimeout(() => {
            verbose(`Start: Microphone test ok.`);
            resolve();
          }, timeoutWaitForMicrophoneToClose);
        });

        recorder.start();
        setTimeout(() => {
          recorder.stop();
          verbose(`Start: Microphone stopping, state is ${recorder.state}`);
        }, timeoutForMicrophoneTestToRun);
      }).catch(error => alert(`Open microphone error: ${error}`));
    }).then(() => {
      setBooting(false);
    });
  }, [info, verbose, setAllowed, setBooting]);

  React.useEffect(() => {
    if (!allowed) return;

    verbose(`Start: Create a new stage`);

    fetch('https://solulu4u.com/api/ai-talk/start/', {
      method: 'POST',
    }).then(response => {
      return response.json();
    }).then((data) => {
      verbose(`Start: Create stage success: ${data.data.sid}, ${data.data.robots.length} robots`);
      setStageUUID(data.data.sid);
      setAvailableRobots(data.data.robots);
      setLoading(false);

      const config = RobotConfig.load();
      if (config) {
        const robot = data.data.robots.find(robot => robot.uuid === config.uuid);
        if (robot) {
          setPreviewRobot(robot);
          info('sys', `Use robot ${robot.label}`);
          verbose(`Use previous robot ${robot.label} ${robot.uuid}`);
        }
      }
    }).catch((error) => alert(`Create stage error: ${error}`));
  }, [setLoading, setAvailableRobots, setPreviewRobot, allowed, setStageUUID]);

  const onStartStage = React.useCallback(() => {
    verbose("Start the app");
    if (!previewRobot || !stageUUID) return;
    setStageRobot(previewRobot);

    verbose(`Start: Play hello welcome audio`);

    const listener = () => {
      playerRef.current.removeEventListener('ended', listener);

      setRobotReady(true);
      info('sys', `Conversation started, AI is ready`);
      verbose(`Stage started, AI is ready, sid=${stageUUID}`);
    };
    playerRef.current.addEventListener('ended', listener);

    info('sys', '');
    playerRef.current.src = `https://solulu4u.com/api/ai-talk/examples/${previewRobot.voice}?sid=${stageUUID}`;
    playerRef.current.play().catch(error => alert(`Play error: ${error}`));
  }, [info, verbose, playerRef, setStageRobot, previewRobot, stageUUID, robotReady]);

  const onUserSelectRobot = React.useCallback((e) => {
    if (!e.target.value) return setPreviewRobot(null);

    const robot = availableRobots.find(robot => robot.uuid === e.target.value);
    setPreviewRobot(robot);
    RobotConfig.save(robot);
    info('sys', `Change robot to ${robot.label}`);
    verbose(`Change to robot ${robot.label} ${robot.uuid}`);
  }, [info, verbose, availableRobots, setPreviewRobot]);

  return [stageRobot, stageUUID, robotReady, <div className='SelectRobotDiv'>
    {!booting && !allowed && <p style={{ color: "red" }}>
      Error: Only allow localhost or https to access microphone.
    </p>}

    <p>
      {availableRobots?.length ? <React.Fragment>
        Assistant: &nbsp;
        <select className='SelectRobot' defaultValue={previewRobot?.uuid}
          onChange={(e) => onUserSelectRobot(e)}>
          <option value=''>Please select a robot</option>
          {availableRobots.map(robot => {
            return <option key={robot.uuid} value={robot.uuid}>{robot.label}</option>;
          })}
        </select> &nbsp;
      </React.Fragment> : ''}
    </p>
    <p>
      {!loading && !booting && previewRobot && <>
        <button className='StartButton'
          onClick={(e) => onStartStage()}>
          Next
        </button> &nbsp; </>}
    </p>
  </div>

  ]
}

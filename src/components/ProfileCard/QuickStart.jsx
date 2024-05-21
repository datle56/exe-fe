import React from 'react';
import './QuickStart.css';

function QuickStart() {
  return (
    <div className="quick-start-menu">
      <h4>Quick Start</h4>
      <div className="button-container">

        <a href="URL_FOR_TALKING_NOW" className="button">
          <img src="https://png.pngtree.com/png-vector/20230131/ourmid/pngtree-graduation-bachelor-hat-illustration-png-image_6580811.png" alt="Talking Now"/>
          <div className='text'>
            <div className='title'>Talking Now</div>
            <div className="duration">30 min</div>
        </div>
        </a>

        
        <a href="URL_FOR_AI_PRONUNCIATION" className="button">
          <img src="https://static.vecteezy.com/system/resources/previews/009/663/676/original/pencil-icon-transparent-free-png.png" alt="AI Pronounciation"/>
          <div className='text'>
            <div className='title'>AI Pronunciation</div>
            <div className="duration">15 min</div>
          </div>
        </a>

        <a href="URL_FOR_CHECKING_GRAMMAR" className="button">
          <img src="https://static.vecteezy.com/system/resources/previews/028/601/328/non_2x/folder-3d-rendering-icon-illustration-free-png.png" alt="Checking Grammar"/>
          <div className='text'>
            <div className='title'>Checking Grammar</div>
          </div>
        </a>

      </div>
    </div>
  );
}

export default QuickStart;
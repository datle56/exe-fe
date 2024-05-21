import React, { useEffect } from 'react';

const RedirectComponent = () => {
  const delay = 1000; // Thời gian chờ trước khi chuyển hướng (đơn vị: mili giây)
  const url = "http://solulu4u.com/pronounces"; // URL mà bạn muốn chuyển hướng đến

  useEffect(() => {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  }, [delay, url]);

  return (
    <div>
    </div>
  );
};

export default RedirectComponent;

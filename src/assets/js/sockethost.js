let hostname = window.location.hostname;
if (window.location.protocol === 'http:') hostname = hostname + ':3000';
const socketHost = window.location.protocol + '//' + hostname;

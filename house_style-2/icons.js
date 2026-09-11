const React=require('react'),S=require('react-dom/server'),sharp=require('sharp'),fa=require('react-icons/fa');
const want={book:'FaBook',folder:'FaFolderOpen',friends:'FaUserFriends',calendar:'FaCalendarAlt',pen:'FaPenFancy',hand:'FaHandPaper',read:'FaBookOpen'};
(async()=>{for(const [k,n] of Object.entries(want)){const svg=S.renderToStaticMarkup(React.createElement(fa[n],{color:'#1565C0',size:512}));
await sharp(Buffer.from(svg)).resize(512,512).png().toFile(`assets/icon-${k}.png`);}console.log('icons ok')})();

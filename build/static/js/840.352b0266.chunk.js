"use strict";(self.webpackChunkuniswap_dex=self.webpackChunkuniswap_dex||[]).push([[840],{7840:function(n,t,r){r.r(t),r.d(t,{default:function(){return A}});var e=r(4165),a=r(3433),o=r(9439),i=r(5861),s=r(2791),c=r(5813),u=r.n(c),p=r(4570),d=r(3366),l=r(7462),m=r(8182),f=r(4419),h=r(1046),g=r(7630),v=r(5878),Z=r(1217);function x(n){return(0,Z.Z)("MuiCardMedia",n)}(0,v.Z)("MuiCardMedia",["root","media","img"]);var w=r(184),y=["children","className","component","image","src","style"],b=(0,g.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:function(n,t){var r=n.ownerState,e=r.isMediaComponent,a=r.isImageComponent;return[t.root,e&&t.media,a&&t.img]}})((function(n){var t=n.ownerState;return(0,l.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},t.isMediaComponent&&{width:"100%"},t.isImageComponent&&{objectFit:"cover"})})),k=["video","audio","picture","iframe","img"],C=["picture","img"],M=s.forwardRef((function(n,t){var r=(0,h.Z)({props:n,name:"MuiCardMedia"}),e=r.children,a=r.className,o=r.component,i=void 0===o?"div":o,s=r.image,c=r.src,u=r.style,p=(0,d.Z)(r,y),g=-1!==k.indexOf(i),v=!g&&s?(0,l.Z)({backgroundImage:'url("'.concat(s,'")')},u):u,Z=(0,l.Z)({},r,{component:i,isMediaComponent:g,isImageComponent:-1!==C.indexOf(i)}),M=function(n){var t=n.classes,r={root:["root",n.isMediaComponent&&"media",n.isImageComponent&&"img"]};return(0,f.Z)(r,x,t)}(Z);return(0,w.jsx)(b,(0,l.Z)({className:(0,m.Z)(M.root,a),as:i,role:!g&&s?"img":void 0,ref:t,style:v,ownerState:Z,src:g?s||c:void 0},p,{children:e}))})),j=r(9504),N=r(890),B=r(1087),R=r(3523),S=r(4554),W=(0,g.ZP)(S.Z)((function(){return"\n    margin: 30px 100px;\n    width: 100%;\n    display: flex;\n    flex-wrap: wrap;\n    gap:2.5%;\n \n\n}\n  "})),F=(0,g.ZP)(p.Z)((function(){return"\n  width:20%;\n  margin-bottom:2%;\n\n  box-shadow: 1px 1px #342929;\n  border-radius: 0%;\n}\n  "}));function T(n){return I.apply(this,arguments)}function I(){return(I=(0,i.Z)((0,e.Z)().mark((function n(t){return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",!1);case 1:case"end":return n.stop()}}),n)})))).apply(this,arguments)}var A=function(){var n=(0,s.useState)([]),t=(0,o.Z)(n,2),r=t[0],c=t[1];return(0,s.useEffect)((function(){var n=function(){var n=(0,i.Z)((0,e.Z)().mark((function n(){var t,r,o,s;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t=function(){var n=(0,i.Z)((0,e.Z)().mark((function n(t){var r,o,s,u,p,d,l,m;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,R.qW.getOwnedNFTs(t);case 3:return r=n.sent,o=r.filter((function(n){return n&&""!==n.trim()})),n.next=7,R.Fj.getSuccessfullyBoughtTokens(t);case 7:if(s=n.sent,u=[],0===s.length){n.next=19;break}p=0;case 11:if(!(p<s.length)){n.next=19;break}return n.next=14,R.qW.tokenURI(s[p]);case 14:(d=n.sent)&&""!==d.trim()&&u.push(d);case 16:p++,n.next=11;break;case 19:return l=new Set([].concat((0,a.Z)(o),u)),n.next=22,Promise.all(Array.from(l).map(function(){var n=(0,i.Z)((0,e.Z)().mark((function n(t){var r,a;return(0,e.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,R.qW.getTokenId(t);case 2:return r=n.sent,n.next=5,T(t);case 5:return a=n.sent,n.abrupt("return",{uri:t,id:r,listed:a});case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()));case 22:m=n.sent,console.log(m,"tokendataarray"),c(m),n.next=30;break;case 27:n.prev=27,n.t0=n.catch(0),console.error("Error fetching NFTs:",n.t0);case 30:case"end":return n.stop()}}),n,null,[[0,27]])})));return function(t){return n.apply(this,arguments)}}(),"undefined"===typeof window.ethereum){n.next=19;break}return n.prev=2,n.next=5,window.ethereum.enable();case 5:return r=new(u())(window.ethereum),n.next=8,r.eth.getAccounts();case 8:o=n.sent,s=o[0],console.log(s,"metamask address"),t(s),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(2),console.error("Error connecting to Metamask:",n.t0);case 17:n.next=20;break;case 19:console.error("Metamask is not installed");case 20:case"end":return n.stop()}}),n,null,[[2,14]])})));return function(){return n.apply(this,arguments)}}();n()}),[]),(0,w.jsx)("div",{children:(0,w.jsxs)(W,{children:[" ",(0,w.jsx)(F,{children:r.map((function(n,t){return(0,w.jsxs)(p.Z,{children:[(0,w.jsx)(M,{component:"img",src:"https://gateway.pinata.cloud/ipfs/Qmb4aNkjZ9XAkWwFndpBYWfdmHr5vRHYkNahH5R3fdQR2a",alt:"NFT ".concat(n.id)}),(0,w.jsxs)(j.Z,{children:[(0,w.jsxs)(N.Z,{variant:"h5",component:"div",children:["Token Id - ",n.id.toString()]}),(0,w.jsx)(N.Z,{variant:"body2",color:"text.secondary",children:"NFT Description"}),n.listed?(0,w.jsx)("p",{children:"Listed"}):(0,w.jsx)(B.rU,{to:"/listnftforsale",state:{names:n},children:(0,w.jsx)("button",{children:"List NFT"})})]})]},t)}))})]})})}},3523:function(n,t,r){r.d(t,{Fj:function(){return f},Im:function(){return s},qW:function(){return l},rY:function(){return c}});var e=r(28),a=r(8155),o=r(1102),i=(r(2791),r(2969)),s="0xBA01432F68fcA69a27159178760A96b447F8Ec1F",c="0x58D1013a33e27D71B9Edb6C832eC839A0d44d395",u=e.Mt,p=window.ethereum,d=new a.Qg(p).getSigner(),l=new o.CH(c,u,d),m=i.Mt,f=new o.CH(s,m,d)},9504:function(n,t,r){r.d(t,{Z:function(){return g}});var e=r(7462),a=r(3366),o=r(2791),i=r(8182),s=r(4419),c=r(7630),u=r(1046),p=r(5878),d=r(1217);function l(n){return(0,d.Z)("MuiCardContent",n)}(0,p.Z)("MuiCardContent",["root"]);var m=r(184),f=["className","component"],h=(0,c.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:function(n,t){return t.root}})((function(){return{padding:16,"&:last-child":{paddingBottom:24}}})),g=o.forwardRef((function(n,t){var r=(0,u.Z)({props:n,name:"MuiCardContent"}),o=r.className,c=r.component,p=void 0===c?"div":c,d=(0,a.Z)(r,f),g=(0,e.Z)({},r,{component:p}),v=function(n){var t=n.classes;return(0,s.Z)({root:["root"]},l,t)}(g);return(0,m.jsx)(h,(0,e.Z)({as:p,className:(0,i.Z)(v.root,o),ownerState:g,ref:t},d))}))},890:function(n,t,r){r.d(t,{Z:function(){return w}});var e=r(3366),a=r(7462),o=r(2791),i=r(8182),s=r(8519),c=r(4419),u=r(7630),p=r(1046),d=r(4036),l=r(5878),m=r(1217);function f(n){return(0,m.Z)("MuiTypography",n)}(0,l.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var h=r(184),g=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],v=(0,u.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:function(n,t){var r=n.ownerState;return[t.root,r.variant&&t[r.variant],"inherit"!==r.align&&t["align".concat((0,d.Z)(r.align))],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})((function(n){var t=n.theme,r=n.ownerState;return(0,a.Z)({margin:0},r.variant&&t.typography[r.variant],"inherit"!==r.align&&{textAlign:r.align},r.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},r.gutterBottom&&{marginBottom:"0.35em"},r.paragraph&&{marginBottom:16})})),Z={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},x={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=o.forwardRef((function(n,t){var r=(0,p.Z)({props:n,name:"MuiTypography"}),o=function(n){return x[n]||n}(r.color),u=(0,s.Z)((0,a.Z)({},r,{color:o})),l=u.align,m=void 0===l?"inherit":l,w=u.className,y=u.component,b=u.gutterBottom,k=void 0!==b&&b,C=u.noWrap,M=void 0!==C&&C,j=u.paragraph,N=void 0!==j&&j,B=u.variant,R=void 0===B?"body1":B,S=u.variantMapping,W=void 0===S?Z:S,F=(0,e.Z)(u,g),T=(0,a.Z)({},u,{align:m,color:o,className:w,component:y,gutterBottom:k,noWrap:M,paragraph:N,variant:R,variantMapping:W}),I=y||(N?"p":W[R]||Z[R])||"span",A=function(n){var t=n.align,r=n.gutterBottom,e=n.noWrap,a=n.paragraph,o=n.variant,i=n.classes,s={root:["root",o,"inherit"!==n.align&&"align".concat((0,d.Z)(t)),r&&"gutterBottom",e&&"noWrap",a&&"paragraph"]};return(0,c.Z)(s,f,i)}(T);return(0,h.jsx)(v,(0,a.Z)({as:I,ref:t,ownerState:T,className:(0,i.Z)(A.root,w)},F))}))},4036:function(n,t,r){var e=r(7312);t.Z=e.Z}}]);
//# sourceMappingURL=840.352b0266.chunk.js.map
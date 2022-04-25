import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_508)">
<path d="M44.5 41H4.5V7H44.5V41Z" fill="#82D9C4"/>
<path d="M32 11C30.0664 11 28.5 12.5664 28.5 14.5C28.5 16.4336 30.0664 18 32 18C33.9336 18 35.5 16.4336 35.5 14.5C35.5 12.5664 33.9336 11 32 11Z" fill="#3843D0"/>
<path d="M21.3164 17.8945L4.5 40.8086V41H38.2695H20.9102H38.5L21.3164 17.8945Z" fill="#3843D0"/>
<path d="M31.8633 24.0078L19.5 40.8594V41H44.3281H31.5664H44.5L31.8633 24.0078Z" fill="#3843D0"/>
<path d="M38.5 41L28.8828 28.0703L19.5 40.8594V41H38.5Z" fill="#3843D0" fill-opacity="0.9"/>
<path d="M38.5 48C32.9766 48 28.5 43.5234 28.5 38C28.5 32.4766 32.9766 28 38.5 28C44.0234 28 48.5 32.4766 48.5 38C48.5 43.5234 44.0234 48 38.5 48Z" fill="#4ADE80"/>
<path d="M40.5 44H36.5V32H40.5V44Z" fill="#F8FAFC"/>
<path d="M32.5 40V36H44.5V40H32.5Z" fill="#F8FAFC"/>
<path d="M36.5 36H40.5V40H36.5V36Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_4_508">
<rect width="48" height="48" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>
`;

const DragPic=() => {
return <SvgXml xml={xml}  />
};
export default DragPic 

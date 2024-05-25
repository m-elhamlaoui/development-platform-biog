# Social Media Icons for React JS

[GitHub](https://github.com/Smoke3785/react-social-media-icons) **|** [NPM](https://www.npmjs.com/package/react-social-media-icons) **|** [View on Website](https://owenrossikeen.com/docs/react-social-media-icons) **|** [Donate](https://owenrossikeen.com/donate)
The original package by David McQuillan was removed from NPM, evidently for security concerns. I did not write this package - this is simply a sanitized re-upload of the original.

React JS Package for easy creation and highly customizable Social Media Icons.

![enter image description here](https://raw.githubusercontent.com/chillydk147/social-media-icons-react-editor/main/src/images/icons.gif)

## Example code

Below is an example of a minimal code setup

    import React from 'react';
    import  ReactDOM  from  'react-dom';
    import {ReactSocialMediaIcons} from 'react-social-media-icons';

    ReactDOM.render(<ReactSocialMediaIcons borderColor="rgba(0,0,0,0.25)" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(26,166,233,1)" url="https://some-website.com/my-social-media-url" size="48" />,	document.getElementById('root'));

## Props

| Name            | Type          | Description                                                                     | Default Value                                                     |
| --------------- | ------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| backgroundColor | Hex/rgba Code | Background Color for the icon                                                   | Defaults to standard color for Icon defined using the 'icon' prop |
| borderColor     | Hex/rgba Code | Border Color for the icon                                                       | #FFF                                                              |
| borderWidth     | Number        | Border Width for the icon, value range from 0-5                                 | 0                                                                 |
| borderStyle     | String        | Border Style for the icon, solid,dotted,dashed,double,groove,ridge,inset,outset | solid                                                             |
| icon            | String        | Social Media Icon to use, see supported list below                              | undefined                                                         |
| iconColor       | Hex/rgba Code | Color for the icon                                                              | #FFF                                                              |
| iconSize        | Number        | Size of Icon relative to Background, value range from 0-10                      | 5                                                                 |
| roundness       | Number        | Border Radius of the Icon, value range from 0-50                                | 10                                                                |
| size            | Number        | Size of Icon Background in pixels, value range from 10-100                      | 32                                                                |
| url             | String        | Url to go to when Icon is clicked                                               | #                                                                 |

## Available Icons

500px, aboutme, amazon, android, angellist, apple, behance, bookmate, codepen, coub, delicious, deviantart, digg, dribbble, dropbox, ello, envato, etsy, etsy-short, evernote, facebook, favorite, flikr, foursquare, github, googledrive, googleplay, googleplus, instagram, jsfiddle, kickstarter, line, line-icon, linkedin, livejournal, mail, map, medium, messenger, ok, periscope, phone, photobucket, pinterest, pinterest-light, pocket, producthunt, quora, reddit, reddit-light, rss, send, send-light, shopify, sketch, skype, slack, slideshare, snapchat, stackoverflow, stumbleupon, swarm, tripadvisor, tumblr, twitter, upwork, viadeo, vimeo, vk, vscogrid, web, whatsapp, windows, wordpress, xing, yelp, youtube, youtube-play

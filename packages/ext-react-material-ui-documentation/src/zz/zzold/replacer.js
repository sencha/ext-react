import React, { Component } from 'react';

   export function replacerCfgLink (match)  {
        //console.log(match)
        var s = match.indexOf('!')
        var e = match.lastIndexOf('#')
        var val = match.substring(s+1,e-1)
        return `<a href="javascript:sendToContext('cfg','${val}');">${val}</a>`
        //return `<span class="tooltip" xstyle="background:lightgray;border-bottom: 1px dotted black;">${val}<span class="tooltiptext">Tooltip text</span></span>`
      }

      export function replacerHeader2 (match)  {
        var s = match.indexOf(' ')
        var val = match.substring(s+1)
        return `<div><span style="font-weight:bold;color:#163d72;background:white;padding: 5px 5px 5px 0;font-size:18px;">${val}</span></div>`
      }

      export function replacerGlobalCssLink (match)  {
        //console.log(match)
        var s = match.indexOf('!')
        var e = match.lastIndexOf('#')
        var val = match.substring(s+1,e-1)
        return `[global css link ${val}]`
      }

      export function replacerExtJS (match)  {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)

        //return `<textarea readonly style="background:red;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;">${match}</textarea>`
        //return `<textarea style="background:red;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:400px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        return <textarea style="background:red;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:400px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >{match}</textarea>

      }

      export function replacerReact (match)  {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'React'
        //match = escape(match)
        return <textarea style="background:blue;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>
        //return `<div style="background:green;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea readonly>${match}</textarea></div>`
      }

      export function replacerAngular (match)  {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'Angular'
        //match = escape(match)
        return <textarea style="background:purple;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>
        //return `<div style="background:blue;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea style="width:100%;height:100%;" readonly>${match}</textarea></div>`
      }



      export function replacerHTML (match)  {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //console.log(match)
        return `<textarea style="background:yellow;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:green;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea style="width:100%;height:100%;" readonly>${match}</textarea></div>`
        //return 'html example here...'
      }

      export function replacerWebComponents (match)  {
        var s = match.search(/[}][ ]*?[)]\n/);
        var e = match.lastIndexOf("```");
        match = match.substring(s+3,e)
        //match = 'WebComponents'
        //match = escape(match)
        return `<textarea style="background:green;resize:none;margin:10px;padding:10px;font-size:16px;width:90%;height:100%;border-radius:15px;box-shadow: 5px 10px 18px #163d72;" >${match}</textarea>`
        //return `<div style="background:yellow;margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;"><textarea readonly>${match}</textarea></div>`
      }


      // exports.replacerJavaScript (match)  {
      //   //console.log(match.length)
      //   console.log(match)
      //   return `<div style="margin:10px;padding:10px;border-radius:15px;box-shadow: 5px 10px 18px #163d72;background:lightgray">${match}</div>`
      //   //return 'javascript example here...'
      //   //console.log(p1)
      //   //console.log(string)
      //   // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      //   //return [p1, p2, p3].join(' - ');
      // }

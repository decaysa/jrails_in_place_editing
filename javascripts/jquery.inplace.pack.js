/*
+-----------------------------------------------------------------------+
| Copyright (c) 2007 David Hauenstein			                        |
| All rights reserved.                                                  |
|                                                                       |
| Redistribution and use in source and binary forms, with or without    |
| modification, are permitted provided that the following conditions    |
| are met:                                                              |
|                                                                       |
| o Redistributions of source code must retain the above copyright      |
|   notice, this list of conditions and the following disclaimer.       |
| o Redistributions in binary form must reproduce the above copyright   |
|   notice, this list of conditions and the following disclaimer in the |
|   documentation and/or other materials provided with the distribution.|
|                                                                       |
| THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS   |
| "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT     |
| LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR |
| A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT  |
| OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, |
| SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT      |
| LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, |
| DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY |
| THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT   |
| (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE |
| OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  |
|                                                                       |
+-----------------------------------------------------------------------+
*/
jQuery.fn.editInPlace=function(p){var q={url:"",params:"",field_type:"text",select_options:"",textarea_cols:"25",textarea_rows:"10",datepicker:'',bg_over:"#ffc",bg_out:"transparent",saving_text:"Saving...",saving_image:"",default_text:"(Click here to add text)",select_text:"Choose new value",value_required:null,element_id:"element_id",update_value:"update_value",original_html:"original_html",save_button:'<input type="submit" class="inplace_save" value="Save"/>',cancel_button:'<input type="submit" class="inplace_cancel" value="Cancel"/>',callback:null,success:null,error:function(a){alert("Failed to save value: "+a.responseText||'Unspecified Error')}};if(p){jQuery.extend(q,p)}if(q.saving_image!=""){var r=new Image();r.src=q.saving_image}String.prototype.trim=function(){return this.replace(/^\s+/,'').replace(/\s+$/,'')};String.prototype.escape_html=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")};return this.each(function(){if(jQuery(this).html()=="")jQuery(this).html(q.default_text);var m=false;var n=jQuery(this);var o=0;jQuery(this).mouseover(function(){jQuery(this).css("background",q.bg_over)}).mouseout(function(){jQuery(this).css("background",q.bg_out)}).click(function(){o++;if(!m){m=true;var e=jQuery(this).html();var f=q.save_button+' '+q.cancel_button;if(e==q.default_text)jQuery(this).html('');if(q.field_type=="textarea"){var g='<textarea name="inplace_value" class="inplace_field" rows="'+q.textarea_rows+'" cols="'+q.textarea_cols+'">'+jQuery(this).text().trim().escape_html()+'</textarea>'}else if(q.field_type=="text"){var g='<input type="text" id="inplace_field" name="inplace_value" class="inplace_field" value="'+jQuery(this).text().trim().escape_html()+'" />'}else if(q.field_type=="select"){var h=q.select_options.split(',');var g='<select name="inplace_value" class="inplace_field"><option value="">'+q.select_text+'</option>';for(var i=0;i<h.length;i++){var j=h[i].split(':');var k=j[1]||j[0];var l=k==e?'selected="selected" ':'';g+='<option '+l+'value="'+k.trim().escape_html()+'">'+j[0].trim().escape_html()+'</option>'}g+='</select>'}jQuery(this).html('<form class="inplace_form" style="display: inline; margin: 0; padding: 0;">'+g+' '+f+'</form>');if(q.datepicker=="datepicker"){$('#inplace_field').datepicker({yearRange:'1920:2000',dateFormat:"MM d, yy",defaultDate:new Date(1980,1-1,1)})}}if(o==1){n.children("form").children(".inplace_field").focus().select();$(document).keyup(function(a){if(a.keyCode==27){m=false;o=0;n.css("background",q.bg_out);n.html(e);return false}});n.children("form").children(".inplace_cancel").click(function(){m=false;o=0;n.css("background",q.bg_out);n.html(e);return false});n.children("form").children(".inplace_save").click(function(){n.css("background",q.bg_out);var c=jQuery(this).parent().children(0).val();if(q.saving_image!=""){var d='<img src="'+q.saving_image+'" alt="Saving..." />'}else{var d=q.saving_text}n.html(d);if(q.params!=""){q.params="&"+q.params}if(q.callback){html=q.callback(n.attr("id"),c,e,q.params);m=false;o=0;if(html){n.html(html||c)}else{alert("Failed to save value: "+c);n.html(e)}}else if(q.value_required&&c==""){m=false;o=0;n.html(e);alert("Error: You must enter a value to save this field")}else{jQuery.ajax({url:q.url,type:"POST",data:q.update_value+'='+c+'&'+q.element_id+'='+n.attr("id")+q.params+'&'+q.original_html+'='+e,dataType:"html",complete:function(a){m=false;o=0},success:function(a){var b=a||q.default_text;n.html(b);if(q.success)q.success(a,n)},error:function(a){n.html(e);if(q.error)q.error(a,n)}})}return false})}})})};

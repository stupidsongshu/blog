(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{242:function(s,t,n){"use strict";n.r(t);var a=n(0),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"环境"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#环境","aria-hidden":"true"}},[s._v("#")]),s._v(" 环境")]),s._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://developer.aliyun.com/mirror",target:"_blank",rel:"noopener noreferrer"}},[s._v("阿里云镜像"),n("OutboundLink")],1)])]),s._v(" "),n("h2",{attrs:{id:"jdk"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#jdk","aria-hidden":"true"}},[s._v("#")]),s._v(" jdk")]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -qa "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" jdk\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" yum remove xxx\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("777")]),s._v(" jdk-7u80-linux-x64.rpm\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装，默认安装路径为 /usr/java")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh jdk-7u80-linux-x64.rpm\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 配置jdk环境变量，在 /etc/profile 最下方添加下面两行(JAVA_HOME为jdk的安装路径)")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# export JAVA_HOME=/usr/java/jdk1.7.0_80")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 然后在 export PATH 中添加 $JAVA_HOME/bin")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/profile\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" /etc/profile\njava -version\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);
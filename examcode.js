(function () {

    // Create a Date object for the specified date and time
    var startDate = new Date("2025-09-15T00:00:01");
    var endDate = new Date("2025-09-24T23:59:00");
    var env =hype.getCookie('hypeab')=="true"?"dev":"prod";
  var sessionStorageName = "hypePopup_availability_23_sep_Show";
    var event = "abtest_23_sep_camp_popup";
  
    // Get the current date and time
    var currentDate1 = new Date();
   
    // Compare the two dates
    if (
       currentDate1 < endDate &&
       currentDate1 > startDate) {
     
      hype.checkifloaded(
        `document.querySelectorAll('.departure-list .availability-list .availability-list-item').length>0`,
        function () {
          //!-------------- aktarmalı varsa ----------------------
   
          let popupPath;
          if (window.location.pathname.includes("/flexible-search")) {
            popupPath = "Flexible-Search";
          } else if (window.location.pathname.includes("/booking")) {
            popupPath = "Availability";
          }
   
          const popupLanguage = document
            .querySelector(".language-value")
            .innerText.trim()
            .toLowerCase();
          let lang;
        
          let imgUrl;
          let imgWidth;
          let imgHeight;
  
          if (env === "dev") {
            console.log("popupPath:", popupPath);
            console.log("popupLanguage:", popupLanguage);
            
          }
          // console.log(popupLanguage!=="tr");
          // console.log("popupPath", popupPath);
          
          
           if (popupLanguage=="en") {
                   if (hype.isMobile()) {
                imgWidth = 343;
                imgHeight = 207;
                    
                if (env === "dev") {
                  console.log("mobile EN ", popupPath);
                  
                }
                // console.log("mobile EN ", popupPath);
                imgUrl =
                  "https://web-image.useinsider.com/pegasus/defaultImageLibrary/343x207%20EN%205%20%281%29-1758543910.jpeg";
              } else {
                imgWidth = 790;
                imgHeight = 360;
                if (env === "dev") {
                  console.log("desktop EN ", popupPath);
                  
                }
                // console.log("desktop EN ", popupPath);
                imgUrl =
                  "https://web-image.useinsider.com/pegasus/defaultImageLibrary/790x360%20EN%205%20%281%29-1758543913.jpeg";
              }
             
          }else if(popupLanguage=="tr"){
            if (hype.isMobile()) {
              imgWidth = 343;
              imgHeight = 207;
              if (env === "dev") {
                console.log("mobile TR ", popupPath);
              }
              // console.log("mobile TR ", popupPath);
              imgUrl =
              "https://web-image.useinsider.com/pegasus/defaultImageLibrary/343x207%20TR%205%20%281%29-1758543910.jpeg";
            } else {
              imgWidth = 790;
              imgHeight = 360;
              if (env === "dev") {
                console.log("desktop TR ", popupPath);
              }
              // console.log("desktop TR ", popupPath);
              imgUrl =
                "https://web-image.useinsider.com/pegasus/defaultImageLibrary/790x360%20TR%205%20%281%29-1758543913.jpeg";
            }
          }else if(popupLanguage=="ar"){
            return;
            if (hype.isMobile()) {
              imgWidth = 343;
              imgHeight = 207;
              if (env === "dev") {
                console.log("mobile AR ", popupPath);
              }
              // console.log("mobile AR ", popupPath);
              imgUrl =
              "https://web-image.useinsider.com/pegasus/defaultImageLibrary/343x207-1753713156.jpeg";
            } else {
              imgWidth = 790;
              imgHeight = 360;
              if (env === "dev") {
                console.log("desktop AR ", popupPath);
              }
              // console.log("desktop AR ", popupPath);
              imgUrl =
                "https://web-image.useinsider.com/pegasus/defaultImageLibrary/790x360-1753713156.jpeg";
            }
          }else {
            // console.log('Not lang');
             return
  
           }
    
        
      
         
          document
            .querySelectorAll(".hype-season-popup-overlay")
            .forEach((el) => {
              el.remove();
            });
          document
            .querySelectorAll(".hype-camp-baggage-popup")
            .forEach((el) => {
              el.remove();
            });
   
          const hypeStyleId = "hype-camp-baggage-popup";
          if (!document.querySelector("#" + hypeStyleId)) {
            const hypeStyle = `<style id=${hypeStyleId}>
              @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&family=Roboto:wght@400;700&display=swap');
              
          .hype-season-popup-overlay {
            background: rgba(55, 55, 55, 0.5);
            position:fixed;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            z-index: 999999999;
            display: none;
          }
          .hype-season-popup {
            background: #FFFFFF;
           border-radius: 12px ;
            position: fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            box-sizing: border-box;
             padding: 0px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            width: 790px;
            align-items: center;
            }
          .hype-season-popup-close {
          background-size:cover;
          position:absolute;
          top:8px;
          right:8px;
          cursor: pointer;
        }
          .hype-popup-desc {
      font-family: 'Roboto',sans-serif;
      padding: 0 54px;
     
    
      margin-top: 20px;
    
      color: #232323;
      text-align: center;
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 180%;
      letter-spacing: -0.198px;
    }
        
        .hype-season-popup > img {
          border-radius: 12px 12px ;
          width: 100%;
          object-fit: cover;
        }
    
        
        @media screen and (max-width: 768px) {
          .hype-season-popup-close > img {
             
            width: 32px;
            height: 32px;
          }
         .hype-season-popup {
          width: 343px;
         }
      .hype-popup-desc{
      margin: 24px 10px 0;
     font-size: 14px;
    line-height: 25px;
    font-weight: 500;
    padding: 0;
    }
    .hype-popup-desc-line {
      line-height: 18px;
      margin-bottom: 8px;
    }
    .hype-popup-desc-last-line {
      line-height: 18px;
    }
        
        }
        </style>`;
   
            document.head.insertAdjacentHTML("beforeend", hypeStyle);
          }
   
          const DuyuruPopOverlay = document.createElement("div");
          DuyuruPopOverlay.className = "hype-season-popup-overlay";
   
          DuyuruPopOverlay.innerHTML = `
            <div class="hype-season-popup">
            <img src=${imgUrl} width=${imgWidth} height=${imgHeight} alt="season image" />
            <span class="hype-season-popup-close">
            <img src="https://useruploads.vwo.io/useruploads/529944/images/9a17d22c54e530dcec5f173e68863230_altpopupclose.svg" width="42" height="42" alt="close icon" />
            </span>
      
            </div>
            `;
       
          sessionStorage.setItem(sessionStorageName, "alredy shown");
   
          document.getElementsByTagName("BODY")[0].style.position = "relative";
   
          const BodyELem = document.getElementsByTagName("BODY")[0];
   
          BodyELem.appendChild(DuyuruPopOverlay);
   
          const CloseIcon = document.querySelector(".hype-season-popup-close");
          const PopupLastClass = document.querySelector(
            ".hype-season-popup-overlay"
          );
          setTimeout(() => {
           PopupLastClass.style.display = "block";
           window.dataLayer.push({
             event: event+"_View"+(hype.isMobile()?"_Mob":"_Des")+"_"+popupLanguage,
             exp_var1:popupPath
           });
         }, 1000);
          CloseIcon.addEventListener("click", () => {
            PopupLastClass.remove();
            window.dataLayer.push({
                event: event+"_Close"+(hype.isMobile()?"_Mob":"_Des")+"_"+popupLanguage,
                exp_var1:popupPath
              });
          });
   
        //   PopupLastClass.addEventListener("click", (e) => {
        //     if (!e.target.closest(".hype-season-popup")) {
        //       PopupLastClass.remove();
   
        //       window.dataLayer.push({
        //         event: event+"_Over"+(hype.isMobile()?"_Mob":"_Des")+"_"+popupLanguage,
        //         exp_var1:popupPath
        //       });
        //     }
        //   });
   
          //!-------------- aktarmalı varsa ----------------------
        }
      );
    }
   })();
   
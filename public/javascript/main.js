
// fixes navbar and triggers a few other style changes on scrolldown
        
        const navBar = document.querySelector(".flex-nav");
        const topOfNav = navBar.offsetTop;
        const wrapper = document.querySelector("body>div");
        
        function fixNav(){
                if (window.scrollY >= topOfNav){
                        wrapper.style.paddingTop = navBar.offsetHeight + "px";
                        document.body.classList.add("fixed");
                        highlight.style.display = "none";
                } else {
                        wrapper.style.paddingTop = 0;
                        document.body.classList.remove("fixed");
                        highlight.style.display = "none";
                        }
                }
        
        window.addEventListener("scroll", fixNav);                        
        
        
// toggles Table of Contents in mobile configuation 
        
        const chapters = document.querySelector(".chapters>ul");
        let closedTOC = true;
                
        function toggleTOC(){
                if (window.innerWidth < 850) {
                        if (closedTOC) {
                                chapters.style = "display: block";
                        } else {
                                chapters.style = "display: none";
                        }
                        closedTOC = !closedTOC;
                }
        }
        
        
//makes little highlight bar that jumps to links on mouseover        
        
        const links = document.querySelectorAll(".navLinks");    
        const highlight = document.createElement("span");
        highlight.classList.add("highlight");
        document.body.append(highlight);
        
        function highlightLink(){
                const linkCoords = this.getBoundingClientRect();
                const coords = {
                        width: linkCoords.width,
                        height: linkCoords.height,
                        left: linkCoords.left + window.scrollX,
                        top: linkCoords.top + window.scrollY
                        };
                highlight.style.width = `${coords.width}px`;
                highlight.style.height = `${coords.height}px`;
                highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
                highlight.style.display = "block";
        }
        links.forEach(link => link.addEventListener("mouseenter", highlightLink));
        
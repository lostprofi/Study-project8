const navlist = document.querySelectorAll('.navlist');


navlist.forEach(el=>{
    
    el.addEventListener("mouseover", (e)=>{
             
        let navListWidth = el.offsetWidth;
        
        e.currentTarget.querySelector('.list_line').style.transition = "1s";
        e.currentTarget.querySelector('.list_line').style.width = `${navListWidth}px`;
        
    });
    
     el.addEventListener("mouseout", (e)=>{
        
        
         e.currentTarget.querySelector('.list_line').style.transition = "1s";
        e.currentTarget.querySelector('.list_line').style.width = "0";
        
    });
})
const navlist = document.querySelectorAll('.navlist');
const messageList = document.querySelectorAll('.message');
const veganBlock = document.querySelector('.vegan');
const meatBlock = document.querySelector('.meat');
const restarauntBlock = document.querySelector('.restaraunt');

const headerBlocks = [[meatBlock, messageList[0]], [veganBlock, messageList[1]] , [restarauntBlock, messageList[2]]];


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


headerBlocks.forEach(el=>{
    
    if(el === headerBlocks[1]){
        el[0].addEventListener('mouseover', ()=>{
        el[1].style.marginBottom = "112px";
        el[1].style.marginRight = "34px";
            el[1].style.opacity = 1;
        
        });
    
        el[0].addEventListener('mouseout', ()=>{
        el[1].style.marginBottom = "0";
        el[1].style.marginRight = "0"; 
            el[1].style.opacity = 0.5;
        });
    }
    
    else {
            el[0].addEventListener('mouseover', ()=>{
            el[1].style.opacity = 1;
            el[1].style.marginBottom = "106px";
                
                
        });
    
            el[0].addEventListener('mouseout', ()=>{
            el[1].style.opacity = 0.5;
            el[1].style.marginBottom = "0";
            
        });
    }
    
})

/*headerBlocks.forEach(el=>{
    
   
    
  
            el[0].addEventListener('mouseover', ()=>{
            el[1].style.opacity = 1;
            el[1].style.marginBottom = "112px";
                
                
        });
    
            el[0].addEventListener('mouseout', ()=>{
            el[1].style.opacity = 0.5;
            el[1].style.marginBottom = "0";
            
        });
    
    
})*/
calculateSpine(pageCount,jrnlNameInXML);
function calculateSpine(pageCount,jrnlNameInXML){    
    var spineWidth =  (pageCount*0.042)+0.3;
    spineWidth = Math.round(spineWidth*100)/100; 
    return spineWidth;
    }



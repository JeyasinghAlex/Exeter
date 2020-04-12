calculateSpine(pageCount,jrnlNameInXML);
function calculateSpine(pageCount,jrnlNameInXML){    
    var spineWidth =  (0.063*(pageCount/2)*1.05+1);
    spineWidth = Math.round(spineWidth*100)/100; 
    return spineWidth;
    }

calculateSpine(pageCount,jrnlNameInXML);
function calculateSpine(pageCount,jrnlNameInXML){    
        switch (jrnlNameInXML) {
          case 'bjr':
            var spineWidth =  ((64/1000)*(pageCount/2)+(142/1000*2))+(pageCount/2*0.0009765625);
            spineWidth = Math.round(spineWidth*100)/100;
            break;
          case 'dmfr':
            var spineWidth =  ((56/1000)*(pageCount/2)+(142/1000*2))+(pageCount/2*0.0078125);
            spineWidth = Math.round(spineWidth*100)/100;
            break;
          default:
            var spineWidth =  ((64/1000)*(pageCount/2)+(142/1000*2))+(pageCount/2*0.0009765625);
            spineWidth = Math.round(spineWidth*100)/100;
        }    
    return spineWidth;
    }


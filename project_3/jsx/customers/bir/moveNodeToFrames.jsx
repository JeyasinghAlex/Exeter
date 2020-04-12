// ***************************************************************************************** ****************
// Heading: Loading Data
// Scritp Name:  XPath Data add to Text Frame.jsx
// Script for InDesign CS6, Version-8.0
// Script Version No: 3.8.0.12.
// Developed by: S. Karthik, Exeter Premedia.
// Last Modification Date: 19-Aug-2016 Time: 8:45 p.m
// Script Description:  Use XPath to add data to difference type of frames.
// Note: Need to create text frame name ("Option: Tag Frame").
//
// ***************************************************************************************** ****************
jrnlName = currDocInPrg.textVariables.itemByName("jrnlName").variableOptions.contents;
var scriptFile = (File(layerTemplateScript + "\\"+ jrnlName+ "_indesignAutoPageConfig.jsx"))
var script = '#include' + scriptFile.fullName;
eval(script);
var myDocument = currDocInPrg;

var supportEvents = function() {
	var initialize = function(params) {
		function extend(obj, ext) {
			if (obj === undefined){
				return ext;
			}
			var i, l, name, args = arguments, value;
			for (i = 1, l = args.length; i < l; i++) {
				ext = args[i];
                    if (ext === undefined){
                        break;
                    }
				for (name in ext) {
					if (ext.hasOwnProperty(name)) {
						value = ext[name];
						if (value !== undefined) {
							obj[name] = value;
						}
					}
				}
			}
			return obj;
		}
		config = config = extend(config, params);
		return this;
	};

	var getConfig = function(){
		var newConfig = {};
		for (var prop in config) {
			newConfig[prop] = config[prop];
		}
		return newConfig;
	};

     var  shallowCopy =  function (obj) {
          if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = this.shallowCopy(obj[key]);

    return temp;
        };

	return {
		init: initialize,
		getConfig: getConfig,
		shallowCopy: shallowCopy,
		config: config
	};
}();



(function (supportEvents) {
	config = supportEvents.getConfig();
    supportEvents.frames = {
        
        moveTagToFrames: function (){
            var frameConfig = supportEvents.config.assignUsingXpath.toFrames; //collect all xpath node and text frame name.
            var frame = frameConfig.length; //Get total count
                for (m=0; m<frame; m++){
                try{    
                    var xpathSet = frameConfig[m];
                        var frameName = xpathSet['frame-name']; //Root of frame
                        var xpathString = xpathSet['xpath']; //Get xml elements
                        var action = xpathSet['action'];
                        var styleOverride = xpathSet['styleOverride'];
                        var myDoc = currDocInPrg;
                        var xmlDom = myDoc.xmlElements[0];
                        var processingNode = app.xmlRuleProcessors.add([xpathString]);
                        var nodeToBeMoved = processingNode.startProcessingRuleSet(xmlDom);
                        if(myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0].paragraphs.length > 0 && nodeToBeMoved){
                            myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0].paragraphs.lastItem().characters.lastItem().insertionPoints[0].contents = '\r';
                            }//end of IF                        
                        if (action == 'move'){
                            var contToMovePara = myDocument.xmlElements[0].evaluateXPathExpression(xpathString);
                            if(contToMovePara.length == 0){
                                var releateFrame = myDoc.textFrames.itemByName(frameName);
                                releateFrame.remove();
                                var releateLogoNodeName = myDoc.xmlElements[0].evaluateXPathExpression(xpathString);
                                releateLogoNodeName[0].untag();
                                }
                            var contToMoveLastPara = myDocument.xmlElements[0].evaluateXPathExpression(xpathString)[0].paragraphs.lastItem();
                            var nextPara = contToMoveLastPara.insertionPoints[-1].paragraphs[0];
                            var nextParaTracking = nextPara.tracking;
                            var nextParaStyle = nextPara.appliedParagraphStyle;
//~                             try{
//~                                 if(myDocument.xmlElements[0].evaluateXPathExpression(xpathString)[0].paragraphs.length > 1){
//~                                     var penultimatePara = contToMoveLastPara;
//~                                     var penultimateParaStyle = penultimatePara.appliedParagraphStyle;
//~                                     var penultimateParaTracking = penultimatePara.tracking;
//~                                     }
//~                                 }catch(e){}
                            movedElements = myDocument.xmlElements[0].evaluateXPathExpression(xpathString)[0].move(LocationOptions.AT_END, myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0]);
                            if (styleOverride != null){
                                contToMoveLastPara.appliedParagraphStyle = myDocument.paragraphStyles.itemByName(styleOverride);
                                }//end of if
                            nextPara.appliedParagraphStyle = nextParaStyle;
                            nextPara.tracking = nextParaTracking;
//~                             try{
//~                                 if(myDocument.xmlElements[0].evaluateXPathExpression(xpathString)[0].paragraphs.length > 1){
//~                                     penultimatePara.appliedParagraphStyle = penultimateParaStyle;
//~                                     penultimatePara.tracking = penultimateParaTracking;
//~                                     }
//~                                 }catch(e){}    
                            var contFrm = myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0].paragraphs[0].parentTextFrames[0];
                            var overFlowsFlag = false;
                            var contFrmBounds;
                            if (contFrm.overflows){
                                contFrmBounds = contFrm.geometricBounds;
                                contFrm.geometricBounds = [contFrmBounds[0], contFrmBounds[1], contFrmBounds[2], contFrmBounds[3]+400]
                                overFlowsFlag = true;
                                myDocument.recompose();//ok
                                }
                            var contFrmParasLen = contFrm.paragraphs.length; 
                            if (contFrmParasLen > 0){
                                var frmLastPara = contFrm.paragraphs.lastItem();
                                //**********************
                                var emtyContents = contFrm.paragraphs[-1].contents;
                                if(!emtyContents.toString().match(" ")){
                                    var frmPenUltimatePara = contFrm.paragraphs.item(contFrm.paragraphs.length - 2);    
                                    frmPenUltimatePara.characters.lastItem().contents = "";
                                    frmPenUltimatePara.appliedParagraphStyle.name = frmPenUltimateParaStyle;
                                    }
                                else{
                                    if(overFlowsFlag){
                                        var contFrm = myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0].paragraphs[0].parentTextFrames[0];
                                        contFrmBounds = contFrm.geometricBounds;
                                        contFrm.geometricBounds = [contFrmBounds[0], contFrmBounds[1], contFrmBounds[2], contFrmBounds[3]-400]                                
                                        }
                                    var frmPenUltimatePara = contFrm.paragraphs.item(contFrm.paragraphs.length - 1); 
                                    frmPenUltimatePara.characters.lastItem().contents = "";
                                    frmPenUltimatePara.appliedParagraphStyle.name = frmPenUltimateParaStyle;
                                    }
                                }//end of if 
                            //**********************
                            if(overFlowsFlag){
                                contFrmBounds = contFrm.geometricBounds;
                                contFrm.geometricBounds = [contFrmBounds[0], contFrmBounds[1], contFrmBounds[2], contFrmBounds[3]-400]                                
                                }
                            }//end of if                            
                        else if (action == 'duplicate'){
                            var duplicatedElement = myDocument.xmlElements[0].evaluateXPathExpression(xpathString)[0].duplicate();
                            var contToMoveLastPara = duplicatedElement.paragraphs.lastItem();
                            var nextPara = contToMoveLastPara.insertionPoints[-1].paragraphs[0];
                            var nextParaStyle = nextPara.appliedParagraphStyle;
                            movedElements = duplicatedElement.move(LocationOptions.AT_END, myDocument.xmlElements[0].evaluateXPathExpression("//"+frameName)[0]);
                            if (styleOverride != null){
                                movedElements.paragraphs.lastItem().appliedParagraphStyle = myDocument.paragraphStyles.itemByName(styleOverride);
                                }//end of if
                                nextPara.appliedParagraphStyle = nextParaStyle
                            }//end of else if
                    } catch(e){}
                }             
            }
      }
})(supportEvents || {});
supportEvents.frames.moveTagToFrames();


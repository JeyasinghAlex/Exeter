#target indesign
/*
    Function Name:  Auto float placer
    Function Description:  
        1. The function will collect all float citations on the current page and place it closer to its citation. 
        2. Conditions like placing style, caption style will be strictly taken from the config file.
        3. The function should also considering reducing image to fit for column/page.  
        4. The sooner floats are plced we are also base aligning the pages (column by column)
        5. Function should run for the current page.
    Developer: Augustine K
    Start Date: 22-Aug-2016
*/
var envName = $.getenv("USERNAME");
if (envName == 'augustine'){
    layerTemplateScript = "F:\\F\\Augustine\\MyRnDJobs\\kriya2\\scripts"
    jrnlName = app.activeDocument.textVariables.itemByName("jrnlName").variableOptions.contents;
    var glyphObject = {};
//    var floatPlacerError = '';
    glyphsConfig = layerTemplateScript + "\\" + "GLYPHS.jsx";
    eval('#include ' + glyphsConfig); // load the glyph config
    currProgressPercent = 0;
    percentSplit = 0
    }
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
var scriptFile = (File(layerTemplateScript + "\\"+ jrnlName+"_indesignAutoPageConfig.jsx"));
var script = '#include' + scriptFile.fullName;
eval(script);
//log and debugger msg
var debugLogFile = File(layerTemplateScript.replace('scripts','log') + "\\" + (app.activeDocument.name).replace('.indd','.debug'));
var logFile = File(layerTemplateScript.replace('scripts','log') + "\\" + (app.activeDocument.name).replace('.indd','.log'));
function displayMSG(msg){
	var today = new Date();
    var myDates = today.toLocaleTimeString()        
	if (!logFile.exists) {
		// make new log file
		logFile.open("w");
		if (myDates) {
			//logFile.write(String(today));
		}
		logFile.close();
	}
 
	if (logFile.open("e")) {
		if (logFile.seek(0,2)) {
			if (logFile.write("\n" + msg + "\t" + myDates)) {
				if (logFile.close()) {
					return true;
				}
			}
		}
	}
	logFile.close();
	return false;
}

function debuggerMSG(msg){
	var today = new Date();
    var myDates = today.toLocaleTimeString()        
	if (!debugLogFile.exists) {
		// make new log file
		debugLogFile.open("w");
		if (myDates) {
			//debugLogFile.write(String(today));
		}
		debugLogFile.close();
	}
 
	if (debugLogFile.open("e")) {
		if (debugLogFile.seek(0,2)) {
			if (debugLogFile.write("\n" + msg + "\t" + myDates)) {
				if (debugLogFile.close()) {
					return true;
				}
			}
		}
	}
	debugLogFile.close();
	return false;
}

//===================
var currPage, nextPage;//global variable
var pageClmDetails = new Array();
var openerPageClmDetails = new Array();
var floatPlacer = function() {
	//config info
    app.activeDocument.recompose();
    config["currDoc"] = app.activeDocument;//appending document object to config
    config["currDocDOM"] = config["currDoc"].xmlElements[0];//appending document DOM object to config
    config["textFrmColWidth"] = config["currDoc"].pages.item("3").textFrames.itemByName("RECTO").textFramePreferences.textColumnFixedWidth;
    config["totalCitationHeight"] = 0;
    config["floatsPlacedOnPages"] = [];
    config["docFloatIDsArray"] = [];
    config["pageFloatIDsArray"] = [];
    config["templateType"] = [];
    config["notPlacedFloatsIDs"] = [];
    config["reduceClmItteration"] = false;
    config["recalledFromParaTracking"] = false;
    config["doForceAlign"] = false;
    config["forceMovedToBottom"] = false;
    config["firstFloatAtBottom"] = false;
    config["floatsFrmIndexPlacedOnCurrPage"] = [];
    config["floatsFrmIndexPlacedOnCurrClm"] = [];
    config["clmShortEquDiv"] = 0;
    config["floatsEquallyDistributeSpace"] = 0;
    config["headLevelToBeDistributed"] = '';
    config["headLevelToBeDistributedLen"] = 0;
    config["headLevelEquallyDistributeSpace"] = 0;
    config["shortByValueBalance"] = 0;
    config["spaceTakenForLeading"] = 0;
    config["trackedParasCt"] = 0;
    config["placedFloatsOnPage"] = [];
    config["citLineIndex"] = '';
    config["previousFloatPlacedOnClm"];
    config["previousFloatPlacedOnAt"];
    config["previousFloatInlineStatus"] = false;
    config["processFirstPageFloats"] = true;
    config["citationBeingMoved"] = [];
    config["userPlacedFloatCitationBlockHeight"] = 0;
    config["continuedBox"] = false;
    config["continuedBoxDetails"] = [];
    config["continuedBoxID"] = [];
//collecting docs all citations as an array - starts
    var docsCitations = config.currDocDOM.evaluateXPathExpression("//span[@class='jrnlFirstCitation']");
    var docsCitationsLen = docsCitations.length;
    config["totalCitationLength"] = docsCitationsLen;
    for (var ct = docsCitationsLen - 1; ct >= 0; ct --){
        var docsCitationXmlNode = docsCitations[ct].xmlAttributes.itemByName("data-rid").value;
        docsCitationXmlNode = docsCitationXmlNode.replace(/^\s(.+)\s$/,'$1')
        docsCitationXmlNode = docsCitationXmlNode.split(/\s/);
        var docsCitationXmlNodeLen = docsCitationXmlNode.length; 
        for (var dc =0; dc < docsCitationXmlNodeLen; dc ++){
        config.docFloatIDsArray[docsCitationXmlNode[dc]] = [];
            }//end of for
        }//end of FOR loop
    //collecting docs all citations as an array - ends
    //storing doc column bounds information inside config object - starts
    var prevClmnWd = 0;
    config["columnSpanWidth"] = new Array();//a new array to store information
    var rootNode = config.currDoc.xmlElements[0];
    xmlDOM = rootNode.xmlItems.lastItem().xmlItems.lastItem();    
    var prefixInFrontNode = rootNode.evaluateXPathExpression("//div[@class='front']");
    if (prefixInFrontNode[0].xmlAttributes.itemByName("prefix").isValid){
        prefixValue = prefixInFrontNode[0].xmlAttributes.itemByName("prefix").value;
        }
    else {
        prefixValue = 'undefined';
        }//end of ELSE
    if (prefixValue == 'undefined'){
        config["prefixForHeadStyles"] = '';
        }//end of IF
    else {
        config["prefixForHeadStyles"] = prefixValue + '_';
        }//end of ELSE
    currProofColumnType = config.articleTypeDetails[prefixValue];
    config["articleType"] = prefixValue;
    config['columnDetails'] = config.pageColumnDetails[currProofColumnType].columnDetails;
    config['openerPageColumnDetails'] = config.pageColumnDetails[currProofColumnType].openerPageColumnDetails;
    config.templateType = currProofColumnType;
    config["pageColumns"] = config.columnDetails;
    config["openerPageColumns"] = config.openerPageColumnDetails;
    config["pageColumnsLen"] = config.pageColumns.length;
    for (var pcd = 0; pcd < config.pageColumnsLen; pcd ++){
        config.columnSpanWidth.push([{"width":config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter},{"index":pcd}, {"columnXPosition":prevClmnWd +config.pageColumns[pcd].gutter}]);
        prevClmnWd = config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter;
        config.pageColumns["floatPlacedAt"] = '';
        }//end of FOR loop
    var prevClmnWd = 0;
    config["openerPageColumnsSpanWidth"] = new Array();//a new array to store information
    config["openerPageColumnsLen"] = config.openerPageColumns.length;
    for (var opcd = 0; opcd < config.openerPageColumnsLen; opcd ++){
        config.openerPageColumnsSpanWidth.push([{"width":config.openerPageColumns[opcd].width + prevClmnWd + config.openerPageColumns[opcd].gutter},{"index":opcd}, {"columnXPosition":prevClmnWd +config.openerPageColumns[opcd].gutter}]);
        prevClmnWd = config.openerPageColumns[opcd].width + prevClmnWd + config.openerPageColumns[opcd].gutter;
    }//end of FOR loop
    //====Collecting floats placement info from user===
    config["userPlacingFloatsDetails"] = [];//array for string user placing floats
    config["allUserPlacingFloatsDetails"] = [];//array for string user placing floats
    var floatsPerUserInputs = config.currDocDOM.evaluateXPathExpression("//div[@data-page-num]");
    var floatsPerUserInputsLen = floatsPerUserInputs.length;
    for (var fpu = 0; fpu < floatsPerUserInputsLen; fpu ++){
        try{
            var currUserFltID = floatsPerUserInputs[fpu].xmlAttributes.itemByName("id").value;
            currUserFltID = String(currUserFltID.replace("BLK_", ''));
            var currUserFltIDPage = floatsPerUserInputs[fpu].xmlAttributes.itemByName("data-page-num").value;
            if (config.userPlacingFloatsDetails[currUserFltIDPage] == null) {
                config.userPlacingFloatsDetails[currUserFltIDPage] = [currUserFltID];
                config.allUserPlacingFloatsDetails = config.allUserPlacingFloatsDetails.concat(currUserFltID);
                }//end of IF;
            else {
                config.userPlacingFloatsDetails[currUserFltIDPage] = config.userPlacingFloatsDetails[currUserFltIDPage].concat(currUserFltID);
                config.allUserPlacingFloatsDetails = config.allUserPlacingFloatsDetails.concat(currUserFltID);
                }//end of ELSE
            }catch(e){}
        }//end of FOR loop
    //=======================================
	//add or override the initial setting
    config["floatsOnColumn"] = new Array(config.pageColumns.length);
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

//collecting citation on the current page and store data as a objects  along with citation's block height
(function (floatPlacer) {
	config = floatPlacer.getConfig();        
        floatPlacer.events = {
            collectCitation: function (){
                //if (config.totalCitationLength > 0){//commented on 11-Oct-2016 because for basealign part should execute though there is not floats
                    config["lastFloatMovedToFloatNotOnCurrPage"] = false;
                    config["stopPlacementForContinuedFloats"] = true;
                    config["firstPagePreviousFloatForcePlaced"] = false;
                    config["userPlacedFloatIntervene"] = false;
                    config["floatsCalcAlreadyDoneForCurrPage"] = [];
                    if (nextPage == undefined){
                        currPage = config.currDoc.pages[0];//Initaiting from page 1 of the document                    
                        }
                    else {
                        currPage = nextPage;
                        }
                    //displayMSG("Placing floats and base aligning page: " + String(currPage.name));
                    debuggerMSG("Placing floats and base aligning page: " + String(currPage.name));
                        var maxFloatArea =  0;
                        if (currPage.name == '1'){
                            for (var mfa = 0; mfa < config.openerPageColumnsLen; mfa ++){
                                var currClmTextWidth = config.openerPageColumns[mfa].width;
                                var currClmTextHeight = config.openerPageColumns[mfa].height;
                                var currClmGutter = config.openerPageColumns[mfa].gutter;
                                maxFloatArea = maxFloatArea + ((currClmTextWidth + currClmGutter)* currClmTextHeight);//update made here because earlier we haven't calc the gutter value
                                }//end of FOR loop
                            }//end of IF
                        else {
                            for (var mfa = 0; mfa < config.pageColumnsLen; mfa ++){
                                var currClmTextWidth = config.pageColumns[mfa].width;
                                var currClmTextHeight = config.pageColumns[mfa].height;
                                var currClmGutter = config.pageColumns[mfa].gutter;
                                maxFloatArea = maxFloatArea + ((currClmTextWidth + currClmGutter)* currClmTextHeight);//update made here because earlier we haven't calc the gutter value
                                }//end of FOR loop
                            }//end of ELSE
                        config["maxFloatArea"] = maxFloatArea;
                        config["rotateFloat"] = false;
                        config["margin"] = '';
                        var currPageName = parseInt(currPage.name);
                        var currPageFrame;
                        app.activeDocument.recompose();
                        config["margin"] = config.pageColumnDetails[config.templateType].otherPageMargin;
                        if (currPageName == 1){
                            currPageFrame = currPage.textFrames.itemByName("FIRST_FRAME");
                            config["currPageStyle"] = "RECTO";
                            config["margin"] = config.pageColumnDetails[config.templateType].openerPageMargin;
                            var marginDiff = 0;
                            if (currPageFrame.geometricBounds[0] != config.margin.top){
                                marginDiff = currPageFrame.geometricBounds[0] - config.margin.top;
                                config.margin.top = currPageFrame.geometricBounds[0];
                                }//end of IF
                            var openerPageColumnDetailsLength = config.openerPageColumnDetails.length;
                            for (var rs = 0; rs < openerPageColumnDetailsLength; rs++){
                                config.openerPageColumnDetails[rs].height = config.openerPageColumnDetails[rs].height - marginDiff;
                                }//end of FOR loop
                            }
                        else if(currPageName %2 ==1){
                            currPageFrame = currPage.textFrames.itemByName("RECTO");
                            config["currPageStyle"] = "RECTO";
                            }
                        else{
                            currPageFrame = currPage.textFrames.itemByName("VERSO");
                            config["currPageStyle"] = "VERSO";
                            }
                        if (currPageFrame.isValid){
                            var currPageFrameParas = currPageFrame.paragraphs;//collecting paragraphs on the page
                            var currPageFrameParasLen = currPageFrameParas.length;
                            //page preferences
                            var pageMrgnPref = currPage.marginPreferences;
                            var figPageNumber = currPage.name;
                            if (currPage.name == 1){
                                var topMargin = currPage.textFrames.itemByName("FIRST_FRAME").geometricBounds[0];                                
                                }
                            else {
                                var topMargin = pageMrgnPref.top;
                                }
                            var bottomMargin = pageMrgnPref.bottom;
                            var leftMargin = pageMrgnPref.left;
                            config["pageLeftMargin"] = leftMargin;
                            var rightMargin = pageMrgnPref.right;
                            config["pageRightMargin"] = rightMargin;
                            var currClmnWd = 0;
                            var citationIndex = 0;//Indexing very first citation of the page
                            var prevCitBasealign = 0;//Initially assigning 0 as previous citation basealign value
                            var currCitSpaceBalance = 0;//Initially assigning 0 as current citations below space
                            var currCitClmIndex, prevCitClmIndex= 0;//Wanted to index the column to which the current citation and the previous citation belongs, to do that initially assigning indexing as 0
                            var previousCitSpaceBalance = 0;//Initially assuming that for the first citation of the page doesn't required any space to exclude or balance space after citation
                            var defaultFitOnPage = true;//by default marking the float could not fit on the page
                            var forceMove = false;
                            floatCalcDone = false;
                            var totalCitHt = 0;
                            }
                        config["citationsOnCurrPage"] = [];
                        if(currPage.name == '1'){
                            var currProcessClms = config.openerPageColumns;
                            var currProcessClmsLen = config.openerPageColumnsLen;
                            }//end of IF
                        else {
                            var currProcessClms = config.pageColumns;
                            var currProcessClmsLen = config.pageColumnsLen;
                            }
                        //=============================================
                        for (var imcObj = 0; imcObj < currProcessClmsLen; imcObj++){
                            config.placedFloatsOnPage[imcObj] = {"top":[],"bottom":[]};
                            config.placedFloatsOnPage[imcObj]['top'] = [];
                            config.placedFloatsOnPage[imcObj]['bottom'] = [];
                            }//end of FOR loop                 
                        for (var pfc = 0; pfc < currPageFrameParasLen; pfc ++){
                            var initialXMLCheck = false;
                            var paraMainXMLElement;
                            if (!(currPageFrameParas[pfc].associatedXMLElements.length > 1)){//if this condition is true then assuming that correct associated xml element was not located
                                var xmlParaIndex = currPageFrameParas[pfc].index;
                                var currParaIndex = currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0].paragraphs[0].index;
                                if (xmlParaIndex == currParaIndex){
                                    paraMainXMLElement = currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0].xmlElements[0];
//~                                     if (paraMainXMLElement.xmlItems.length == 0){
//~                                         paraMainXMLElement = currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0];
//~                                         }
                                    if(paraMainXMLElement.isValid){
                                        if (paraMainXMLElement.xmlItems.length == 0){
                                            if(currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0].paragraphs[0].associatedXMLElements[0].paragraphs[0].index == xmlParaIndex){
                                                paraMainXMLElement = currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0].paragraphs[0].associatedXMLElements[0];
                                                }
                                            else {
                                                paraMainXMLElement = currPageFrameParas[pfc].insertionPoints.lastItem().associatedXMLElements[0];
                                                }
                                            }
                                        initialXMLCheck = true;
                                        }
                                    }
                                }
                            else if (currPageFrameParas[pfc].associatedXMLElements.length > 1){
                                if (currPageFrameParas[pfc].associatedXMLElements.length == 3){
                                    paraMainXMLElement = currPageFrameParas[pfc].associatedXMLElements[2];
                                    }
                                else {
                                    paraMainXMLElement = currPageFrameParas[pfc].associatedXMLElements[1];
                                    }
                                initialXMLCheck = true;
                                }
                            if (initialXMLCheck){
                                if (paraMainXMLElement.xmlItems[0].isValid){//checking whether child nodes available for the current node
                                    var xmlItms = paraMainXMLElement.xmlItems;//collecting all XML elements of the paragraph
                                    var xmlItmsLen = xmlItms.length;
                                    if(xmlItmsLen < 75){
                                    for (var itms = 0; itms < xmlItmsLen; itms ++){
                                        var currParaCitations = xmlItms[itms].evaluateXPathExpression("//span[@class='jrnlFirstCitation']");
                                        var currParaCitationsLength = currParaCitations.length;                                                        
                                        for (var cpc = currParaCitationsLength - 1; cpc >= 0; cpc --){
                                            config.citLineIndex = currParaCitations[cpc].lines[0].index
                                            var citPageName = currParaCitations[cpc].lines[0].characters.lastItem().parentTextFrames[0].parentPage.name;
                                            if (parseInt(citPageName) == currPageName && (currPageFrameParas[pfc].paragraphs[0].insertionPoints[0].index == currParaCitations[cpc].paragraphs[0].insertionPoints[0].index))//checking the citation page and curr page is same
                                            {
                                                var currCitBaseline = currParaCitations[cpc].lines[0].characters.lastItem().baseline;//current citation's baseline
                                                var currCitStHrOffset = currParaCitations[cpc].lines[0].characters.firstItem().insertionPoints[0].horizontalOffset;//current citation's horizontal offset
                                                if (config.currPageStyle == 'VERSO'){
                                                    var currClmnWdExtrmHrOffset = config.margin.outside;
                                                    }
                                                else{
                                                    var currClmnWdExtrmHrOffset = config.margin.inside;
                                                    }
                                                //checking to which column the current citation would belongs to
                                                /*1. From the config file reading the column details and using it checking to which column the float's citation belongs to
                                                                   2. This is required for calculating the citation's block height
                                                                */
                                                if(currPage.name == '1'){
                                                    var currProcessClms = config.openerPageColumns;
                                                    var currProcessClmsLen = config.openerPageColumnsLen;
                                                    }//end of IF
                                                else {
                                                    var currProcessClms = config.pageColumns;
                                                    var currProcessClmsLen = config.pageColumnsLen;
                                                    }
                                                for (var hzc = 0; hzc < currProcessClmsLen; hzc ++){
                                                    currClmnWd = parseFloat(currProcessClms[hzc].width);
                                                    var currClmnHt = parseFloat(currProcessClms[hzc].height);
                                                    currClmnWdExtrmHrOffset = parseFloat(currClmnWdExtrmHrOffset) + currProcessClms[hzc].gutter + currClmnWd;
                                                    if (currCitStHrOffset < currClmnWdExtrmHrOffset){
                                                        currProcessClms[hzc]["floatsCited"] = "true";
                                                        currCitClmIndex = hzc;
                                                        var test = currProcessClms[hzc];
                                                        if (citationIndex == 0 && !(prevCitClmIndex < currCitClmIndex)){//the very first citation will go through this case
                                                            var currCitBlkHt = currCitBaseline - (topMargin + prevCitBasealign);
                                                            currCitSpaceBalance = parseFloat(currProcessClms[hzc].height) + topMargin - (currCitBaseline);
                                                            citationIndex ++;
                                                            }//end of IF
                                                        else if (prevCitClmIndex < currCitClmIndex){//if the citation is in next column top then we are adding the balance space avaible on the previous column(s)
                                                            /*Then here would be two cases 1) the previous column would have a citation and some balance text below that 2) the previous column(s) would not have citation
                                                                                                    For case (2), add  the entire height of previous column(s) height to the next column's first citation's region
                                                                                                    */
                                                                if (hzc > 0 && !(currProcessClms[hzc-1].floatsCited)){
                                                                    for (var pclmn = hzc - 1; pclmn >= 0; pclmn --){
                                                                        if (!(currProcessClms[pclmn].floatsCited)){
                                                                            previousCitSpaceBalance = previousCitSpaceBalance + parseFloat(currProcessClms[pclmn].height);
                                                                            }//end of IF 
                                                                        else{//terminating the loop if the any of the previous 
                                                                            break;
                                                                            }
                                                                        }//end of for
                                                                    }//end of IF
                                                                var currCitBlkHt = (currCitBaseline + previousCitSpaceBalance) - (topMargin);
                                                                if (citationIndex == 0 && hzc > 0 && previousCitSpaceBalance == 0){
                                                                    currCitBlkHt = currProcessClms[hzc - 1].height + currCitBlkHt;
                                                                    }//end of if
                                                                currCitSpaceBalance = parseFloat(currProcessClms[hzc].height) + topMargin - (currCitBaseline);
                                                                citationIndex ++;
                                                                }//end of ELSE
                                                            else {
                                                                var currCitBlkHt = currCitBaseline - (prevCitBasealign);
                                                                currCitSpaceBalance = parseFloat(currProcessClms[hzc].height) + topMargin - (currCitBaseline);
                                                                citationIndex ++;
                                                                }//end of ELSE
                                                            prevCitBasealign = currCitBaseline;
                                                            previousCitSpaceBalance = currCitSpaceBalance;
                                                            prevCitClmIndex = hzc;
                                                            var currCitBlkArea = currCitBlkHt * currProcessClms[hzc].width;
                                                            var currPageCit = currParaCitations;
                                                            var currPageCitID = currPageCit[0].xmlAttributes.itemByName("data-rid").value;
                                                            currPageCitID = currPageCitID.replace(/^\s(.+)\s$/,'$1');
                                                            currPageCitID = currPageCitID.split(/\s/);
                                                            //checking whether the article type allows floats on first page and before that checking whether the float has any preferred placement
                                                            var overrideFirstPagePlacement = false;
                                                            var respectiveFloat = config.currDocDOM.evaluateXPathExpression("//div[@id='BLK_"+currPageCitID[0]+"']");
                                                            if (typeof(respectiveFloat[0]) === 'undefined'){
                                                                floatPlacerError = "Error: Unable to find float with ID '" + currPageCitID[0] + "' in data\tfailed\t0";
                                                                writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                                                exit();
                                                                }                                                            
                                                            var floatClass = respectiveFloat[0].xmlAttributes.itemByName("class").value;
                                                            var floatClassType = null;
                                                            if (respectiveFloat[0].xmlAttributes.itemByName("data-type").isValid){
                                                                floatClassType = respectiveFloat[0].xmlAttributes.itemByName("data-type").value;
                                                                }
                                                            if (respectiveFloat[0].xmlAttributes.itemByName("data-page-num").isValid){
                                                                if (respectiveFloat[0].xmlAttributes.itemByName("data-page-num").value == 1){
                                                                    overrideFirstPagePlacement = true;
                                                                    config.firstPagePreviousFloatForcePlaced = true;
                                                                    }//end of IF
                                                                else {
                                                                    config.firstPagePreviousFloatForcePlaced = false;
                                                                    }//end of ELSE
                                                                }//end of IF
                                                            else {
                                                                config.firstPagePreviousFloatForcePlaced = false;
                                                                }//end of ELSE
                                                            var classesOverrideForFirstPage = config.floatTypeOnFirstPage.split(',');
                                                            var classesOverrideForFirstPageLen = classesOverrideForFirstPage.length;
                                                            for (var ov = 0; ov < classesOverrideForFirstPageLen; ov ++){
                                                                if (classesOverrideForFirstPage[ov] == floatClassType){
                                                                    overrideFirstPagePlacement = true;
                                                                    if (currPage.name == 1 && !(config.firstPagePreviousFloatForcePlaced)){
                                                                        overrideFirstPagePlacement = false;
                                                                            if(config.citationBeingMoved.length == 0){
                                                                            overrideFirstPagePlacement = true;
                                                                            config.firstPagePreviousFloatForcePlaced = true;
                                                                            }//end of ELSE IF
                                                                        }//end of IF
                                                                    else if(config.citationBeingMoved.length == 0){
                                                                        overrideFirstPagePlacement = true;
                                                                        config.firstPagePreviousFloatForcePlaced = true;
                                                                        }//end of ELSE IF
                                                                    break;
                                                                    }//end of IF
                                                                }
                                                            if (overrideFirstPagePlacement == true && config.firstPagePreviousFloatForcePlaced){
                                                                overrideFirstPagePlacement = true;
                                                                }
                                                            else {
                                                                overrideFirstPagePlacement = false;
                                                                }
                                                            if (currPage.name == 1 && (overrideFirstPagePlacement == false) && !(config.firstPagePreviousFloatForcePlaced)){
                                                                var floatsNotAllowedForFirstPage = config.articleTypeNotFloatsOnFirstPage;
                                                                var floatsNotAllowedForFirstPageLen = floatsNotAllowedForFirstPage.length;
                                                                for (var fp = 0; fp < floatsNotAllowedForFirstPageLen; fp++){
                                                                    var currArtType = config.articleType;
                                                                    var configArtType = floatsNotAllowedForFirstPage[fp];
                                                                    if(String(currArtType) == String(configArtType)){
                                                                        config.citationBeingMoved.push(currPageCitID);
                                                                        break;
                                                                        }
                                                                    else if (fp == (floatsNotAllowedForFirstPageLen -1) && !(currArtType == configArtType)){
                                                                        citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                                                        }
                                                                    }
                                                                }
                                                            else {
                                                                //IMPORTANT: while moving to second page of the docment we may have some floats that have been collected in overrideFirstPagePlacement,
                                                                //the situation that those floats actiual citation may be pulled to page no. 2 or would have retained on page 1 itself, so an additional check is done here to handle that situation
                                                                if (currPage.name == 2 && config.citationBeingMoved.length > 0 && config.processFirstPageFloats == true){
                                                                    var citationBeingMovedLen = config.citationBeingMoved.length;
                                                                    for (var chkl = 0; chkl < citationBeingMovedLen; chkl ++){
                                                                        if (currPageCitID[0] == config.citationBeingMoved[chkl]){
                                                                            config.citationBeingMoved = config.citationBeingMoved.slice(0, chkl)//removing the citation which is cited on current page
                                                                            var currFlthzc = hzc;
                                                                            var currFLtCurrCitBlkHt = currCitBlkHt;
                                                                            processFirstPageBlocks();
                                                                            currCitBlkHt = currFLtCurrCitBlkHt;
                                                                            hzc = currFlthzc;
                                                                            citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                                                            config.processFirstPageFloats = false;
                                                                            break;
                                                                            }//end of IF
                                                                        else if (!(currPageCitID[0] == config.citationBeingMoved[chkl]) && chkl == citationBeingMovedLen - 1){
                                                                            var currFlthzc = hzc;
                                                                            var currFLtCurrCitBlkHt = currCitBlkHt;
                                                                            processFirstPageBlocks();
                                                                            currCitBlkHt = currFLtCurrCitBlkHt;
                                                                            hzc = currFlthzc;
                                                                            citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                                                            config.processFirstPageFloats = false;
                                                                            }//end of ELSE IF
                                                                        }//end of FOR loop
                                                                    }//end of IF
                                                                else {
                                                                    citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                                                    }//end of ELSE
                                                                }
                                                            hzc = currProcessClmsLen;
                                                           } 
                                                        }//end of IF
                                                    }//end of FOR loop
                                                config.totalCitationHeight = totalCitHt;
                                                }
                                        }//end of FOR loop                                   
                                    }//end of IF checking nodes
                                }//end of IF
                            }//end of FOR loop
                        }//end of FOR loop
                        if(!(config.userPlacingFloatsDetails[currPage.name] == null)){
                            currPageCit = null;
                            currPageCitID = config.userPlacingFloatsDetails[currPage.name];
                            currCitBlkArea = 0;//since the float are being forcely placed by the user discarding float's citation height
                            currCitBlkHt = 0;// as above
                            totalCitHt = 0;//as above
                            currCitBaseline = 0;//as above
                            hzc =0;//assuming the citaion is on first column
                            var currPageCitIDLen = currPageCitID.length;
                            for (var uc = 0; uc < currPageCitIDLen; uc ++){
                                var currUserCit = currPageCitID[uc];
                                if(checkValueInArray(config.pageFloatIDsArray.concat(config.notPlacedFloatsIDs), currUserCit)){//checking whether the citation is already placed on pasteboard, that is it's actual citation would be the current page, to ensure that we checking the citation with 'config.pageFloatIDsArray and config.notPlacedFloatsIDs', if true then its citation block height would remain 0
                                    config.docFloatIDsArray[currUserCit].citationBlockHeight = currCitBlkHt;
                                    }//end of IF
                                else {
                                    citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                    }//end od ELSE
                                }//end of FOR loop                                                      
                            }//end of IF
                            //===============processing first page citations if required==============
                            if(currPage.name == 2 && config.processFirstPageFloats == true && config.citationBeingMoved.length > 0){
                                processFirstPageBlocks();
                                }
                            function processFirstPageBlocks(){
                                var citationBeingMovedLen = config.citationBeingMoved.length;
                                for(var fpc = 0; fpc < citationBeingMovedLen; fpc++){                              
                                    var currPageCitID = config.citationBeingMoved[fpc];
                                    currCitBlkArea = totalCitHt = currCitBlkHt = hzc = currCitBaseline = 0;
                                    currPageCit = null
                                    currPageName = 1;
                                    forceMove = false;
                                    defaultFitOnPage = true, 
                                    citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline);
                                    currPageName = currPage.name;
                                    //config.pageFloatIDsArray = config.pageFloatIDsArray.concat([currPageCitID]);
                                    }//end of FOR loop
                                config.citationBeingMoved = [];
                                }//end of processFirstPageBlocks function
                            //============================================================
                        //checking whetther any of the floats has flag for preferred placement for the current page name
                        if (config.pageFloatIDsArray.length > 0 && !(currPage.name == '1')){
                            floatPlacer.events.placingFloats(config.pageFloatIDsArray, currPage);
                            }//end of 
                        else if(currPage.name == '1'){
                            //=====================================================================
                            //The below details collected for first page and for the rest will be collected in 'placingStacks' function 
                            var clmLen = config.openerPageColumns.length;
                            var prevClmnWd = 0;
                            var marginForCalc = config.margin.inside;
                            for (var pcd = 0; pcd < clmLen; pcd ++){
                                    config.openerPageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].gutter, config.margin.top + config.openerPageColumns[pcd].height, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].width + config.openerPageColumns[pcd].gutter];//exculding margin
                                    prevClmnWd = config.openerPageColumns[pcd].width + prevClmnWd + config.openerPageColumns[pcd].gutter;
                                }//end of FOR loop
                            //=====================================================================
                            pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);//IMPORTANT: Needed update                            
                            if((config.templateType == 'LAYOUTX')){
                                floatPlacer.events.placeAsPerUserInputs(currPage);
                                }//end of IF
                            else if (config.floatOnFirstPageForDefaultLayout){//only if the config allows to place floats on first page
                                //=====================================================================
                                var clmLen = config.openerPageColumns.length;
                                var prevClmnWd = 0;
                                var marginForCalc = config.margin.inside;
                                for (var pcd = 0; pcd < clmLen; pcd ++){
                                        config.openerPageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].gutter, config.margin.top + config.openerPageColumns[pcd].height, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].width + config.openerPageColumns[pcd].gutter];//exculding margin
                                        prevClmnWd = config.openerPageColumns[pcd].width + prevClmnWd + config.openerPageColumns[pcd].gutter;
                                    }//end of FOR loop
                                //=====================================================================
                                pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);//IMPORTANT: Needed update                                
                                floatPlacer.events.placingFloats(config.pageFloatIDsArray, currPage);
                                }//end of ESLE IF
                            else {
                                config.notPlacedFloatsIDs = config.pageFloatIDsArray.concat(config.notPlacedFloatsIDs);
                                }
                        }//end of ELSE IF
                    app.activeDocument.recompose();
//                    if (!(currPage.name == '1') && (config.templateType == 'LAYOUT1')){
                    if (!(currPage.name == '1')){
                        floatPlacer.events.columnBaseAlign(currPage, pageClmDetails);
                        }
                    else if (currPage.name == '1'){
                        pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);//IMPORTANT: Needed update
//~                         if (config.templateType == 'LAYOUT1'){
//~                             floatPlacer.events.columnBaseAlign(currPage, pageClmDetails);                        
//~                             }//end of 
                        floatPlacer.events.columnBaseAlign(currPage, pageClmDetails);                        
                        pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                        }//end of IF
                    ResolveOverset(app.activeDocument);
                    app.activeDocument.recompose();
                    if (config.notPlacedFloatsIDs.length > 0|| app.activeDocument.pages[String(currPageName)].isValid || config.citationBeingMoved.length > 0){//checking whether "notPlacedFloatsIDs" are avaible or moving to next page for citation check
                        if (!(app.activeDocument.pages[String(currPageName)].isValid)){//if this condition is true the float will placed on next empty pages
                            nextPage = app.activeDocument.pages.add(LocationOptions.AT_END);
                            }
                        else {
                            nextPage = app.activeDocument.pages[String(currPageName)];
                            }                    
                        //forcing citation collected on first page(s) to place on next page if the document has only one page of text
                        try{
                        var lastNodePageName = app.activeDocument.xmlElements[0].evaluateXPathExpression("//doc")[0].xmlItems.lastItem().paragraphs.lastItem().characters.lastItem().parentTextFrames[0].parentPage.name;
                        }catch(e){
                            var lastNodePageName = undefined;
                            }
                        if (config.notPlacedFloatsIDs.length == 0 && config.citationBeingMoved.length > 0 && nextPage.name == 2 && lastNodePageName == 1){
                            config.notPlacedFloatsIDs = config.notPlacedFloatsIDs.concat(config.citationBeingMoved);
                            processFirstPageBlocks();
                            }
                        config.pageFloatIDsArray = config.notPlacedFloatsIDs;
                        config.notPlacedFloatsIDs = [];
                        floatPlacer.events.collectCitation(config.pageFloatIDsArray);//recurrsing the "collectCitation" to proceed further to next page
                        //floatPlacer.events.columnBaseAlign(currPage, pageClmDetails);
                        }//end of checking next page
           //     }//end of IF
            },//end of  'collectCitation' function   
            calcFloatAreas: function(currCitation,currPageCit, hzc, currCitBlkHt, rotateFloat, currCitBlkHt){
                currCitBlkHt = currCitBlkHt;
                //collecting curr page margin info
                var pageMrgnPref = currPage.marginPreferences;
                var figPageNumber = currPage.name;
                var topMargin = pageMrgnPref.top;
                var bottomMargin = pageMrgnPref.bottom;
                var leftMargin = pageMrgnPref.left;
                var rightMargin = pageMrgnPref.right;
                wrapRight = parseInt(config.wrapAroundFloat.right);
                wrapLeft = parseInt(config.wrapAroundFloat.left);
                wrapTop = parseInt(config.wrapAroundFloat.top);
                wrapBottom = parseInt(config.wrapAroundFloat.bottom);                    
                var pageTopMaxPosition = parseFloat(config.pageSize.height) - topMargin;
                var pageBottomMaxPosition = parseFloat(config.pageSize.height) - bottomMargin;
                var tempFigureFrm;
                var currCitID = currCitation;
                if (!(checkValueInArray(config.pageFloatIDsArray, currCitID)) && !(checkValueInArray(config.floatsCalcAlreadyDoneForCurrPage, currCitID))){//checking whether the float is being moved from previous page 
                    config["floatsCalcAlreadyDoneForCurrPage"] = config["floatsCalcAlreadyDoneForCurrPage"].concat(currCitID);
                    var respectiveFloat = config.currDocDOM.evaluateXPathExpression("//div[@id='BLK_"+currCitID+"']");
                    if (currPageCit == null){
                        var currCitBaseline = 0;
                        }
                    else {
                        var currCitBaseline = currPageCit[0].lines[0].characters.lastItem().baseline;
                        }
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                    currProgressPercent = currProgressPercent + percentSplit;
                    displayMSG("Processing float: " + String(currCitID) + "\tin-progress\t" + Math.round(currProgressPercent));
                    debuggerMSG("Processing float: " + String(currCitID));
                    var currTestFlt = respectiveFloat[0];
                    if (respectiveFloat[0].isValid){
                        var floatClass = respectiveFloat[0].xmlAttributes.itemByName("class").value;
                        config['currFloatClassName'] = floatClass;
                        if (!(floatClass == 'jrnlBoxBlock')){
                            app.activeDocument.layoutWindows[0].zoom(ZoomOptions.fitSpread);
                            app.activeWindow.activePage = currPage;
                            app.activeWindow.zoomPercentage = 51;
                            var startPara = respectiveFloat[0].paragraphs[0];
                            var lastPara =respectiveFloat[0].paragraphs.lastItem();
                            var pageBaseFrmHt, pageBaseFrmWd;
                            //======================================================
                            if(currPage.name == '1'){
                                var currProcessClms = config.openerPageColumns;
                                var currProcessClmsLen = config.openerPageColumnsLen;
                                }//end of IF
                            else {
                                var currProcessClms = config.pageColumns;
                                var currProcessClmsLen = config.pageColumnsLen;
                                }
                            //====================================================
                            if (parseInt(figPageNumber)%2 == 0){//verso pages
                                pageBaseFrmHt = config.geoBoundsVerso[2] - config.geoBoundsVerso[0];
                                pageBaseFrmWd = config.geoBoundsVerso[3] - config.geoBoundsVerso[1];
                                tempFigureFrm = config.currDoc.pages.itemByName(figPageNumber).textFrames.add({geometricBounds: [config.geoBoundsVerso[0], config.geoBoundsVerso[1] - config.pageSize.height, config.geoBoundsVerso[0] + config.columnDetails[0].height, (config.geoBoundsVerso[1] + pageBaseFrmHt) - config.pageSize.height]});
                                tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrm.geometricBounds[0] + currProcessClms[0].height, tempFigureFrm.geometricBounds[1] + currProcessClms[0].height];
                                actualFrmSize = tempFigureFrm.geometricBounds;
                                tempFigureFrm.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                            }
                            else{//recto pages
                                pageBaseFrmHt = config.geoBoundsRecto[2] - config.geoBoundsRecto[0];
                                pageBaseFrmWd = config.geoBoundsRecto[3] - config.geoBoundsRecto[1];
                                if (currPage.name == 1){
                                    tempFigureFrm = config.currDoc.pages.itemByName(figPageNumber).textFrames.add({geometricBounds: [config.geoBoundsRecto[0], config.geoBoundsRecto[1] + (config.pageSize.width), config.geoBoundsRecto[2], (config.geoBoundsRecto[1] + pageBaseFrmHt) + (config.pageSize.width)]});
                                    }
                                else {
                                    tempFigureFrm = config.currDoc.pages.itemByName(figPageNumber).textFrames.add({geometricBounds: [config.geoBoundsRecto[0], config.geoBoundsRecto[1] + (2*config.pageSize.width), config.geoBoundsRecto[2], (config.geoBoundsRecto[1] + pageBaseFrmHt) + (2*config.pageSize.width)]});
                                    }
                                tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrm.geometricBounds[0] + currProcessClms[0].height, tempFigureFrm.geometricBounds[1] + currProcessClms[0].height];
                                actualFrmSize = tempFigureFrm.geometricBounds;
                                tempFigureFrm.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;                
                            }
                            tempFigureFrm.textFramePreferences.ignoreWrap = true;//by default setting ignore text wrap true
                            tempFigureFrm.name = String(currCitID);
                            var tempFigureFrmRightNode = tempFigureFrm.geometricBounds[3];
    //                        tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1] + config.pageSize.width, tempFigureFrm.geometricBounds[2], tempFigureFrm.geometricBounds[1] + config.pageSize.width +config.textFrmColWidth];
                            var actualFrmWidth = actualFrmSize[3] - actualFrmSize[0];
                            var tblGroup = false;
                            myStory = respectiveFloat[0].parentStory;
                            try{
                            var frmFirstParaStyle = respectiveFloat[0].xmlElements[0].xmlAttributes.itemByName("pstyle").value;
                            }catch(e){}                            
                            if(frmFirstParaStyle == undefined){
                                try{
                                    var frmFirstParaStyle = respectiveFloat[0].xmlElements[0].xmlElements[0].xmlAttributes.itemByName("pstyle").value;
                                    tblGroup = true;
                                    }catch(e){}
                                }//end of IF
                            try{
                            var forcePlace = respectiveFloat[0].xmlElements[0].xmlAttributes.itemByName("pstyle").value;}catch(e){}
                            tempFigureFrm.placeXML(respectiveFloat[0]);
                            var floatOrientation = 'portrait';
                            var userInputSpanTo = '';
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-orientation").isValid){
                                floatOrientation = respectiveFloat[0].xmlAttributes.itemByName("data-orientation").value;
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-float-placement").isValid){
                                userInputSpanTo = respectiveFloat[0].xmlAttributes.itemByName("data-float-placement").value;
                                }
                            //===================================================
                            if(currPage.name == '1'){
                                var currProcessClmsWidth = config.openerPageColumnsSpanWidth;
                                var currProcessClmsWidthLen = config.openerPageColumnsLen;
                                }//end of IF
                            else {
                                var currProcessClmsWidth = config.columnSpanWidth;
                                var currProcessClmsWidthLen = config.pageColumnsLen;
                                }                           
                            //====================================================
                            var columnSpanWidthLen = config.columnSpanWidth.length;
                            var portraitWdith = [config.columnSpanWidth[columnSpanWidthLen - 1][0].width];
                            var tempFigureFrmMaxHeight = tempFigureFrm.geometricBounds[3] - tempFigureFrm.geometricBounds[1];
                            var imageWidth = 0;
                            if(floatOrientation == 'landscape'){//resizing if the figure size exceeds portrait width
                                imageWidth = tempFigureFrm.geometricBounds[2] - tempFigureFrm.geometricBounds[0];
                                }
                            else if (userInputSpanTo == 'TopDoubleColumn' || userInputSpanTo == 'BottomDoubleColumn' || userInputSpanTo == 'DoubleColumn' ){
                                imageWidth = [currProcessClmsWidth[1][0].width]
                                }
                            else if (userInputSpanTo == 'TopSingleColumn' || userInputSpanTo == 'SingleColumn'){
                                imageWidth = [currProcessClmsWidth[0][0].width]
                                }
                            //constructing object image resizing function
                            if (floatOrientation == 'landscape'){
                                var imageData = {
                                    "maxWidth": imageWidth,
                                    "maxSingleColWidth": imageWidth,
                                    "maxHeight": currProcessClmsWidth[currProcessClmsWidthLen -1][0].width,
                                    "figCaptionMinLines": config.figCaptionMinLines,
                                    "forceWidthTo": imageWidth,
                                    "orientation": floatOrientation //landscape
                                    }                                
                                }//end of IF
                            else {
                                var imageData = {
                                    "maxWidth": currProcessClmsWidth[currProcessClmsWidthLen -1][0].width,
                                    "maxSingleColWidth": currProcessClmsWidth[0][0].width,
                                    "maxHeight": tempFigureFrmMaxHeight,
                                    "figCaptionMinLines": config.figCaptionMinLines,
                                    "forceWidthTo": imageWidth,
                                    "orientation": floatOrientation //landscape
                                    }                                
                                }//end of ELSE IF
                            //updating glyphs
//~                             logTimer("Updating glyphs...");       
                            //checking whether the float have a  figure or table if nor adding a string "NO_FIGURE_FOUND|NO_TABLE_FOUND" and empahzising using character style
                            if (tempFigureFrm.allGraphics.length == 0 && !(tempFigureFrm.tables[0].isValid) && tempFigureFrm.rectangles.length == 0){
                                var floatBlockXML = respectiveFloat[0];
                                var floatBlockXMLElements = floatBlockXML.xmlElements;
                                var floatBlockXMLElementsLen = floatBlockXMLElements.length;
                                for (var fb = 0; fb < floatBlockXMLElementsLen; fb ++){
                                    var floatBlockCurrXML = floatBlockXMLElements[fb];
                                    var floatBlockCurrXMLPara = floatBlockCurrXML.paragraphs[0];
                                    var floatBlockCurrXMLParaStyleName = floatBlockCurrXML.xmlAttributes.itemByName("pstyle").value;//floatBlockCurrXMLPara.appliedParagraphStyle.name;
//~                                     var floatBlockCurrXMLParaStyleName = floatBlockCurrXMLPara.appliedParagraphStyle.name;
                                    if (floatBlockCurrXMLParaStyleName == 'jrnlFigCaption' && tempFigureFrm.allGraphics.length == 0){
                                        var alertText = floatBlockCurrXML.insertTextAsContent("NO_FIGURE_FOUND",XMLElementPosition.ELEMENT_START);
                                        alertText.appliedCharacterStyle = config.currDoc.characterStyles.itemByName('NO_FLOAT');
                                        break;
                                        }//end of IF
                                    else if (floatBlockCurrXMLParaStyleName == 'jrnlTblCaption' && !(tempFigureFrm.tables[0].isValid)){
                                        var alertText = floatBlockCurrXML.insertTextAsContent("NO_TABLE_FOUND",XMLElementPosition.ELEMENT_START);
                                        alertText.appliedCharacterStyle = config.currDoc.characterStyles.itemByName('NO_FLOAT');
                                        break;
                                        }//end of IF                                
                                    }//end of FOR loop
                                //then checking whether the float comes with reduce font size details if so change all paragraphs to that size
                                }//end of IF
                            //====removing last para's para separator======
                            var frmParaLen = respectiveFloat[0].paragraphs.length;
                            var frmFirstPara = respectiveFloat[0].paragraphs.firstItem();
                            var frmLastPara = respectiveFloat[0].paragraphs.lastItem();
                            var frmLastParaStyle = frmLastPara.appliedParagraphStyle.name;
                            var frmPenultPara = respectiveFloat[0].paragraphs[frmParaLen-2];
                            var frmPenultParaStyle = frmPenultPara.appliedParagraphStyle.name;
                            if(!(frmFirstParaStyle == undefined)){
                                frmFirstPara.appliedParagraphStyle = config.currDoc.paragraphStyles.itemByName(frmFirstParaStyle);
                                }//end of IF
                            if (frmLastPara.characters.lastItem().contents == '\r'){
                                frmLastPara.characters.lastItem().contents = "";
                                frmLastPara.appliedParagraphStyle = frmLastParaStyle;                            
                                }
                            else if (frmPenultPara.characters.lastItem().contents == '\r'){
                                frmPenultPara.characters.lastItem().contents = "";
                                frmPenultPara.appliedParagraphStyle = frmPenultParaStyle;                            
                                }
                            //=====================================
                            config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                            if (tempFigureFrm.allGraphics.length > 0 && !(tempFigureFrm.tables[0].isValid)){
                                tempFigureFrm.appliedObjectStyle = config.currDoc.objectStyles.itemByName('FIG');
                                imageSizer(tempFigureFrm, imageData);
                                }//end of IF
                            else if (tempFigureFrm.tables[0].isValid){
                                tempFigureFrm.appliedObjectStyle = config.currDoc.objectStyles.itemByName('TBL');
                                _remove_math_overlap_in_table(tempFigureFrm);
                                if (config.applyTableLeftRightBorder){
                                    var tblsInFrm = tempFigureFrm.tables;
                                    var tblsInFrmLen = tblsInFrm.length;
                                    var tblBorderStroke = config.applyTableBorderWidth;
                                    var tblBorderColor = config.applyTableBorderColor;
                                    for (var tf = 0; tf < tblsInFrmLen; tf++){
                                        var currTF = tblsInFrm[tf];
                                        currTF.columns.firstItem().leftEdgeStrokeType = 'Solid';
                                        currTF.columns.firstItem().leftEdgeStrokeWeight = tblBorderStroke;
                                        currTF.columns.firstItem().leftEdgeStrokeColor = app.activeDocument.swatches.itemByName(tblBorderColor);        
                                        currTF.columns.lastItem().rightEdgeStrokeType = 'Solid';
                                        currTF.columns.lastItem().rightEdgeStrokeWeight = tblBorderStroke;
                                        currTF.columns.lastItem().rightEdgeStrokeColor = app.activeDocument.swatches.itemByName(tblBorderColor);
                                        }//end of FOR loop
                                    }//end of IF
                                    app.findGrepPreferences = NothingEnum.nothing;
                                    app.changeGrepPreferences = NothingEnum.nothing;
                                    app.findGrepPreferences.findWhat = "(~m)"
                                    app.findGrepPreferences.appliedParagraphStyle = "jrnlTblBody";
                                    app.changeGrepPreferences.changeTo = "$1~i"
                                    tempFigureFrm.changeGrep();                                
                                }//end of ELSE
                           config.currDoc.recompose();
                           //==================adding glyphs==================
                           config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                           var tempBound = tempFigureFrm.geometricBounds;
                           tempFigureFrm.textWrapPreferences.textWrapMode = TextWrapModes.NONE;
                           tempFigureFrm.move(currPage);
                           currTextFrameObjectForGlyphSearch = tempFigureFrm;
                           app.doScript(File(layerTemplateScript + "\\"+ "missingGlyph.jsx"), ScriptLanguage.javascript, [layerTemplateScript, currTextFrameObjectForGlyphSearch]);
                           _math_cstyle_apply_and_remove_overlap();
                           tempFigureFrm.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                           tempFigureFrm.move([tempBound[1], tempBound[0]]);
                           config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                           //==============================================
                            //================================================================================================
                            tempFigureFrm.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                            if (!(tempFigureFrm.overflows)){
                                tempFigureFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
                                tempFigureFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF; 
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").isValid){
                                wrapTop = parseFloat(respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").value.replace('pt', ''));
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").isValid){
                                wrapBottom = parseFloat(respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").value.replace('pt', ''));
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").isValid){
                                wrapLeft = parseFloat(respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").value.replace('pt', ''));
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").isValid){
                                wrapRight = parseFloat(respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").value.replace('pt', ''));
                                }
                            tempFigureFrm.textWrapPreferences.textWrapOffset = [wrapTop, wrapLeft, wrapBottom, wrapRight];
                            tempFigureFrm.textFramePreferences.ignoreWrap = true;
                            var currFloatBounds, currFloatWd, currFloatHt;
                            config.rotateFloat = false;
                            //checking the block has media files if so the media would be resized to sinlge column with of the current textframe=============
                            if (tempFigureFrm.allPageItems.length == 2 && tempFigureFrm.allPageItems[1] == '[object Movie]'){
                                if (userInputSpanTo == 'TopDoubleColumn' || userInputSpanTo == 'BottomDoubleColumn' || userInputSpanTo == 'DoubleColumn' ){
                                    imageWidth = [currProcessClmsWidth[1][0].width]
                                    }//end of IF
                                else {
                                    imageWidth = [currProcessClmsWidth[0][0].width]                                    
                                    }//end of ESLE IF
                                _media_resize(tempFigureFrm, imageWidth);
                                }//end of IF
                            //========================================
                            var column_arr = [];
                            for(var cw = 0; cw < currProcessClmsWidthLen; cw ++){
                                column_arr.push(currProcessClmsWidth[cw][0].width);
                                }
                            if (tempFigureFrm.allGraphics.length > 0 && !(tempFigureFrm.tables[0].isValid)){
//~                                 _image_resize(column_arr,tempFigureFrm);
                                currFloatBounds = tempFigureFrm.allGraphics[0].parent.geometricBounds;
                                currFloatWd = currFloatBounds[3] - currFloatBounds[1];
                                currFloatHt = currFloatBounds[2] - currFloatBounds[0];
                                //checking whether the float width exceeds portrait width, if so reducing the width to portrait and the if the user specifies to single, double, ... then that width will be considered
                                }//end of IF
                            else if (tempFigureFrm.tables[0].isValid){
                                currFloatBounds = tempFigureFrm.tables[0];
                                currFloatWd = currFloatBounds.width;
                                currFloatHt = currFloatBounds.height;
                                }//end of ELSE
                            else {//if there is no figure or table then will go through below
                                if (currPage.name == '1'){
                                    tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1],tempFigureFrm.geometricBounds[2], config.openerPageColumnsSpanWidth[0][0].width + tempFigureFrm.geometricBounds[1]];                               
                                    }//end of IF
                                else {
                                    tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1],tempFigureFrm.geometricBounds[2], config.columnSpanWidth[0][0].width + tempFigureFrm.geometricBounds[1]];                               
                                    }//end of ELSE
                                tempFigureFrm.fit(FitOptions.FRAME_TO_CONTENT);
                                currFloatWd = tempFigureFrm.geometricBounds[3] - tempFigureFrm.geometricBounds[1];
                                currFloatHt = 0;
                                }//end of ELSE IF
                           config.currDoc.recompose();
//                            var tempFigureFrmLastParaBasline = tempFigureFrm.paragraphs.lastItem().lines.lastItem().baseline;
                            var tempFigureFrmLastParaBasline = tempFigureFrm.paragraphs.lastItem().baseline;
                            var tempFigureFrmBtmInset = tempFigureFrm.textFramePreferences.insetSpacing[2];
                            if (!(tempFigureFrm.overflows)){
                                tempFigureFrm.fit(FitOptions.FRAME_TO_CONTENT);
                                tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrmLastParaBasline + tempFigureFrmBtmInset, tempFigureFrm.geometricBounds[3]];
                                tempFigureFrm.recompose();
                                tempFigureFrm.fit(FitOptions.FRAME_TO_CONTENT);
                                }
                            //checking to how many column the current float spans - starts
                            var tempFigureFrmTempHt = tempFigureFrm.geometricBounds[2] - tempFigureFrm.geometricBounds[0];
                            var columnSpanWidthLen = config.columnSpanWidth.length;
                            for (var sp = currProcessClmsWidthLen - 1; sp >= 0; sp --){
                                var currSpnWdith = currProcessClmsWidth[sp][0].width;
                                if (!(currProcessClmsWidth[sp-1] == undefined)){
                                    var preSpnWdith = currProcessClmsWidth[sp-1][0].width;
                                    if (parseInt(currFloatWd*100)/100 > parseInt(preSpnWdith*100)/100 && parseInt(currFloatWd*100)/100 <= parseInt(currSpnWdith*100)/100){
                                        floatSpnTo = currProcessClmsWidth[sp][1].index;
                                        break;
                                        }
                                    else if (parseInt(currFloatWd*100)/100 > parseInt(preSpnWdith*100)/100 && parseInt(currFloatWd*100)/100 > parseInt(currSpnWdith*100)/100){
                                        floatSpnTo = currProcessClmsWidth[sp][1].index;
                                        if (config.landscapeFloatOnFirstPage == false && currPage.name == 1){
                                            config.rotateFloat = false;
                                            }
                                        else {
                                            config.rotateFloat = true;
                                             }
                                        if (!(tempFigureFrm.overflows) && (tempFigureFrmTempHt >currSpnWdith)){
                                            tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrm.geometricBounds[0] + currSpnWdith, tempFigureFrm.geometricBounds[3]];
                                            }
                                        break;
                                        }
                                    }//end of IF
                                else{
                                    floatSpnTo = currProcessClmsWidth[sp][1].index;
                                    }//end of ELSE
                                }//end of FOR loop
                            //checking to how many column the current float spans - ends
                            var wdAfterRotate = htAfterRotate = wdDiff = wdSplitEqually = 0;
                            if (!config.rotateFloat){
                                if (!(tempFigureFrm.overflows)){
                                    if (currPage.name == 1){
                                        tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrmLastParaBasline + tempFigureFrmBtmInset, config.openerPageColumnsSpanWidth[floatSpnTo][0].width + tempFigureFrm.geometricBounds[1]];
                                        }
                                    else {
                                        tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrmLastParaBasline + tempFigureFrmBtmInset, config.columnSpanWidth[floatSpnTo][0].width + tempFigureFrm.geometricBounds[1]];
                                        }
                                    tempFigureFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
                                    tempFigureFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;                                     
                                    var tempFigureFrmLastParaBasline = tempFigureFrm.paragraphs.lastItem().baseline;
                                    var tempFigureFrmBtmInset = tempFigureFrm.textFramePreferences.insetSpacing[2];
                                    tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrmLastParaBasline + tempFigureFrmBtmInset, tempFigureFrm.geometricBounds[3]];
                                    tempFigureFrm.fit(FitOptions.FRAME_TO_CONTENT);
                                    }//end of IF
                                else {
                                    tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], tempFigureFrm.geometricBounds[2], config.columnSpanWidth[floatSpnTo][0].width + tempFigureFrm.geometricBounds[1]];
                                    }//end of ELSE
                                }
                            else if (!tempFigureFrm.overflows && config.rotateFloat){
                               tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], config.columnSpanWidth[floatSpnTo][0].width + tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[3]];
                               currFloatWd = tempFigureFrm.geometricBounds[3] - tempFigureFrm.geometricBounds[1];
                               currFloatHt = tempFigureFrm.geometricBounds[2] - tempFigureFrm.geometricBounds[0];
                               tempFigureFrm.rotationAngle = 90;
                               //after rotating the float width and height of the float will be trasposed
                               var tempWd = currFloatHt;
                               var tempHt = currFloatWd;
                                currFloatWd = tempHt;
                                currFloatHt = tempWd;
                                tempFigureFrm.fit(FitOptions.FRAME_TO_CONTENT);                                
                                htAfterRotate = tempFigureFrm.geometricBounds[2] - tempFigureFrm.geometricBounds[0];
                                wdAfterRotate = tempFigureFrm.geometricBounds[3] - tempFigureFrm.geometricBounds[1];
                                var singleClmMaxWidth = config.columnSpanWidth[0][0].width;
                                var twoThirdClmMaxWidth = config.landscape.twoThirdWidth;
                                //then the height of the float would be in possible three variant 1) span to full page, 2) span to column single column (if style allows) and 3) two-third width of the page (if style allows)
                                //to do so we need to calculate the current height (will be changed as width after rotated)
                                if (config.landscape.singleColumnStyle && (wdAfterRotate <= singleClmMaxWidth)){//if this condition is true then the float could be placed in single colmn
                                    floatSpnTo = floatSpnTo -1;
                                    wdDiff = singleClmMaxWidth - wdAfterRotate; 
                                    wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                                    if (config.landscape.horizontalCenter){
                                        tempFigureFrm.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                                        }//end of IF
                                    else {
                                        tempFigureFrm.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                                        wdSplitEqually = 0;
                                        }//end of ELSE
                                    }//end of IF
                                else if (config.landscape.twoThirdColumnStyle && (wdAfterRotate <= (twoThirdClmMaxWidth - wrapBottom)) && (wdAfterRotate > singleClmMaxWidth)){//if this condition is true then the float could be place as two-third width table
                                    wdSplitEqually = 0;
                                    tempFigureFrm.textWrapPreferences.textWrapOffset = [0, wrapLeft, config.columnDetails[floatSpnTo].gutter, wrapRight];//resetting wrap values for left and right after rotating;
                                    }//end of ELSE
                                else {
                                    wdDiff = currFloatHt - wdAfterRotate; 
                                    wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                                    if (config.landscape.horizontalCenter){
                                        tempFigureFrm.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                                        }//end of IF
                                    else {
                                        tempFigureFrm.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                                        wdSplitEqually = 0;
                                        }//end of ELSE
                                    }//end of ESLE
                                }
                            tempFigureFrm.recompose();
                            currFloatArea = currFloatHt * currFloatWd;
                            floatBlockHt = (tempFigureFrm.geometricBounds[2] - tempFigureFrm.geometricBounds[0]);
                            if (floatBlockHt + wrapBottom> config.columnDetails[0].height){
                                var htDiff = (parseFloat(floatBlockHt) + parseFloat(wrapBottom)) - parseFloat(config.columnDetails[0].height);
                                if (htDiff < wrapBottom){
                                    floatBlockHt = parseFloat(floatBlockHt) + parseFloat(htDiff);
                                    }
                                }//end of IF
                            else {
                                floatBlockHt = floatBlockHt + wrapBottom;
                                }//end of ELSE IF
                            floatBlockWd = tempFigureFrm.geometricBounds[3] - tempFigureFrm.geometricBounds[1];
                            floatBlockArea = floatBlockHt * floatBlockWd;//Total float block area including caption
                            tempFigureFrmID = tempFigureFrm.id;
                            //tempFigureFrm.name = respectiveFloat;//Naming the floating frame
                            //======Now checking whether the float has overset if so continued style for that journal will be followed as per config ======
                            config["continuedFloatDetails"] = {};
                            config.floatContinued = false;
                            if (tempFigureFrm.overflows){
                                //then sending the frame to another function "floatContinued" to do continued process
                                tempFigureFrm.appliedObjectStyle = config.currDoc.objectStyles.itemByName('TBL_CONT_BOTTOM');
                                var tableFrameCurr = tempFigureFrm;
                                config.floatContinued = true;
                                var currPageName = currPage.name;
                                app.activeDocument.recompose();
                                defaultFloatContCt = 0;
                                var boundsForContFrms = tempFigureFrm.geometricBounds;
                                if(config.rotateFloat){
                                    tempFigureFrm.geometricBounds = [tempFigureFrm.geometricBounds[0], tempFigureFrm.geometricBounds[1], config.columnSpanWidth[floatSpnTo][0].width + tempFigureFrm.geometricBounds[0] - 6, tempFigureFrm.geometricBounds[3]];
                                    boundsForContFrms = tempFigureFrm.geometricBounds;
                                    }
                                config["continuedFloatSpan"] = 0;
                                config["previousTableContFrame"] = null;
                                floatContinuedBlock(tempFigureFrm, currPageName, "TBL_CONT_BOTTOM", "jrnlTblCaption", "TBL_CONT_TOP", tableFrameCurr, true, currCitation, hzc, floatSpnTo, currCitBaseline, config.rotateFloat, wdSplitEqually, defaultFloatContCt, currCitBlkHt, boundsForContFrms);
                                }
                            else {
                                if(respectiveFloat[0].xmlAttributes.itemByName("data-stack").isValid){
                                    var placingSeq = respectiveFloat[0].xmlAttributes.itemByName("data-stack").value;
                                    }//end of IF
                                else {
                                    var placingSeq = false;
                                    }//end of ELSE
                                if(respectiveFloat[0].xmlAttributes.itemByName("data-inline").isValid){
                                    var placingInline = respectiveFloat[0].xmlAttributes.itemByName("data-inline").value;
                                    if(respectiveFloat[0].xmlAttributes.itemByName("data-page-num").isValid){
                                        var placingInline = false;
                                        }//end of IF
                                    }//end of IF
                                else {
                                    var placingInline = false;
                                    }//end of ELSE
                                config.placingInline = placingInline;
                                config.placingSequence = placingSeq;
                                config.preferredOnColumn = '';
                                config.preferredOnCurrentPage = '';
                                return floatSpnTo, floatBlockWd, floatBlockHt, floatBlockArea,tempFigureFrmID,config.rotateFloat, wdSplitEqually, config.floatContinued, config.continuedFloatDetails, wrapTop, wrapBottom;
                                }
                            //================================================================================================
                            }//end of IF
                        else if (floatClass == 'jrnlBoxBlock'){
                            config.continuedBox = false;
                            config.continuedBoxDetails = [];
                            config.continuedBoxID = [];
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").isValid){
                                wrapTop = respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").value.replace('pt', '');
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").isValid){
                                wrapBottom = respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").value.replace('pt', '');
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").isValid){
                                wrapLeft = respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").value.replace('pt', '');
                                }
                            if (respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").isValid){
                                wrapRight = respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").value.replace('pt', '');
                                }
                            floatPlacer.events.placingBoxLib(config.currDoc, respectiveFloat, currPage, wrapTop, wrapLeft, wrapBottom, wrapRight, figPageNumber, currCitation);
                            config.rotateFloat = false;//for now assigning the box float may not be continued
                            wdSplitEqually = 0;
                            config.floatContinued = false;//for now assigning the box float may not be continued
                            floatContinued = false;
                            //we have added additional inputs for box floats based on its type and adding the info to the float object 
                            if(respectiveFloat[0].xmlAttributes.itemByName("data-type").isValid){
                                var boxType = respectiveFloat[0].xmlAttributes.itemByName("data-type").value;
                                if(!(config.jrnlBoxBlock[boxType] == undefined)){
                                    if(!config.jrnlBoxBlock[boxType].calcCitationHeight){
                                        config.overrideCitationHeight = 0;
                                        }//end of IF
                                    if(respectiveFloat[0].xmlAttributes.itemByName("data-stack").isValid){
                                        var placingSeq = respectiveFloat[0].xmlAttributes.itemByName("data-stack").value;
                                        }//end of IF
                                    else {
                                        var placingSeq = false;
                                        }//end of ELSE
                                    if(respectiveFloat[0].xmlAttributes.itemByName("data-inline").isValid){
                                        var placingInline = respectiveFloat[0].xmlAttributes.itemByName("data-inline").value;
                                        if(respectiveFloat[0].xmlAttributes.itemByName("data-page-num").isValid){
                                            var placingInline = false;
                                            }//end of IF
                                        }//end of IF
                                    else {
                                        var placingInline = false;
                                        }//end of ELSE
                                    config.placingInline = placingInline;
                                    config.placingSequence = placingSeq;
                                    config.preferredOnColumn = config.jrnlBoxBlock[boxType].preferredOnColumn;
                                    config.preferredOnCurrentPage = config.jrnlBoxBlock[boxType].preferredOnCurrentPage;
                                    }//end of IF
                                else {
                                    if(respectiveFloat[0].xmlAttributes.itemByName("data-stack").isValid){
                                        var placingSeq = respectiveFloat[0].xmlAttributes.itemByName("data-stack").value;
                                        }//end of IF
                                    else {
                                        var placingSeq = false;
                                        }//end of ELSE
                                    config.placingInline = '';
                                    config.placingSequence = placingSeq;
                                    config.preferredOnColumn = '';
                                    config.preferredOnCurrentPage = '';
                                    }//end of ELSE
                                }//end of IF
                            //=============================================================================
                            return floatSpnTo, floatBlockWd, floatBlockHt, floatBlockArea, tempFigureFrmID, config.rotateFloat, wdSplitEqually, floatContinued, config.continuedFloatDetails, wrapTop, wrapBottom;
                            }    
                        }//end of IF
                    }//end of IF (checking whether the float is moved from previous page)
                else {
                        floatSpnTo = config.docFloatIDsArray[currCitID].floatSpanTo;
                        floatBlockWd = config.docFloatIDsArray[currCitID].floatBlockWidth;
                        floatBlockHt = config.docFloatIDsArray[currCitID].floatBlockHeight;
                        floatBlockArea = config.docFloatIDsArray[currCitID].floatBlockArea;
                        tempFigureFrmID = config.docFloatIDsArray[currCitID].frameID;
                        config.rotateFloat = config.docFloatIDsArray[currCitID].floatRotated;
                        wdSplitEqually = config.docFloatIDsArray[currCitID].landscapeAdditionalOffset;
                        wrapTop = config.docFloatIDsArray[currCitID].wrapTop;
                        wrapBottom = config.docFloatIDsArray[currCitID].wrapBottom;
                        config.placingSequence = config.docFloatIDsArray[currCitID].placingSequence;
                        config.placingInline = config.docFloatIDsArray[currCitID].placingInline;
                        config.preferredOnColumn = '';
                        config.preferredOnCurrentPage = '';
                        //config.notPlacedFloatsIDs.unshift(currCitID);
                        return floatSpnTo, floatBlockWd, floatBlockHt, floatBlockArea, tempFigureFrmID, config.rotateFloat, wdSplitEqually, wrapTop, wrapBottom;
                    }//end of ELSE (checking whether the float is moved from previous page)
                },//end of 'calcFloatAreas' function
            placingFloats: function(pageFloatIDsArray, currPage){
                app.activeDocument.layoutWindows[0].zoom(ZoomOptions.fitSpread);
                app.activeWindow.activePage = currPage;
                app.activeWindow.zoomPercentage = 51;
                var floatsIDsLen = config.pageFloatIDsArray.length;
                var placeStyle = config.placeStyle;                
//~                 config.placedFloatsOnPage[0] = {"top":[],"bottom":[]};
//~                 config.placedFloatsOnPage[1] = {"top":[],"bottom":[]};
                /*Checking floats sequence for float placement
                    STACK logics: The final results will be collection of floats and position from top to bottom
                           Logic 1: If the collected floats counts for the page is only 2 then no need to check for sequence, the placement will be either max to min span width of floats or min to max span width of floats inclusive of placing adjacent columns
                           Logic 2: If the span value for the third one be the same as first and the span value for the second differs then the third float and following floats can't be placed the current page should be moved to next page(s)
                           Logic 3: If the above condition pass then check the rest until accending or descending order pass and collect the figure IDs for futher placement, where the condition drops move current figure and rest of the figures to next page(s) 
                    */if (placeStyle == 'Stack1'){
                        if (floatsIDsLen == 1){//only one float available
                            config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatPlaceFrom = 'top';
                            config["floatPlaceFrom"] = ["top"];
                            floatPlacer.events.placingStacks(config.pageFloatIDsArray,config.floatPlaceFrom,currPage);
                            }//end of IF
                        else if (floatsIDsLen == 2){//Logic 1
                            var firstFloatSpan = config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatSpanTo;
                            var secondFloatSpan = config.docFloatIDsArray[config.pageFloatIDsArray[1]].floatSpanTo;
                            if (firstFloatSpan >=secondFloatSpan){//then floats will be placed at the bottom
                                config["floatPlaceFrom"] = ["top"];
                                config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatPlaceFrom = 'top';
                                config.docFloatIDsArray[config.pageFloatIDsArray[1]].floatPlaceFrom = 'top';
                                floatPlacer.events.placingStacks(config.pageFloatIDsArray,config.floatPlaceFrom,currPage);
                                }//end of IF
                            else {
                                
                                config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatPlaceFrom = 'bottom';
                                config.docFloatIDsArray[config.pageFloatIDsArray[1]].floatPlaceFrom = 'bottom';
                                config["floatPlaceFrom"] = ["bottom"];
                                floatPlacer.events.placingStacks(config.pageFloatIDsArray,config.floatPlaceFrom,currPage);
                                }//end of ELSE
                            }//end of ELSE IF
                        else if (floatsIDsLen > 2){//checking both Logic 2 and Logic 3 here
                                for (var fl = 1; fl < floatsIDsLen; fl ++){
                                    var checkArray = config.pageFloatIDsArray.slice(0,fl+1);
                                    if (checkArrayDescending(checkArray)){
                                        if (fl == 1){
                                            config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatPlaceFrom = 'top';//forcely placing the very first float at the top of the page
                                            }//end of IF
                                        config.docFloatIDsArray[config.pageFloatIDsArray[fl]].floatPlaceFrom = 'top';
                                        config["floatPlaceFrom"] = ["top"];
                                        }//end of IF 
                                    else if (checkArrayAscending(checkArray)){
                                        if (fl == 1){
                                            config.docFloatIDsArray[config.pageFloatIDsArray[0]].floatPlaceFrom = 'bottom';//forcely placing the very first float at the top of the page
                                            }//end of IF
                                        config.docFloatIDsArray[config.pageFloatIDsArray[fl]].floatPlaceFrom = 'bottom';
                                        config["floatPlaceFrom"] = ["bottom"];
                                        }//end of ELSE IF 
                                    else {
                                        splitArray(config.pageFloatIDsArray, fl, floatsIDsLen);
                                        fl = floatsIDsLen;
                                        }//end of ELSE
                                    }//end of FOR loop
                                floatPlacer.events.placingStacks(config.pageFloatIDsArray,config.floatPlaceFrom,currPage);
                            }//end of ELSE IF                        
                        }//end of IF (stack)                
                else if (placeStyle == 'Sandwich') {
                    if((config.templateType  == 'LAYOUTX')){
                        floatPlacer.events.placeAsPerUserInputs(currPage);
                        }//end of IF
                    else {
                        floatPlacer.events.placingSandwich(config.pageFloatIDsArray,currPage, placeStyle);
                        }
                    }//end of ELSE IF (sandwich)
                },//end of placingFloats function
            placingStacks: function(pageFloatIDsArray,floatPlaceFrom,currPage){
                var clmLen = config.pageColumns.length;
                var prevClmnWd = 0;
                if (config.currPageStyle == 'VERSO'){
                    var marginForCalc = config.margin.outside;
                    }
                else{
                    var marginForCalc = config.margin.inside;
                    }
                for (var pcd = 0; pcd < clmLen; pcd ++){
                        config.pageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.pageColumns[pcd].gutter, config.margin.top + config.pageColumns[pcd].height, marginForCalc + prevClmnWd + config.pageColumns[pcd].width + config.pageColumns[pcd].gutter];//exculding margin
                        prevClmnWd = config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter;
                    }//end of FOR loop
                pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                var pageFloatIDsArrayLen = config.pageFloatIDsArray.length;
                var floatGroup = new Array; //Add the items to the array.
                var lastPlacedFloadID;
                config["placedFloatsIDs"] = [];
                config.floatsFrmIndexPlacedOnCurrPage = [];
                //Below conditions to be checked
                //1. For each and every float its floatBlock's height and citationBlock's height is verified with the space available on the page
                //2. Locating citaion's position
                //3. Once we decide the placement for first float of the page then we could follow the same placement style for the rest of the floats for the page,
                //4. But may vary based on the span of last float for the page 
                //5. If the floats citation is on the previous page then we could make a decision intially that float could be placed at the top of very first page but may vary based on rest of the figure for the page
                //6. Finally, saving the floats position to the "docFloatIDsArray" object and final another function place the floats 
                var totalHeightAvblOnPage
                var placeFloatAt = '';
                var placeFloatAtClm = '';
                var prevFloatSpanToClm = 0;
                var prevFloatPlacedAt = '';
                var placedFloatsIDsCt = 0;
                var firstFloatAtBottomCt = 0;
                config.forceMovedToBottom = false;
                var currFloatBottomWrap = '';
                for (var flt = 0; flt < pageFloatIDsArrayLen; flt ++){
                    var currFloatID = config.pageFloatIDsArray[flt];
                    var currFloatDetails = config.docFloatIDsArray[currFloatID];
                    var currFloatIDPlaceFrom = currFloatDetails.floatPlaceFrom;
                    var currCitationOnPage = currFloatDetails.onPage;
                    var currFloatHt = currFloatDetails.floatBlockHeight;
                    var currFloatCitOn = currFloatDetails.citationOnColumn + 1;
                    var currFloatSpanToClm = currFloatDetails.floatSpanTo + 1;
                    if (parseInt(currPage.name) == parseInt(currCitationOnPage)){//if the condition is true then  the citaion and float to be placed could be on the same page
                        var currFloatCitHt = currFloatDetails.citationBlockHeight;
                        }//end of IF
                    else {//citation could be on the previous page and that is the case then we are by default setting the 'currFloatCitHt' as 0 
                        var currFloatCitHt = 0;
                        }//end of ELSE
                    //checking the location of citation currently based on the changes made after float(s) finalized to place
                    var currFloatCitBaseline = currFloatDetails.currCitBaseline;
                    if (!(currCitationOnPage == currPage.name)){
                        currFloatCitBaseline = 0;
                        }//end of if
                    //==============================================================
                    var originalTBoundY = pageClmDetails[currFloatCitOn - 1].bounds[0];
                    var columnActHt = pageClmDetails[currFloatCitOn - 1].height;
                    var diffBtwnTopBoundNBline = currFloatCitBaseline - originalTBoundY;
                    var spaceAvblOnClm = columnActHt - diffBtwnTopBoundNBline;
                    var floatCouldCitedAt = '';
                    //identifing placement for first float of the page
                    if (flt == 0){
                        if (diffBtwnTopBoundNBline < columnActHt/2 && (spaceAvblOnClm >= currFloatHt)){//if the result is true then float could be placed at the bottom
                            floatCouldCitedAt = 'top';
                            }//end of IF
                        else {
                            floatCouldCitedAt = 'bottom';
                            }//end of ELSE
                        }//end of IF
                    //==============================================================
                    if (flt == 0 && (spaceAvblOnClm >= currFloatHt || spaceAvblOnClm >= (currFloatHt - config.wrapAroundFloat.bottom))){//if the condition is true then could place the float as resulted above (floatCouldCitedAt)
                        placeFloatAt = floatCouldCitedAt;
                        if (!(currCitationOnPage == parseInt(currPage.name)) && currFloatCitOn > 1){
                            placeFloatAtClm = currFloatCitOn - 1;
                            }//end of IF
                        else {
                            placeFloatAtClm = currFloatCitOn;
                            }//end of ELSE
                        config.floatsOnColumn[placeFloatAtClm] = placeFloatAt;
                        }//end of IF
                    else if (flt == 0 && !(spaceAvblOnClm >= currFloatHt || spaceAvblOnClm >= (currFloatHt - config.wrapAroundFloat.bottom))){//if this condition is true then float should be placed at next column top if valid or terminate placing the float on the current page
                        placeFloatAt = 'top';
                        placeFloatAtClm = currFloatCitOn + 1;
                        config.floatsOnColumn[placeFloatAtClm] = placeFloatAt;
                        }//end of ELSE IF
                    else if (flt > 0 && !(spaceAvblOnClm >= currFloatHt || spaceAvblOnClm >= (currFloatHt - config.wrapAroundFloat.bottom))){
                        placeFloatAtClm = currFloatCitOn + 1;
                        config.floatsOnColumn[placeFloatAtClm] = placeFloatAt;
                        }//end of ELSE IF
                    //==============================================================                    
                    currFloatDetails["locateFloatOnClm"] = placeFloatAtClm;
                    var currPageClmsLen = pageClmDetails.length;
                    //Now calculating the total height required for the float block to be placed
                    var totalHtForFloat = currFloatHt + currFloatCitHt;
                    var tempHtAvblOnClm = 0;//total temp height available on the page
                    var spaceAvblonClm1 = pageClmDetails[0].height;
                    var spaceAvblonClm2 = pageClmDetails[1].height;
                    var floatHtFitOnClm = false;
                    if (placeFloatAtClm == 2){
                        totalHtForFloat = totalHtForFloat + currFloatHt;
                        tempHtAvblOnClm = pageClmDetails[0].height + pageClmDetails[1].height;
                        if ((currFloatHt <= pageClmDetails[0].height) && (currFloatHt <= pageClmDetails[1].height) && currFloatSpanToClm == 2){
                            floatHtFitOnClm = true;
                            }//end of IF
                        else if ((currFloatHt <= pageClmDetails[placeFloatAtClm - 1].height) && currFloatSpanToClm == 1){
                            floatHtFitOnClm = true;
                            }//end of ELSE IF
                        }
                    else if (placeFloatAtClm == 1){
                        tempHtAvblOnClm = pageClmDetails[0].height + pageClmDetails[1].height;
                        if ((currFloatHt <= pageClmDetails[0].height) && (currFloatHt <= pageClmDetails[1].height) && currFloatSpanToClm == 2){
                            floatHtFitOnClm = true;
                            }//end of IF
                        else if ((currFloatHt <= pageClmDetails[placeFloatAtClm - 1].height) && currFloatSpanToClm == 1){
                            floatHtFitOnClm = true;
                            }//end of ELSE IF
                        }//end of ELSE IF
                    if (prevFloatSpanToClm < currFloatSpanToClm && flt > 0){//then the floats are in ascending order
                        placeFloatAt = 'bottom';
                        }//end of IF
                    else if (prevFloatSpanToClm > currFloatSpanToClm && flt > 0){//then the floats are in descending order
                        placeFloatAt = 'top';
                        }//end of ELSE IF
                    if (firstFloatAtBottomCt == 0 && placeFloatAt == 'bottom'){
                        config.firstFloatAtBottom = true;
                        firstFloatAtBottomCt ++;
                        }
                    if (firstFloatAtBottomCt == 1 && config.firstFloatAtBottom == true){
                        currFloatBottomWrap = config.wrapAroundFloat.bottom;
                        firstFloatAtBottomCt ++;
                        }
                    else if (config.firstFloatAtBottom == false){
                        currFloatBottomWrap = config.wrapAroundFloat.bottom;
                        }
                    //=======================Deciding the bouds for floats=======================================
                    if (totalHtForFloat < tempHtAvblOnClm && (placeFloatAtClm <= 2) && floatHtFitOnClm){//checking the space available on the column and also 'placeFloatAtClm' value (for now restricting <= 2)                        
                        /*IMPORTANT: The below condition would work for double column layout only*/
                        if (placeFloatAt == 'top'){
                            if (placeFloatAtClm == 2){
                                if(currFloatSpanToClm > 1){
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 2].bounds[1], pageClmDetails[placeFloatAtClm - 2].bounds[0]];//important                        
                                    pageClmDetails[placeFloatAtClm - 2].bounds[0] = currFloatDetails.floatBlockHeight + pageClmDetails[placeFloatAtClm - 2].bounds[0];
                                    pageClmDetails[placeFloatAtClm - 2].height = pageClmDetails[placeFloatAtClm - 2].height - currFloatDetails.floatBlockHeight;
                                    }//end of IF
                                else {
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 1].bounds[1], pageClmDetails[placeFloatAtClm - 1].bounds[0]];//important                        
                                    }//end of ELSE IF
                                }//end of IF
                            else if (placeFloatAtClm == 1){
                                currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 1].bounds[1], pageClmDetails[placeFloatAtClm - 1].bounds[0]];//important                        
                                }
                            config.placedFloatsIDs[placedFloatsIDsCt] = currFloatID;
                            placedFloatsIDsCt ++;
                            pageClmDetails[placeFloatAtClm - 1].bounds[0] = currFloatDetails.floatBlockHeight + pageClmDetails[placeFloatAtClm - 1].bounds[0];
                            pageClmDetails[placeFloatAtClm - 1].height = pageClmDetails[placeFloatAtClm - 1].height - currFloatDetails.floatBlockHeight;                            
                            config.docFloatIDsArray[currFloatID].floatPlaceFrom = 'top';
                            config.docFloatIDsArray[currFloatID]["placeFloatAtClm"] = placeFloatAtClm;
                            }//end of IF
                        else if (placeFloatAt == 'bottom'){
                            if(placeFloatAtClm == 2){
                                if(currFloatSpanToClm > 1){
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 2].bounds[1], pageClmDetails[placeFloatAtClm - 2].bounds[2] + currFloatBottomWrap - currFloatDetails.floatBlockHeight];
                                    pageClmDetails[placeFloatAtClm - 2].bounds[2] = pageClmDetails[placeFloatAtClm - 2].bounds[2] - currFloatDetails.floatBlockHeight ;
                                    pageClmDetails[placeFloatAtClm - 2].height = pageClmDetails[placeFloatAtClm - 2].height - currFloatDetails.floatBlockHeight;
                                    }//end of IF
                                else {
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 1].bounds[1], pageClmDetails[placeFloatAtClm - 1].bounds[2] + currFloatBottomWrap - currFloatDetails.floatBlockHeight];
                                    }//end of ELSE
                                }
                            else if (placeFloatAtClm == 1){
                                if(currFloatSpanToClm > 1){
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 1].bounds[1], pageClmDetails[placeFloatAtClm].bounds[2] + currFloatBottomWrap - currFloatDetails.floatBlockHeight];
                                    pageClmDetails[placeFloatAtClm].bounds[2] = pageClmDetails[placeFloatAtClm].bounds[2] - currFloatDetails.floatBlockHeight ;
                                    pageClmDetails[placeFloatAtClm].height = pageClmDetails[placeFloatAtClm].height - currFloatDetails.floatBlockHeight;
                                    }//end of IF
                                else {
                                    currFloatDetails["floatBounds"] = [pageClmDetails[placeFloatAtClm - 1].bounds[1], pageClmDetails[placeFloatAtClm - 1].bounds[2] + currFloatBottomWrap - currFloatDetails.floatBlockHeight];
                                    }//end of ELSE
                                }
                            config.placedFloatsIDs[placedFloatsIDsCt] = currFloatID;
                            placedFloatsIDsCt ++;
                            pageClmDetails[placeFloatAtClm - 1].bounds[2] = pageClmDetails[placeFloatAtClm - 1].bounds[2] - currFloatDetails.floatBlockHeight;
                            pageClmDetails[placeFloatAtClm - 1].height = pageClmDetails[placeFloatAtClm - 1].height - currFloatDetails.floatBlockHeight;
                            config.docFloatIDsArray[currFloatID].floatPlaceFrom = 'bottom';
                            config.docFloatIDsArray[currFloatID]["placeFloatAtClm"] = placeFloatAtClm;
                            }//end of ELSE IF
                        //checking floats sequence and resetting the bounds until the previous float here
                        if (flt > 0 && placeFloatAt == 'bottom' && config.forceMovedToBottom == false){
                            var placedFloatsIDsLen = config.placedFloatsIDs.length - 1;
                            resettingFloatsBounds(config.placedFloatsIDs, placedFloatsIDsLen);
                            }//end if IF
                        else if (flt > 0 && placeFloatAt == 'bottom' && config.forceMovedToBottom == true){
                            var placedFloatsIDsLen = config.placedFloatsIDs.length;
                            resettingFloatsBounds(config.placedFloatsIDs, placedFloatsIDsLen);
                            }
                        prevFloatPlacedAt = config.docFloatIDsArray[currFloatID].floatPlaceFrom;
                        prevFloatSpanToClm = currFloatSpanToClm;
                        //function resetting floats bounds
                        function resettingFloatsBounds(placedFloatsIDs, placedFloatsIDsLen){
                            var lastFltID = config.placedFloatsIDs[placedFloatsIDsLen - 1]
                            var lastFlt = config.docFloatIDsArray[lastFltID];
                            for (var ft = placedFloatsIDsLen - 1; ft >= 0; ft --){
                                var currFltID = config.placedFloatsIDs[ft];
                                var currFlt = config.docFloatIDsArray[currFltID];
                                var currFltCitedOnClm = currFlt.citationOnColumn;
                                var currFltSpanTo = currFlt.floatSpanTo;
                                var currFltPlaceFloatAtClm = currFlt.placeFloatAtClm;
                                var penultimateFlt = config.docFloatIDsArray[config.placedFloatsIDs[ft + 1]];
                                if (currFltSpanTo == 0 && prevFloatSpanToClm == currFloatSpanToClm && prevFloatPlacedAt = 'bottom' && placedFloatsIDsLen == 1 && currFltPlaceFloatAtClm == penultimateFlt.placeFloatAtClm){
                                    penultimateFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], currFlt.floatBounds[1] + currFlt.floatBlockHeight -  penultimateFlt.floatBlockHeight];                                        
                                    currFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], penultimateFlt.floatBounds[1] - currFlt.floatBlockHeight];                                        
                                    config.forceMovedToBottom = true;
                                    }//end of IF
                                else if (currFltSpanTo > 0 && config.forceMovedToBottom == false){//if this condition is true then the current float is spanned to two columns
                                    if (penultimateFlt.floatPlaceFrom == 'bottom'){
                                        penultimateFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], currFlt.floatBounds[1] + currFlt.floatBlockHeight -  penultimateFlt.floatBlockHeight];                                        
                                        currFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], penultimateFlt.floatBounds[1] - currFlt.floatBlockHeight];                                        
                                        }//end of IF
                                    else {
                                        pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[2] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                        pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[2] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                        pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                        pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                        currFlt.floatBounds = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2]];
                                        }
                                    config.forceMovedToBottom = true;
                                    }//end of IF
                                else if (currFltSpanTo > 0 && config.forceMovedToBottom == true){//if this condition is true then the current float is spanned to two columns
                                    if (ft == placedFloatsIDsLen - 1){
                                        var penultimateFlt = config.docFloatIDsArray[config.placedFloatsIDs[ft - 1]];
                                        currFlt.floatBounds = [pageClmDetails[0].bounds[1], penultimateFlt.floatBounds[1] + penultimateFlt.floatBlockHeight - currFlt.floatBlockHeight];
                                        }//end of IF
                                    else {
                                        currFlt.floatBounds = [currFlt.floatBounds[0], currFlt.floatBounds[1] - lastFlt.floatBlockHeight];
                                        }
                                    }//end of ELSE IF
                                else if (!(currFltSpanTo > 0) && config.forceMovedToBottom == false && !(currFltID == lastFltID) && currFltPlaceFloatAtClm == lastFlt.placeFloatAtClm){
                                    pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2] = pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2] - currFlt.floatBlockHeight;
                                    pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[0] = pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[0] - currFlt.floatBlockHeight;
                                    currFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2] + config.wrapAroundFloat.bottom];
                                    config.forceMovedToBottom = true;
                                    }//ebd of ELSE IF
                                else if (!(currFltSpanTo > 0) && config.forceMovedToBottom == true){
                                    if (ft == placedFloatsIDsLen - 1 && currFltPlaceFloatAtClm == lastFlt.placeFloatAtClm){
                                        var penultimateFlt = config.docFloatIDsArray[config.placedFloatsIDs[ft - 1]];
                                        currFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], penultimateFlt.floatBounds[1] + penultimateFlt.floatBlockHeight - currFlt.floatBlockHeight];
                                        }//end of IF
                                    else {
                                        if(currFltPlaceFloatAtClm == lastFlt.placeFloatAtClm){
                                            currFlt.floatBounds = [currFlt.floatBounds[0],currFlt.floatBounds[1] - lastFlt.floatBlockHeight];
                                            }
                                        }                                    
                                    }//end of IF
                                else if (currFltSpanTo == 0 && prevFloatPlacedAt = 'top' && placedFloatsIDsLen == 1 && currFltPlaceFloatAtClm == penultimateFlt.placeFloatAtClm){
                                    pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[0] = pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                    pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2] = pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2] + config.wrapAroundFloat.bottom - currFlt.floatBlockHeight;
                                    currFlt.floatBounds = [pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[1], pageClmDetails[currFltPlaceFloatAtClm - 1].bounds[2]];
                                    config.forceMovedToBottom = true;
                                    }//end of IF
                                else {
                                    config.forceMovedToBottom = true;
                                    }//end of ELSE
                                }//end of FOR loop
                            }//end of function 
                        }//end of IF
                    else {
                        splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                        flt = pageFloatIDsArrayLen;                            
                        }//end of ELSE
                    }//end of for
                    //moving floats to the indentified location
                var floatsToBeLocated = config.placedFloatsIDs;
                var floatsToBeLocatedLen = floatsToBeLocated.length;
                for (var ftm = 0; ftm < floatsToBeLocatedLen; ftm ++){
                    var currFloatToBeLocated = config.docFloatIDsArray[floatsToBeLocated[ftm]];
                    config.currDoc.textFrames.itemByID(currFloatToBeLocated.frameID).move(currPage);
                    config.currDoc.textFrames.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1]]);
                    config.floatsPlacedOnPages[config.floatsPlacedOnPages.length] = floatsToBeLocated[ftm];//Placed floats IDs were stored in an separate array
                    config.placedFloatsOnPage[currFloatToBeLocated.locateFloatOnClm - 1][placeFloatAt] = config.placedFloatsOnPage[currFloatToBeLocated.locateFloatOnClm - 1][placeFloatAt].concat(floatsToBeLocated[ftm]);
                    }//end of FOR loop
                config["floatsPlacedOn"] = placeFloatAt;//Changed "currFloatIDPlaceFrom" here to "placeFloatAt"
                },//end of placingStacks function
            placingSandwich: function(pageFloatIDsArray,currPage,placeStyle){
                //kriya user inputs definitions
                var userPlacementIndex = {
                    "TopLeft":['top',0],
                    "TopRight":['top',1],
                    "TopMarginalColumn":['top',0],
                    "TopSingleColumn":['top',0],
                    "TopDoubleColumn":['top',0],
                    "BottomLeft":['bottom',0],
                    "BottomRight":['bottom',1],
                    "BottomDoubleColumn":['bottom',0],
                    "BottomMarginalColumn":['bottom',0],
                    "MarginalTopLeft":['top',0],
                    "MarginalBottomLeft":['bottom',0],
                }                
                //===============================================================
                //checking whether the column has paragraphs spanned
                var currPageNameInt = parseInt(currPage.name);
                if (currPage.name == '1'){
                    var firstFrame = config.currDoc.pages[0].textFrames.itemByName('FIRST_FRAME');
                    }//end of IF
                else if(currPageNameInt %2 ==1){
                    var firstFrame = currPage.textFrames.itemByName('RECTO');
                    }//end of ELSE IF
                else{
                    var firstFrame = currPage.textFrames.itemByName('VERSO');
                    }//end of ELSE
                //checking whether the current text frame still has some continued paragraphs
                config["pagesContinues"] = true;
                if (firstFrame.isValid){
                    if (firstFrame.paragraphs.length > 0){
                        var currFrmLastParaPageName = firstFrame.paragraphs.lastItem().parentTextFrames[0].parentPage.name;
                        var nextParaPageName = firstFrame.paragraphs.lastItem().insertionPoints[-1].paragraphs[0].parentTextFrames[0].parentPage.name;
                        if (currFrmLastParaPageName == nextParaPageName){
                            config.pagesContinues = false;
                            }//end of IF
                        else {
                            config.pagesContinues = true;
                            }//end of ELSE
                        }//end of IF
                    else {
                        config.pagesContinues = true;
                        }//end of ELSE
                    }//end of IF
                else {
                    config.pagesContinues = null;
                    }//end of ESLE
                //===============================================================
                //checking whether the current page is first page of the document
                if(currPage.name == '1'){
                    var currProcessClms = config.openerPageColumns;
                    var currProcessClmsLen = config.openerPageColumnsLen;
                    }//end of IF
                else {
                    var currProcessClms = config.pageColumns;
                    var currProcessClmsLen = config.pageColumnsLen;
                    }
                //=================================================
                //===================================================================
                var topMarginBoundArray = [];
                var clmsLastLineBase = [];
                if (firstFrame.isValid){
                    var firstFrameClCt = firstFrame.textFramePreferences.textColumnCount;//Actual column count for the text frame
                    var firstFrameSpanCol = firstFrame.textColumns;//Column including "Split columns". Note this value includes number of paragraphs split across text frame columns
                    var firstFrameSpanColLen = firstFrameSpanCol.length;
                    var previousBounds = 0;
                    var boundVary = false;
                    for (var spn = 0; spn < firstFrameClCt; spn ++){
                        if (firstFrameClCt < firstFrameSpanColLen && currPage.name == '1'){//top bound will change only if the frame col count and frame span col count vary
                            var actualSpan = firstFrameSpanColLen - firstFrameClCt + spn;
                            var firstFrameSpanColFirstActClm = firstFrameSpanCol[actualSpan];//the actual first column
                            var firstFrameSpanColFirstActClmFirstLine = firstFrameSpanColFirstActClm.lines.firstItem();
                            var topBound = firstFrameSpanColFirstActClmFirstLine.characters[0].baseline - firstFrameSpanColFirstActClmFirstLine.characters[0].ascent;
                            topMarginBoundArray.push(topBound - firstFrame.geometricBounds[0]);  
                            if (firstFrameSpanColFirstActClm.lines.lastItem().isValid){
                                clmsLastLineBase.push(firstFrameSpanColFirstActClm.lines.lastItem().baseline)
                                }//end of IF
                            else {
                                clmsLastLineBase.push(0);
                                }//end of ELSE
                            boundVary = true;
                            }//end of IF
                        else {
                            topMarginBoundArray.push(0);
                            if (firstFrameSpanCol[spn].isValid){
                                if (firstFrameSpanCol[spn].lines.lastItem().isValid){
                                    clmsLastLineBase.push(firstFrameSpanCol[spn].lines.lastItem().baseline);
                                    }//end of IF
                                else {
                                    clmsLastLineBase.push(0);
                                    }//end of ELSE
                                }
                            else {
                                clmsLastLineBase.push(0);
                                }//end of ELSE
                            }//end of ELSE
                        }//end of FOR loop
                    }//end of IF
                else {//worst case floats would be placed on empty pages if enough texts/contents
                    for (var setTBound = 0; setTBound < currProcessClmsLen; setTBound ++){
                        topMarginBoundArray.push(0);
                        clmsLastLineBase.push(0);
                        }//end of FOR loop                    
                    }//end of ELSE
                //if the page has imaginary column then the top bound and columns last line base would be equal to the current first columns values, so add the value using Array.unshift method
                if(currProcessClms[0].imaginary == true){
                    var currFirstClmsTopMarginBound = topMarginBoundArray[0];
                    var currFirstClmsLastLineBase = clmsLastLineBase[0];
                    topMarginBoundArray.unshift(currFirstClmsTopMarginBound);
                    clmsLastLineBase.unshift(currFirstClmsLastLineBase);
                    }
                //=============================================================================
                 //some times the top bound for spanned column would not have same value so getting the highest bound value and reassigning the value to the  topMarginBoundArray
                var tempTopMarginBoundArray = floatPlacer.shallowCopy(topMarginBoundArray);
                config["currPageFrameTopMarginBoundArray"] = floatPlacer.shallowCopy(topMarginBoundArray);
                tempTopMarginBoundArray.sort(sortArrayAscending);
                var maxTopBound = tempTopMarginBoundArray[tempTopMarginBoundArray.length - 1];
                var topMarginBoundArrayLen = topMarginBoundArray.length;
                for (var tbnd = 0; tbnd < topMarginBoundArrayLen; tbnd ++){
                    var currTopBound = topMarginBoundArray[tbnd];
                    if (currTopBound != 0){
                        topMarginBoundArray[tbnd] = maxTopBound;
                        }
                    }//end of FOR loop
                var clmLen = currProcessClms.length;
                var prevClmnWd = 0;
                if (config.currPageStyle == 'VERSO'){
                    var marginForCalc = config.margin.outside;
                    }
                else{
                    var marginForCalc = config.margin.inside;
                    }
                config["minEmptySpaceAvblOnPage"] = 0;
                for (var pcd = 0; pcd < clmLen; pcd ++){
                    currProcessClms[pcd]["bounds"] = [config.margin.top + topMarginBoundArray[pcd], marginForCalc + prevClmnWd + currProcessClms[pcd].gutter, config.margin.top + currProcessClms[pcd].height, marginForCalc + prevClmnWd + currProcessClms[pcd].width + currProcessClms[pcd].gutter];//exculding margin
                    prevClmnWd = currProcessClms[pcd].width + prevClmnWd + currProcessClms[pcd].gutter;
                    config.minEmptySpaceAvblOnPage = config.minEmptySpaceAvblOnPage + (currProcessClms[pcd].bounds[2] - clmsLastLineBase[pcd]);
                    config['clmLastBase'+pcd] = clmsLastLineBase[pcd];
                    }//end of FOR loop    
                var pageFloatIDsArrayLen = pageFloatIDsArray.length;

                //checking whether all floats for placements meets column width of the current page, that is if the float's spanTo value is 0, then its actual width should be first column with of the current page and so on. If the width does not match the changing the column width
                //IMPORTANT//
                for (var cw = 0; cw < pageFloatIDsArrayLen; cw ++){
                    var currChkFlt = config.docFloatIDsArray[pageFloatIDsArray[cw]];
                    var currChkFltSpanTo = currChkFlt.floatSpanTo;
                    var currChkFltClassName =  currChkFlt.currFloatClassName;
                    var currChkFltWd = currChkFlt.floatBlockWidth;
                    if (currPage.name == '1'){                        
                        var pageClmWdForSpan = config.openerPageColumnsSpanWidth[currChkFltSpanTo][0].width;
                        }
                    else {
                        if (!(config.columnDetails[0].imaginary == undefined) && currChkFltSpanTo == 0){
                            if (config.columnDetails[1].width < currChkFltWd){
                                var pageClmWdForSpan = config.columnDetails[1].width;
                                }//end of IF
                            else {
                                currChkFltSpanTo = currChkFltSpanTo + 1;
                                var pageClmWdForSpan = config.columnSpanWidth[currChkFltSpanTo][0].width;
                                }
                            }
                        else {
                            var pageClmWdForSpan = config.columnSpanWidth[currChkFltSpanTo][0].width;
                            }
                        }
                    var currBlockItem = config.currDoc.pageItems.itemByID(currChkFlt.frameID);
                    var currBounds = config.currDoc.pageItems.itemByID(currChkFlt.frameID).geometricBounds;
                    if(currChkFltClassName != 'jrnlTblBlock'){
                        resizeGroup(currBlockItem,currBounds);
                        }
                    function resizeGroup(currBlockItem,currBounds){
                        //resizing the float to current page column sizes
                        if (!(Math.round(currChkFltWd) == Math.round(pageClmWdForSpan)) || (currChkFltWd >= (pageClmWdForSpan - 1) && (currChkFltWd < pageClmWdForSpan)) && !(currChkFlt.floatRotated)){
                            //for box the height would head box height may vary if the width got disturbed
                            var headerFrame, otherFrame, headerFrameBoundsBefore;
                            var groupFrames = false;
                            if (currBlockItem.pageItems.length == 2){
                                if(currBlockItem.pageItems[0].label == 'TEXT_CONTAINER_HEAD'){
                                    headerFrame = currBlockItem.pageItems[0];
                                    otherFrame = currBlockItem.pageItems[1];
                                    var headerFrameBoundsBefore = headerFrame.geometricBounds;
                                    groupFrames = true;
                                    }
                                else if (currBlockItem.pageItems[1].label == 'TEXT_CONTAINER_HEAD'){
                                    headerFrame = currBlockItem.pageItems[1];
                                    otherFrame = currBlockItem.pageItems[0];
                                    var headerFrameBoundsBefore = headerFrame.geometricBounds;
                                    groupFrames = true;
                                    }
                                }
                            //===========================================================
                            config.currDoc.pageItems.itemByID(currChkFlt.frameID).geometricBounds = [currBounds[0],currBounds[1],currBounds[2],currBounds[1] + pageClmWdForSpan];
                            if (groupFrames){
                                var headerFrameBoundsAfter = headerFrame.geometricBounds;
                                if (headerFrameBoundsAfter[2] > headerFrameBoundsBefore[2]){
                                    var htDiff = headerFrameBoundsAfter[2] - headerFrameBoundsBefore[2];
                                    otherFrame.geometricBounds = [otherFrame.geometricBounds[0] + htDiff, otherFrame.geometricBounds[1], otherFrame.geometricBounds[2] + htDiff, otherFrame.geometricBounds[3]]
                                    }//end of IF
                                else if (headerFrameBoundsAfter[2] < headerFrameBoundsBefore[2]){
                                    var htDiff = headerFrameBoundsBefore[2] - headerFrameBoundsAfter[2];
                                    otherFrame.geometricBounds = [otherFrame.geometricBounds[0] - htDiff, otherFrame.geometricBounds[1], otherFrame.geometricBounds[2] - htDiff, otherFrame.geometricBounds[3]]
                                    }                            
                                }                        
                            }
                        }
                        var currBlockItemHt = currBlockItem.geometricBounds[2] - currBlockItem.geometricBounds[0];
                        if (currPage.name != 1 && currBlockItemHt > config.columnDetails[0].height && currChkFltSpanTo == 0 && (currChkFltClassName != 'jrnlTblBlock')){
                            pageClmWdForSpan = config.columnSpanWidth[currChkFltSpanTo + 1][0].width
                            resizeGroup(currBlockItem,currBounds,pageClmWdForSpan);
                            config.docFloatIDsArray[pageFloatIDsArray[cw]].floatSpanTo = currChkFltSpanTo + 1;
                            }
                        var currPageItemObject = currBlockItem;
//~                         currBlockItem.select();
                        if(currPageItemObject == '[object TextFrame]'){
                            currBlockItem.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
                            currBlockItem.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;                                       
                            }//end of IF
                        config.currDoc.recompose();
                        var newBounds = config.currDoc.pageItems.itemByID(currChkFlt.frameID).geometricBounds;
                        config.docFloatIDsArray[pageFloatIDsArray[cw]].floatBlockWidth = newBounds[3] - newBounds[1];
                        config.docFloatIDsArray[pageFloatIDsArray[cw]].floatBlockHeight = newBounds[2] - newBounds[0] + config.currDoc.pageItems.itemByID(currChkFlt.frameID).textWrapPreferences.textWrapOffset[2];
                    }//end of FOR loop                
                //===========================================================================
                var tempCitBlkHt = 0;
                var placeFloatAt = '';
                var placeFloatAtClm = '';
                var totalHtForFloat = 0;
                var tempCitOnColumn = 0;
                //=============================================================================================
                config["fillFloatPositionFlagArrayPageClmDetails"] = '';
                if (currPage.name == '1'){
                    pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                    config.fillFloatPositionFlagArrayPageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                    }//end of IF
                else {
                    pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                    config.fillFloatPositionFlagArrayPageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                    }//end of ELSE
                //resetting height of the 
                var fillFloatPositionFlagArrayPageClmDetailsLen = config.fillFloatPositionFlagArrayPageClmDetails.length;
                for (var resetHt = 0; resetHt < fillFloatPositionFlagArrayPageClmDetailsLen; resetHt++){
                    config.fillFloatPositionFlagArrayPageClmDetails[resetHt].height = pageClmDetails[resetHt].height - topMarginBoundArray[resetHt];
                    }//end of FOR loop
                //==============================================================================================
                var totalClmsLen = pageClmDetails.length;
                var clmOriginalHt = pageClmDetails[0].height;
                //duplicating column's height as separate objects and definning other objects
                var totalHtAvbl = 0;
                config["floatPositionFlagArray"] = new Array();
                for (var imcObj = 0; imcObj < totalClmsLen; imcObj++){
                    config['htAvblOnClm'+imcObj] = pageClmDetails[imcObj].height - topMarginBoundArray[imcObj];
                    totalHtAvbl = totalHtAvbl + pageClmDetails[imcObj].height;
                    config.floatPositionFlagArray.push({"top":'OPEN',"bottom":'OPEN'});
                    }//end of FOR loop
                var previousFloatOn = 0;
                var previousFloatAt = 'top';
               //=======================================================================================================================
                var flt = 0;
               calculatingFloatsPlacementIndex(flt, pageClmDetails, pageFloatIDsArrayLen);
               function calculatingFloatsPlacementIndex(flt, pageClmDetails, pageFloatIDsArrayLen){
                    for (flt; flt < pageFloatIDsArrayLen; flt ++){
                        var currFloatID = config.pageFloatIDsArray[flt];
                        var currFloatDetails = config.docFloatIDsArray[currFloatID];
                        var currFloatPreferredOnPage = currFloatDetails.preferredOnCurrentPage;
                        var currCitationOnPage = currFloatDetails.onPage;
                        var currFloatDetailsPlacingSequence = currFloatDetails.placingSequence;
                        var currFloatHt = currFloatDetails.floatBlockHeight;
                        if (currFloatHt > pageClmDetails[0].height){
                            var redBtmCurrFloatHt = currFloatHt - currFloatDetails.wrapBottom;
                            if (currPage.name == 1 && redBtmCurrFloatHt <= pageClmDetails[0].height){
                                currFloatHt = pageClmDetails[0].height;
                                }
                            else {
                                if (!(currPage.name == 1)){
                                    currFloatHt = pageClmDetails[0].height;
                                    }
                                }
                            }
                        //================================================================
                        if (currFloatPreferredOnPage){//if true then check if column is specified
                            var currFloatDetailsPreferredOnClm = currFloatDetails.preferredOnColumn;
                            if (currFloatDetailsPreferredOnClm != '' && currCitationOnPage == currPage.name){//if the result is not null and citation page and the current page is same, then resetting previous colmn temp height as zero to move
                                for (var ht = currFloatDetailsPreferredOnClm - 1; ht >= 0; ht --){
                                    totalHtAvbl = totalHtAvbl - config['htAvblOnClm'+(ht)];
                                    config['htAvblOnClm'+(ht)] = 0;
                                    pageClmDetails[ht].height = 0;
                                    firstFltSpanTo = currFloatDetailsPreferredOnClm;//forcing to place float on next clm
                                    config.floatPositionFlagArray[ht].top = 'BLOCKED';
                                    config.floatPositionFlagArray[ht].bottom = 'BLOCKED';
                                    }//end of FOR loop
                                }//end of IF
                            }//end of IF
                        //===============================================================
                        var currCitationOnPage = currFloatDetails.onPage;
                        var currFloatCitOn = currFloatDetails.citationOnColumn;
                        var currFloatSpanToClm = currFloatDetails.floatSpanTo;
                        if (parseInt(currPage.name) == parseInt(currCitationOnPage)){//if the condition is true then  the citaion and float to be placed could be on the same page
                            var currFloatCitHt = currFloatDetails.citationBlockHeight;
                            }//end of IF
                        else {//citation could be on the previous page and that is the case then we are by default setting the 'currFloatCitHt' as 0 
                            var currFloatCitHt = 0;
                            currFloatCitOn = 0;
                            }//end of ELSE
                        //checking the location of citation currently based on the changes made after float(s) finalized to place
                        var currFloatCitBaseline = currFloatDetails.currCitBaseline;
                        if (!(currCitationOnPage == currPage.name)){
                            currFloatCitBaseline = 0;
                            }//end of if
                        if (currPage.name == '1'){
                            config.floatPositionFlagArray[0].top = 'BLOCKED';
                            //for now checking whether 'jrnlFNTxtBlock' div is available and then blocing first clm bottom placement 
                            if (config.currDocDOM.evaluateXPathExpression("//div[@class='jrnlFNTxtBlock']").length > 0){
                                config.floatPositionFlagArray[0].bottom = 'BLOCKED';
                                }//end of IF
                            }//end of IF
                        //==============================================================
                        //Now calculating where the floats citation will be moved based on the float's citation block height
                        totalHtForFloatForNoSpan = parseInt(currFloatHt) + parseInt(currFloatCitHt);
                        totalHtForFloatForSpan = 0;
                        totalHtRequiredForFlt = currFloatHt + currFloatCitHt;//the total height required on the page to locate the float
                        totalHtRequiredForFltAfterBtmWrapExclude = totalHtRequiredForFlt;//initailly assigning the same float ht value
                        if (currFloatSpanToClm > 0){//if the float span to more than a column then totalHtRequiredForFlt will vary
                            totalHtRequiredForFlt = currFloatCitHt + (currFloatHt*(currFloatSpanToClm+1));
                            totalHtRequiredForFltAfterBtmWrapExclude = totalHtRequiredForFlt;
                            }//end of IF
                        if (flt == (pageFloatIDsArrayLen - 1) && (pageFloatIDsArrayLen > 1)){//if the current float is the last float on page
                            totalHtRequiredForFltAfterBtmWrapExclude = totalHtRequiredForFlt - currFloatDetails.wrapBottom;
                            }//end of IF
                        placeFloatAt = '';
                        placeFloatAtClm = '';
                        var pageClmDetailsLen = pageClmDetails.length;
                        //======================Identifying to which clm the current float belongs to (possibility) and the position of the float top/bottom========================================
                        //when reducing the float block height if the float has span then multiply (span times - 1) with height available on current and next columns
                        var totalHtOfFloat = currFloatHt * (currFloatSpanToClm+1);
                        config.docFloatIDsArray[currFloatID]["otherObjectDetails"] = new Array();
                        for(var bsp = 0; bsp < pageClmDetailsLen; bsp ++){
                            //calculating the total height available on the column
                            var totalHtAvlOnClms = 0;
                            var clmHtDetails = [];
                            for (var totHtItt = 0; totHtItt < pageClmDetailsLen; totHtItt ++){
                                totalHtAvlOnClms = totalHtAvlOnClms + config['htAvblOnClm' + (totHtItt)];
                                clmHtDetails.push(config['htAvblOnClm'+totHtItt]);
                                }//end of FOR loop
                            if (bsp == 0){
                                config.docFloatIDsArray[currFloatID].otherObjectDetails["columnHtBeforeDetails"] = clmHtDetails; 
                                }
                            //=======================================
                            if (Math.round(totalHtRequiredForFlt) <= Math.round(totalHtAvlOnClms) || Math.round(totalHtRequiredForFltAfterBtmWrapExclude) <= Math.round(totalHtAvlOnClms)){
                                if (parseFloat(currFloatCitHt) > parseFloat(config['htAvblOnClm' + bsp])){
                                    currFloatCitHt = currFloatCitHt - config['htAvblOnClm' + bsp];
                                    totalHtRequiredForFlt = totalHtRequiredForFlt - config['htAvblOnClm' + bsp];
                                    config['htAvblOnClm' + bsp] = 0;
                                    if (currFloatCitHt > 0 && bsp == pageClmDetailsLen - 1){
                                        splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                                        flt = pageFloatIDsArrayLen;
                                        break;
                                        }
                                    }//end of IF                       
                                else if (config['htAvblOnClm' + bsp] == 0){//no activity done for now, forcing to check next clm
                                    }//end of ELSE
                                else {
                                    config['htAvblOnClm' + bsp] = config['htAvblOnClm' + bsp] - currFloatCitHt;
                                    totalHtRequiredForFlt = totalHtRequiredForFlt - currFloatCitHt;
                                    //============================================================================
                                    //checking whether the float could be placed on the same column 'bsp' or on the next column
                                    if (parseFloat(config['htAvblOnClm' + bsp]) >= parseFloat(currFloatHt)){
                                        placeFloatAtClm = bsp;
                                        if (parseFloat(clmOriginalHt)/2 >= currFloatCitHt){
                                            placeFloatAt = 'top';
                                            }//end of IF
                                        else {
                                            placeFloatAt = 'bottom';
                                            }//end of ELSE
                                        }//end of IF
                                    else if ((parseFloat(config['htAvblOnClm' + bsp]) <= parseFloat(currFloatHt)) && ((bsp + 1) < pageClmDetailsLen)){//checking whether the float could be placed on next column
                                        //checking still whether the float could be placed by reducing the bottom wrap
                                        if (parseFloat(config['htAvblOnClm' + bsp]) >= parseFloat(currFloatHt) - currFloatDetails.wrapBottom){
                                            placeFloatAtClm = bsp;
                                            if (parseFloat(clmOriginalHt)/2 >= currFloatCitHt){
                                                placeFloatAt = 'top';
                                                }//end of IF
                                            else {
                                                placeFloatAt = 'bottom';
                                                }//end of ELSE                                            
                                            }
                                        else if ((parseFloat(config['htAvblOnClm' + (bsp + 1)]) >= parseFloat(currFloatHt))){
                                            placeFloatAtClm = bsp + 1;
                                            placeFloatAt = 'top';
                                            if (currFloatCitHt != 0){
                                                config['htAvblOnClm' + bsp] = 0;                                            
                                                }
                                            }
                                        else if (((bsp + 2) < pageClmDetailsLen)){//checking whether next next allows for placement
                                            if((parseFloat(config['htAvblOnClm' + (bsp + 2)]) >= parseFloat(currFloatHt))){
                                                placeFloatAtClm = bsp + 2;
                                                placeFloatAt = 'top';
                                                if (currFloatCitHt != 0){
                                                    config['htAvblOnClm' + bsp] = 0;                                            
                                                    config['htAvblOnClm' + (bsp + 1)] = 0;                                            
                                                    }
                                                }//end of IF
                                            else {
                                                splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                                                flt = pageFloatIDsArrayLen;
                                                break;
                                                }
                                            }//end if ELSE IF 
                                        else {
                                            splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                                            flt = pageFloatIDsArrayLen;
                                            break;
                                            }
                                        }//end of ELSE IF
                                    else {//else there is no possibility to place the figure
                                        //before breaking the loop need to check whether loop could be done in the reverse
                                        splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                                        flt = pageFloatIDsArrayLen;
                                        break;
                                        }
                                    //=============================================================================
                                    if ((currFloatSpanToClm > 0) && ((bsp + currFloatSpanToClm) < pageClmDetailsLen)){//if this is true the float citation is on the current column but impossible to place the float on the column
                                        //distributing the float height to rest of the columns
                                        for (nclm = bsp; nclm < bsp + currFloatSpanToClm + 1; nclm ++){
                                            config['htAvblOnClm' + nclm] = config['htAvblOnClm' + nclm] - currFloatHt;
                                            }//end of FOR loop
                                        break;
                                        //===================================================================
                                        }//end of IF
                                    else if ((config['htAvblOnClm' + bsp] > currFloatHt) && (currFloatSpanToClm == 0)){//the float could be placed on the same column
                                        //then checking the position of the float
                                        config['htAvblOnClm' + bsp] = config['htAvblOnClm' + bsp] - currFloatHt;
                                        break;
                                        }//end of IF
                                    else if (!(currCitationOnPage == currPage.name)){
                                        config['htAvblOnClm' + bsp] = config['htAvblOnClm' + bsp] - currFloatHt;
                                        break;
                                        }//end of ELSE IF
//~                                     else if ((bsp + 1) < pageFloatIDsArrayLen){
                                    else if (placeFloatAtClm == (bsp + 2)){
                                        config['htAvblOnClm' + (bsp + 2)] = config['htAvblOnClm' + (bsp + 2)] - currFloatHt;
                                        break;
                                        }//end of ELSE IF
                                    else if ((bsp + 1) < pageClmDetailsLen){
                                        config['htAvblOnClm' + (bsp + 1)] = config['htAvblOnClm' + (bsp + 1)] - currFloatHt;
                                        break;
                                        }//end of ELSE IF
                                    else {
                                        config['htAvblOnClm' + bsp] = config['htAvblOnClm' + bsp] - currFloatHt;
                                        break;
                                        }//end of ELSE
                                    }//end of ELSE
                                }//end of IF
                            else {
                                splitArray(config.pageFloatIDsArray, flt, pageFloatIDsArrayLen);
                                flt = pageFloatIDsArrayLen;
                                break;
                                }
                            }//end of FOR loop
                        //checking whether the float has position for placement
                        var currFloatXML = config.currDocDOM.evaluateXPathExpression("//div[@id='BLK_"+currFloatID+"']");
                        config["forceUseUserInput"] = false;
                        var userInputPlaceFloatAt;
                        var userInputPlaceFloatAtClm;
                        if (config.currDocDOM.evaluateXPathExpression("//div[@id='BLK_"+currFloatID+"']").length > 0){
                            if (currFloatXML[0].xmlAttributes.itemByName("data-float-placement").isValid){
                                var currFloatXMLPlaceAt = currFloatXML[0].xmlAttributes.itemByName("data-float-placement").value;
                                if (!(currFloatXMLPlaceAt == 'SingleColumn' || currFloatXMLPlaceAt == 'DoubleColumn')){//excluding user inputs with the value 'SingleColumn' and 'DoubleColumn' since it doesn't related to any specifc placement
                                    userInputPlaceFloatAt = userPlacementIndex[currFloatXMLPlaceAt][0];
                                    userInputPlaceFloatAtClm = userPlacementIndex[currFloatXMLPlaceAt][1];
                                    config.forceUseUserInput = true;
                                    }
                                }//end of IF
                            }//end of IF
                        debuggerMSG("On page num " +currPage.name +", "+ currFloatID +", "+ placeFloatAt +", "+ placeFloatAtClm +", "+ flt);
                        if (placeFloatAt != ''){
                            if (config.forceUseUserInput){
                                config.docFloatIDsArray[currFloatID].floatPlaceFrom = userInputPlaceFloatAt;
                                config.docFloatIDsArray[currFloatID]["placeFloatAtClmIndex"] = userInputPlaceFloatAtClm;
                                }
                            else {
                                config.docFloatIDsArray[currFloatID].floatPlaceFrom = placeFloatAt;
                                config.docFloatIDsArray[currFloatID]["placeFloatAtClmIndex"] = placeFloatAtClm;
                                }
                            //storing details of object config.htAvblOnClm in the float object
                            var clmHtDetails = [];
                            var currTotalHtAvbl = totalHtAvbl;
                            for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                                clmHtDetails.push(config['htAvblOnClm'+recdet]);
                                }//end of FOR loop
                            config.docFloatIDsArray[currFloatID].otherObjectDetails["columnHtAfterDetails"] = clmHtDetails; 
                            }//end of IF
                        //=====================================================================================================                    
                        }//end of FOR loop
                    }//end of function 'calculatingFloatsPlacementIndex'
                /*Then if the actual style is STACK, the below three logics are using to place floats based on the sequence of floats
                        1. ASCENDING (or EQUAL) sequence (default placement will be from bottom)
                            i. If the span length of the last float is equal to the total number of columns on the page and if the total heights of the floats is lesser or equal to actual height of the column, then placing the floats from the bottom of very first column
                            ii. If the span length of the last float is not equal to the total number of columns on the page, 
                                a. Then first check where the citation of first float appears and also the span of floats would fit (also need to check whether the height allows) from there.
                                b. Other case would be the float may not fit from the current column and then reset the column index where it fits
                                c. Keep doing the same steps, if the height does not allows try whether the float would fit on next columns (considering span count) and check whether the previous set of floats can be reshifted to its previous coumn.
                        2. DESCENDING sequence (default placement will be from top)
                            i. Replicating the same steps doing for ASCENDING but the default placement would be top
                        3. If the values are in mixed order then we are breaking the sequence until ASCENDING or DESCENDING order satisfies (we may need to extend this condition if need later on)  
                    */
                /*Or if the actual style is SANDWICH, 
                        1. Add the span values of each floats, if that exceeds the twice the column length then terminate there and push the floats to next page
                        2. If all stacks are in equal span with then,
                            a. If the span length is greater than Math.floor() of total number only two floats could be placed on the page, but have to locate from where the floats should be spanned on the page 
                            b.  
                    *///config.placeStyle = 'Stack'//this line has been hardcoded for testing purpose
                if (config.placeStyle == 'Stack'){
                    //===============checking the floats sequence - starts================
                    var checkFloatsSequence = config.pageFloatIDsArray;
                    var checkFloatsSequenceLen = checkFloatsSequence.length;
                    var flagSequence = '';//expect result should be any one of the following "equal" or "increment" or "decrement"
                    var sequenceBreakAt = 0;
                    if (checkFloatsSequenceLen > 0){
                        var firstFltSpanTo = (config.docFloatIDsArray[checkFloatsSequence[0]].floatSpanTo) + 1;
                        }//end of IF
                    var prevFltSpanTo = firstFltSpanTo;
                    var notEqual = false;
                    var incrementStat = true;
                    var decrementStat = true;
                    var incrementBreakAt = 0;
                    var decrementBreakAt = 0;
                    for (var cfs = 0; cfs < checkFloatsSequenceLen; cfs ++){
                        var currFltToChkID = checkFloatsSequence[cfs];
                        var currFltToChk = config.docFloatIDsArray[currFltToChkID];
                        var currFltToChkPlaceFloatAt = currFltToChk.placeFloatAtClmIndex;
                        var currFltToChkSpanTo = (currFltToChk.floatSpanTo) + 1;
                        if (firstFltSpanTo == currFltToChkSpanTo && currFltToChkSpanTo == prevFltSpanTo && prevFltSpanTo == firstFltSpanTo && !(notEqual)){
                            if (cfs == checkFloatsSequenceLen - 1){
                                flagSequence = 'equal';
                                }//end of IF
                            }//end of IF
                        else if (currFltToChkSpanTo >= prevFltSpanTo){
                            notEqual = true;
                            if (currFltToChkSpanTo > firstFltSpanTo && (incrementStat)){
                                incrementStat = true;
                                flagSequence = 'increment';
                                incrementBreakAt = cfs;
                                }//end of IF
                            else {//then the float span sequence starts decreasing, so terminating the check and rest of the floats will be moved for next page(s)
                                incrementStat = false;
                                splitArray(config.pageFloatIDsArray, cfs, pageFloatIDsArrayLen);
                                break;
                                }//end of ELSE
                            }//end of ELSE IF
                        else if (currFltToChkSpanTo <= prevFltSpanTo){
                            notEqual = true;
                            if (currFltToChkSpanTo < firstFltSpanTo && decrementStat){
                                decrementStat = true;
                                flagSequence = 'decrement';
                                decrementBreakAt = cfs;
                                }//end of IF
                            else {
                                decrementStat = false;
                                splitArray(config.pageFloatIDsArray, cfs, pageFloatIDsArrayLen);
                                break;
                                }//end of ELSE
                            }//end of ESLE IF
                        prevFltSpanTo = currFltToChkSpanTo;
                        }//end of FOR loop
                    //===============checking the floats sequence - ends================
                    //==================================================================================
                    var currFloatsForCurrPage = config.pageFloatIDsArray;
                    var currFloatsForCurrPageLen = currFloatsForCurrPage.length;
                    var pageClmDetailsLen = pageClmDetails.length;
                    for (var cflt = 0; cflt < currFloatsForCurrPageLen; cflt ++){
                        var currFloatID = currFloatsForCurrPage[cflt];
                        var currFloat = config.docFloatIDsArray[currFloatID];
                        var clmIndex = currFloat.placeFloatAtClmIndex;
                        var spanValue = currFloat.floatSpanTo;
                        var currFloatHt = currFloat.floatBlockHeight;
                        var currFloatCitBaseline = currFloat.currCitBaseline;
                        var nextAvblClms = pageClmDetailsLen -1 - clmIndex;
                        var actualFloatIndex = '';
                        var floatPositionAt = '';
                        if (flagSequence == 'increment'){
                            floatPositionAt = 'bottom';
                            }//end of IF
                        else {
                            floatPositionAt = 'top';
                            }//end of ELSE
                        //============storing details like config.floatPositionFlagArray and config.placedFloatsOnPage on current float's object=================
                        var floatPositionDetailsTopBefore = [];
                        var floatPositionDetailsBottomBefore = [];
                        var placedFloatsOnClmTopBefore = [];
                        var placedFloatsOnClmBottomBefore = [];
                        for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                            floatPositionDetailsTopBefore.push(config.floatPositionFlagArray[recdet].top);
                            floatPositionDetailsBottomBefore.push(config.floatPositionFlagArray[recdet].bottom);
                            placedFloatsOnClmTopBefore.push(config.placedFloatsOnPage[recdet].top);
                            placedFloatsOnClmBottomBefore.push(config.placedFloatsOnPage[recdet].bottom);
                            }//end of FOR loop
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtTopBefore"] = floatPositionDetailsTopBefore;                                   
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtBottomBefore"] = floatPositionDetailsBottomBefore;                                   
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnTopBefore"] = placedFloatsOnClmTopBefore;
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnBottomBefore"] = placedFloatsOnClmBottomBefore;
                        //==============================================================================================================
                        if(spanValue <= nextAvblClms){
                            var floatSpanToClms = spanValue+clmIndex;//the actual number of columns to which float will span to
                            for(var chkHt = floatSpanToClms; chkHt >= clmIndex; chkHt --){
                                //now checking if the 'floatPositionAt' value is 'top', then top bounds of the column should be equal (only the columns for which the float spans)
                                //1. If the float placement at top and span length is greater than 1
                                //2. then the top bound of the clms to which it spans shold be equal
                                //3. If true then could try for placement at the top, if not move the placement to next possible location
                                var topBoundIsEqual = true;
                                if (spanValue > 0 && floatPositionAt == 'top'){
                                    var clmToBeChecked = spanValue + clmIndex;
                                    var prevClmTopBound = currProcessClms[clmIndex].bounds[0];
                                    var ittretClmIndex = clmIndex;
                                    for (ittretClmIndex; ittretClmIndex <= clmToBeChecked; ittretClmIndex ++){
                                        var currClmTopBound = currProcessClms[ittretClmIndex].bounds[0];
                                        if (currClmTopBound != prevClmTopBound){
                                            topBoundIsEqual = false;
                                            floatPositionAt = 'bottom';
                                            break;
                                            }//end of IF
                                        prevClmTopBound = currProcessClms[ittretClmIndex].bounds[0];
                                        }//end of FOR loop
                                    }//end of IF
                                //==============================================================================================================
                                if((parseInt(currFloatHt*100)/100) <= config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height && !(config.floatPositionFlagArray[clmIndex][floatPositionAt] == 'SPANNED')){
                                    config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height = config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height - currFloatHt;
                                    config.floatPositionFlagArray[chkHt][floatPositionAt] = 'SPANNED';
                                    if (config.floatPositionFlagArray[clmIndex][floatPositionAt] == 'BLOCKED'){//if the position is already blocked then there is no posibility to place float at that column
                                        //then there would be a possibility that the float could be placed at the same column's opp side, so checking the availability of the opposite column
                                        if ((floatPositionAt == 'top') && (config.floatPositionFlagArray[clmIndex].bottom == 'OPEN')){//if this condition is true then placement style will be moved to bottom of column
                                            floatPositionAt = 'bottom';   
                                            }//end of IF
                                        else {
                                            //then the float could be placed at the top of next column, to do so need to check whether the float span could fix on the next avbl columns
                                            if (spanValue <= nextAvblClms){
                                                var newClmIndex = clmIndex + 1;
                                                config.docFloatIDsArray[currFloatID].placeFloatAtClmIndex = newClmIndex;
                                                config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height = config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height + currFloatHt;//reverting back the reduced ht
                                                config.floatPositionFlagArray[chkHt][floatPositionAt] = 'OPEN';
                                                cflt = cflt - 1;//reprocessing the same float
                                                break;
                                                }//end of IF
                                            else {
                                                config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height = config.fillFloatPositionFlagArrayPageClmDetails[chkHt].height + currFloatHt;//reverting back the reduced ht
                                                config.floatPositionFlagArray[chkHt][floatPositionAt] = 'OPEN';
                                                //then recurrsing 'calculatingFloatsPlacementIndex' function with resetting recent float's citation height as 0
                                                var reverseCheckFltCt = 0;
                                                for (var reItt = cflt; reItt >= 0; reItt --){
                                                    var currReItteratingFloat = currFloatsForCurrPage[reItt];
                                                    var currReItteratingFloatCitHt = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                                    config.docFloatIDsArray[currReItteratingFloat]["citationBlockHeightOriginal"] = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                                    var currFltOtherObjectDetails = config.docFloatIDsArray[currReItteratingFloat].otherObjectDetails;
                                                    reverseCheckFltCt ++
                                                    if (currReItteratingFloatCitHt > 0){
                                                        flt = cflt;
                                                        config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight = 0;//this change is being made to reprocess the same float to locate on the page
                                                        //resetting the details for "config.floatPositionFlagArray", "config.placedFloatsOnPage" and "config.htAvblOnClm"
                                                        for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                                                            config['htAvblOnClm' + recdet] = currFltOtherObjectDetails.columnHtBeforeDetails[recdet];
                                                            config.floatPositionFlagArray[recdet].top = currFltOtherObjectDetails.floatsPositionAtTopBefore[recdet];
                                                            config.floatPositionFlagArray[recdet].bottom = currFltOtherObjectDetails.floatsPositionAtBottomBefore[recdet];
                                                            config.placedFloatsOnPage[recdet].top = currFltOtherObjectDetails.placedAtColumnTopBefore[recdet];
                                                            config.placedFloatsOnPage[recdet].bottom = currFltOtherObjectDetails.placedAtColumnBottomBefore[recdet];
                                                            }//end of FOR loop
                                                        //====================================================================================
                                                        var pageFloatIDsArrayLen = config.pageFloatIDsArray.length;
                                                        calculatingFloatsPlacementIndex(flt, pageClmDetails, pageFloatIDsArrayLen);//recurrsing calculatingFloatsPlacementIndex
                                                        cflt = cflt - reverseCheckFltCt; 
                                                        reItt = -1;
                                                        }//end of IF
                                                    }//end of FOR loop                                               
                                                }//end of ESLE
                                            }//end of ELSE
                                        }//end of IF
                                    if(chkHt == floatSpanToClms){
                                        config.placedFloatsOnPage[clmIndex][floatPositionAt] = config.placedFloatsOnPage[clmIndex][floatPositionAt].concat(currFloatID);
                                        config.docFloatIDsArray[currFloatID]["placeFloatAt"] = floatPositionAt;                                    
                                        config.floatPositionFlagArray[clmIndex][floatPositionAt] = 'FILLED';
                                        //storing other object details like config.floatPositionFlagArray and config.docFloatIDsArray in float object
                                        var floatPositionDetailsTop = [];
                                        var floatPositionDetailsBottom = [];
                                        var placedFloatsOnClmTop = [];
                                        var placedFloatsOnClmBottom = [];
                                        for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                                            floatPositionDetailsTop.push(config.floatPositionFlagArray[recdet].top);
                                            floatPositionDetailsBottom.push(config.floatPositionFlagArray[recdet].bottom);
                                            placedFloatsOnClmTop.push(config.placedFloatsOnPage[recdet].top);
                                            placedFloatsOnClmBottom.push(config.placedFloatsOnPage[recdet].bottom);
                                            }//end of FOR loop
                                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtTopAfter"] = floatPositionDetailsTop;                                   
                                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtBottomAfter"] = floatPositionDetailsBottom;                                   
                                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnTopAfter"] = placedFloatsOnClmTop;
                                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnBottomAfter"] = placedFloatsOnClmBottom;
                                        break;
                                        }//end of IF
                                    }//end of IF
                                else {//then there is no possibility to place the float at the place where the citation is or the has spanned float at top or bottom
                                    //then recurrsing 'calculatingFloatsPlacementIndex' function with resetting recent float's citation height as 0
                                    var reverseCheckFltCt = 0;
                                    for (var reItt = cflt; reItt >= 0; reItt --){
                                        var currReItteratingFloat = currFloatsForCurrPage[reItt];
                                        var currReItteratingFloatCitHt = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                        config.docFloatIDsArray[currReItteratingFloat]["citationBlockHeightOriginal"] = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                        var currFltOtherObjectDetails = config.docFloatIDsArray[currReItteratingFloat].otherObjectDetails;
                                        reverseCheckFltCt ++;
                                        if (currReItteratingFloatCitHt > 0){
                                            flt = cflt;
                                            config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight = 0;//this change is being made to reprocess the same float to locate on the page
                                            //resetting the details for "config.floatPositionFlagArray", "config.placedFloatsOnPage" and "config.htAvblOnClm"
                                            for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                                                config['htAvblOnClm' + recdet] = currFltOtherObjectDetails.columnHtBeforeDetails[recdet];
                                                config.floatPositionFlagArray[recdet].top = currFltOtherObjectDetails.floatsPositionAtTopBefore[recdet];
                                                config.floatPositionFlagArray[recdet].bottom = currFltOtherObjectDetails.floatsPositionAtBottomBefore[recdet];
                                                config.placedFloatsOnPage[recdet].top = currFltOtherObjectDetails.placedAtColumnTopBefore[recdet];
                                                config.placedFloatsOnPage[recdet].bottom = currFltOtherObjectDetails.placedAtColumnBottomBefore[recdet];
                                                }//end of FOR loop
                                            //====================================================================================
                                            var pageFloatIDsArrayLen = config.pageFloatIDsArray.length;
                                            calculatingFloatsPlacementIndex(flt, pageClmDetails, pageFloatIDsArrayLen);//recurrsing calculatingFloatsPlacementIndex
                                            cflt = cflt - reverseCheckFltCt; 
                                            reItt = -1;
                                            }//end of IF
                                        }//end of FOR loop
                                    }//end of ELSE
                                }//end of FOR loop
                            }//end of IF
                        else {
                            var clmsAvblAtRightSide = nextAvblClms;
                            var clmsRequired = spanValue;
                            var noOfClmsToBeShiftedToLeftSide = clmsRequired - clmsAvblAtRightSide;
                            var indexOfClmToBeShiftedToLeftSide = noOfClmsToBeShiftedToLeftSide - clmIndex;
                            for (noOfClmsToBeShiftedToLeftSide; noOfClmsToBeShiftedToLeftSide >= indexOfClmToBeShiftedToLeftSide; noOfClmsToBeShiftedToLeftSide --){
                                if((parseInt(currFloatHt*100)/100) <= config.fillFloatPositionFlagArrayPageClmDetails[noOfClmsToBeShiftedToLeftSide].height && !(config.floatPositionFlagArray[indexOfClmToBeShiftedToLeftSide][floatPositionAt] == 'SPANNED')){
                                    config.fillFloatPositionFlagArrayPageClmDetails[noOfClmsToBeShiftedToLeftSide].height = config.fillFloatPositionFlagArrayPageClmDetails[noOfClmsToBeShiftedToLeftSide].height - currFloatHt;
                                    config.floatPositionFlagArray[noOfClmsToBeShiftedToLeftSide][floatPositionAt] = 'SPANNED';
                                    if(noOfClmsToBeShiftedToLeftSide == indexOfClmToBeShiftedToLeftSide){
                                        config.placedFloatsOnPage[noOfClmsToBeShiftedToLeftSide][floatPositionAt] = config.placedFloatsOnPage[noOfClmsToBeShiftedToLeftSide][floatPositionAt].concat(currFloatID);
                                        config.docFloatIDsArray[currFloatID]["placeFloatAt"] = floatPositionAt;                                    
                                        config.floatPositionFlagArray[noOfClmsToBeShiftedToLeftSide][floatPositionAt] = 'FILLED';
                                        }//end of IF
                                    }//end of IF
                                else {
                                    debuggerMSG("Condition not defined yet");
                                    }//end of ELSE
                                }//end of FOR loop
                            }//end of ELSE
                         }//end of FOR loop
                    //==================================================================================
                    }//end of IF (Stack)
                //else {//else the style would be 'sandwich'
                if (config.placeStyle == 'Sandwich') {//else the style would be 'sandwich'
                    //===============checking the floats sequence - starts================
                    var checkFloatsSequence = config.pageFloatIDsArray;
                    var checkFloatsSequenceLen = checkFloatsSequence.length;
                    var flagSequence = '';//expect result should be any one of the following "equal" or "increment" or "decrement"
                    var sequenceBreakAt = 0;
                    if (checkFloatsSequenceLen > 0){
                        var firstFltSpanTo = (config.docFloatIDsArray[checkFloatsSequence[0]].floatSpanTo) + 1;
                        }//end of IF
                    //Positioning the floats starts
                    var currFloatsForCurrPage = config.pageFloatIDsArray;
                    var currFloatsForCurrPageLen = currFloatsForCurrPage.length;
                    var pageClmDetailsLen = pageClmDetails.length;
                    var previousFltBlockCitLineIndex = 0;
                    config["floatPlaceInline"] = false;
                    config["currentPageInlineFloats"] = [];
                    config["forceToPlaceAtTop"] = false;
                    for (var cflt = 0; cflt < currFloatsForCurrPageLen; cflt ++){
                        var currFloatID = currFloatsForCurrPage[cflt];
                        var currFloat = config.docFloatIDsArray[currFloatID];
                        var currFloatPlaceSeqStatus = currFloat.placingSequence;
                        var currFloatPlaceInline = currFloat.placingInline;
                        var currFltBlockCitLineIndex = currFloat.citationLineIndex;
                        var currFltBlockCitHt = currFloat.citationBlockHeight;
                        var currFloatCitBaseline = currFloat.currCitBaseline;
                        if (!(currFloat.onPage == currPage.name)){//checking the citation is on the current page if not then the currFltBlockCitHt will 0
                            currFltBlockCitHt = 0;
                            }
                        var currFltBottomWrap = currFloat.wrapBottom;
                        var currFltLeftWrap = currFloat.wrapLeft;
                        if (currFloatPlaceSeqStatus && (cflt > 0)){
                            var floatPositionAt = config.previousFloatPlacedOnClmAt;
                            var clmIndex = config.previousFloatPlacedOnClm;
                            }//end of IF
                        else {
                            var floatPositionAt = currFloat.floatPlaceFrom;
                            var clmIndex = currFloat.placeFloatAtClmIndex;
                            }//end of ELSE
                        var spanValue = currFloat.floatSpanTo;
                        var currFloatHt = currFloat.floatBlockHeight;
                        var nextAvblClms = pageClmDetailsLen -1 - clmIndex;
                        var actualFloatIndex = '';
                        //============storing details like config.floatPositionFlagArray and config.placedFloatsOnPage on current float's object=================
                        var floatPositionDetailsTopBefore = [];
                        var floatPositionDetailsBottomBefore = [];
                        var placedFloatsOnClmTopBefore = [];
                        var placedFloatsOnClmBottomBefore = [];
                        for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                            floatPositionDetailsTopBefore.push(config.floatPositionFlagArray[recdet].top);
                            floatPositionDetailsBottomBefore.push(config.floatPositionFlagArray[recdet].bottom);
                            placedFloatsOnClmTopBefore.push(config.placedFloatsOnPage[recdet].top);
                            placedFloatsOnClmBottomBefore.push(config.placedFloatsOnPage[recdet].bottom);
                            }//end of FOR loop
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtTopBefore"] = floatPositionDetailsTopBefore;                                   
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["floatsPositionAtBottomBefore"] = floatPositionDetailsBottomBefore;                                   
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnTopBefore"] = placedFloatsOnClmTopBefore;
                        config.docFloatIDsArray[currFloatID].otherObjectDetails["placedAtColumnBottomBefore"] = placedFloatsOnClmBottomBefore;
                        config['clmHtBefore' + currFloatID] = floatPlacer.shallowCopy(config.fillFloatPositionFlagArrayPageClmDetails);
                        //==============================================================================================================
                        //now checking if the 'floatPositionAt' value is 'top', then top bounds of the column should be equal (only the columns for which the float spans)
                        //1. If the float placement at top and span length is greater than 1
                        //2. then the top bound of the clms to which it spans shold be equal
                        //3. If true then could try for placement at the top, if not move the placement to next possible location
                        var topBoundIsEqual = true;
                        if (spanValue > 0 && floatPositionAt == 'top'){
                            var clmToBeChecked = spanValue + clmIndex;
                            if (clmToBeChecked < pageClmDetailsLen){
                                var prevClmTopBound = currProcessClms[clmIndex].bounds[0];
                                var ittretClmIndex = clmIndex;
                                for (ittretClmIndex; ittretClmIndex <= clmToBeChecked; ittretClmIndex ++){
                                    var currClmTopBound = currProcessClms[ittretClmIndex].bounds[0];
                                    if (currClmTopBound != prevClmTopBound){
                                        topBoundIsEqual = false;
                                        floatPositionAt = 'bottom';
                                        break;
                                        }//end of IF
                                    prevClmTopBound = currProcessClms[ittretClmIndex].bounds[0];
                                    }//end of FOR loop
                                }//end of IF
                            }//end of IF
                        //==============================================================================================================
                        //identifying citation's page name currently
                        var citParaPageName;                        
                        var citXMLNode = config.currDocDOM.evaluateXPathExpression("//span[@data-rid='"+currFloatID+"']");
                        var citXMLNodeLen = citXMLNode.length;
                        for (var fltCit = 0; fltCit < citXMLNodeLen; fltCit ++){
                            var currInlFltCit = citXMLNode[fltCit];
                            var currInlFltCitAttrib = currInlFltCit.xmlAttributes;
                            var currInlFltCitAttribLen = currInlFltCitAttrib.length;
                            for (var citAtt = 0; citAtt < currInlFltCitAttribLen; citAtt ++){
                                if(currInlFltCitAttrib[citAtt].value == "jrnlFirstCitation"){
                                    citParaPageName = currInlFltCit.paragraphs[0].lines.lastItem().parentTextFrames[0].parentPage.name;
                                    fltCit == citXMLNodeLen;
                                    break;
                                    }//end of IF
                                }//end of FOR loop
                            }//end of FOR loop
                        //==============================================================================================================
                        if(spanValue <= nextAvblClms){
                            var floatSpanToClms = spanValue+clmIndex;//the actual number of columns to which float will span to
                            //checking whether space available on all clms to place the float, if true mark heightFits as 'true' if not mark as 'false'
                            var heightFits = false;
                            for(var chkHt = floatSpanToClms; chkHt >= clmIndex; chkHt --){
                                if((config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height) >= parseInt(currFloatHt*100)/100){
                                    heightFits = true;
                                    }//end of IF
                                else if((config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height) >= (parseInt(currFloatHt*100)/100 - currFltBottomWrap)){//reducing the float bottom wrap to see if fits
                                    heightFits = true;
                                    }//end of IF
                                else if ((parseInt(currFloatHt*100)/100 - currFltBottomWrap) > clmOriginalHt){//if this condition is true then float height is greater than the text area height, then stopping proof
                                    currFloatHt = clmOriginalHt;
                                    heightFits = true;
                                    }//end of ELSE IF
                                else {
                                    //finally checking whether if the float doesn't spans and the page has next clm with space avbl
                                    if (spanValue == 0 && ((clmIndex + 1) <= (pageClmDetailsLen - 1)) && ((floatSpanToClms + 1) <= (pageClmDetailsLen - 1))){
                                        clmIndex = clmIndex + 1;
                                        heightFits = true;
                                        floatSpanToClms = floatSpanToClms + 1;
                                        }
                                    else {
                                        heightFits = false;
                                        break;
                                        }
                                    }
                                 }//end of FOR loop                             
                            //whether the nodes are avaible for placement, that the float 
                            var flagAtPositioningNode = false;
                            if (heightFits){
                                for(var chkHt = floatSpanToClms; chkHt >= clmIndex; chkHt --){
                                    if (config.floatPositionFlagArray[chkHt][floatPositionAt] == 'OPEN' && !(currFloatPlaceInline)){
                                        flagAtPositioningNode = true;
                                        }//end of IF
                                    else if (currFloatPlaceInline && (citParaPageName == currPage.name) && (config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height) >= (parseInt(currFloatHt*100)/100 - currFltBottomWrap)){
                                        flagAtPositioningNode = true;
                                        if (spanValue == 0){
                                            config.floatPlaceInline = true;
                                            config.currentPageInlineFloats = config.currentPageInlineFloats.concat(currFloatID);
                                            if (config.minEmptySpaceAvblOnPage >= (parseInt(currFloatHt*100)/100)){
                                                config.minEmptySpaceAvblOnPage = config.minEmptySpaceAvblOnPage - (parseInt(currFloatHt*100)/100);
                                                config.forceToPlaceAtTop = true;
                                                config.floatPlaceInline = false;
                                                var totalTextHtAvbl = config['clmLastBase'+clmIndex] - currFloatCitBaseline;
                                                for (var ind = clmIndex + 1; ind < pageClmDetailsLen; ind ++){
                                                    totalTextHtAvbl = totalTextHtAvbl + (config['clmLastBase'+ind] - config.margin.top);
                                                    }
                                                var distBtwnCitBaseNTopBound = currFloatCitBaseline - config.margin.top;
                                                if (currFloat.citationOnColumn != clmIndex && config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height > currFltBlockCitHt){//if the citation on clm is not equal then the float might be forced to place on next clm, but trying to fit on citation clm if possible
                                                    //config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height = config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height - currFltBlockCitHt;
                                                    if (currFloatHt <= config.fillFloatPositionFlagArrayPageClmDetails[currFloat.placeFloatAtClmIndex].height && currFloat.citationOnColumn > 0 && config.minEmptySpaceAvblOnPage < currFloatHt){
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        }                                                    
                                                    else if (config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height >= currFloatHt){
                                                        if (config.previousFloatPlacedOnClm > clmIndex){
                                                            if (config.previousFloatPlacedOnClmAt == 'top'){
                                                                clmIndex = config.previousFloatPlacedOnClm;
                                                                floatPositionAt = config.previousFloatPlacedOnClmAt;
                                                                floatSpanToClms = clmIndex;
                                                                config.floatPlaceInline = false;
                                                                chkHt = clmIndex;
                                                                }//end of IF
                                                            }//end of IF
                                                        else if (clmIndex > currFloat.citationOnColumn && config['htAvblOnClm' + (clmIndex)] > currFloatHt){
                                                            floatPositionAt = 'bottom';
                                                            var earlierFloatInlineStatus = config.previousFloatInlineStatus;
                                                            config.forceToPlaceAtTop = false;
                                                            config.floatPlaceInline = true;
                                                            config['htAvblOnClm' + (clmIndex)]  = config['htAvblOnClm' + (clmIndex)] - currFloatHt;
                                                            //further checking whether the current float has stack property true, if so then the last floats inline condition should be true else inline is not fessible
                                                            if (currFloatPlaceSeqStatus == 'true' && !(earlierFloatInlineStatus)){
                                                                config.floatPlaceInline = false;
                                                                }
                                                            }
                                                        else {
                                                            floatPositionAt = 'bottom';
                                                            clmIndex = currFloat.citationOnColumn;
                                                            chkHt = clmIndex;
                                                            floatSpanToClms = clmIndex;
                                                            }
                                                        }//end of IF
                                                    else {
                                                        if (floatPositionAt == 'top' && config.floatPositionFlagArray[chkHt].bottom == 'FILLED'){
                                                            floatPositionAt = 'bottom';
                                                            }//end of IF
                                                        debuggerMSG ("No changes required as of now, could use the placement already 'calculatingFloatsPlacementIndex' returns")
                                                        }//end of ESLE
                                                    }//end of IF
                                                else if ((currFltBlockCitHt + currFloatHt) <= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height && clmIndex == currFloat.citationOnColumn){
                                                    var topBoundShiftedTo = currProcessClms[clmIndex].bounds[0] - config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].bounds[0];
                                                    var currMinWhiteSpace = config.minEmptySpaceAvblOnPage - topBoundShiftedTo;
                                                    var currFloatCitBaselineShiftedTo = currFloatCitBaseline + currMinWhiteSpace;
                                                    var diffBtwnBaseNBtmBnd = config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].bounds[2] - currFloatCitBaselineShiftedTo;
                                                    //calculating text space after citation
                                                    var totalTextHtAvbl = config['clmLastBase'+clmIndex] - currFloatCitBaseline;
                                                    for (var ind = clmIndex + 1; ind < pageClmDetailsLen; ind ++){
                                                        totalTextHtAvbl = totalTextHtAvbl + (config['clmLastBase'+ind] - config.margin.top)
                                                        }
                                                    if (totalTextHtAvbl < distBtwnCitBaseNTopBound + currFloatHt){
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = false;                                                                                                        
                                                        config.previousFloatInlineStatus = false;
                                                        }//end of ELSE IF
                                                    else if (totalTextHtAvbl >= distBtwnCitBaseNTopBound + currFloatHt){
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;                                                                                                        
                                                        }//end of ELSE IF
                                                    else if (totalTextHtAvbl > currFloatHt){
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        }
                                                    else if (currMinWhiteSpace <= currFloatHt && diffBtwnBaseNBtmBnd >= currFloatHt){
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        }
                                                    else {
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = false;
                                                        }
                                                    }//end of ELSE IF
                                                else if (clmIndex > currFloat.citationOnColumn && config['htAvblOnClm' + (clmIndex)] > currFloatHt){//if the possible placement is at actual and there is enough room to place the float then placing inline 
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        config['htAvblOnClm' + (clmIndex)]  = config['htAvblOnClm' + (clmIndex)] - currFloatHt;
                                                    }//end of ELSE IF
                                                else if (clmIndex == currFloat.citationOnColumn && config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= config['htAvblOnClm' + (clmIndex)] + currFloatHt){//if the possible placement is at actual and there is enough room to place the float then placing inline 
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height -  currFloatHt;
                                                    }//end of ELSE IF
                                                else if (clmIndex == (pageClmDetailsLen - 1) && clmIndex == currFloat.citationOnColumn){//here the situation would be float may at the last clm of the page and the is enough space to plot the float inline
                                                        floatPositionAt = 'top';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height -  currFloatHt;
                                                    }
                                                else if(config['htAvblOnClm' + (clmIndex)] < config.baseLeading){
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = false;                                                    
                                                    }//end of ELSE IF
                                                else if (totalTextHtAvbl > distBtwnCitBaseNTopBound + currFloatHt){
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;                                                                                                        
                                                    }//end of ELSE IF
                                                else if (clmIndex > currFloat.citationOnColumn && config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= config['htAvblOnClm' + (clmIndex)] + currFloatHt){//if the possible placement is at actual and there is enough room to place the float then placing inline 
                                                        floatPositionAt = 'top';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height -  currFloatHt;
                                                    }//end of ELSE IF
                                                else {
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = false;  
                                                        config.previousFloatInlineStatus = false;
                                                    }//end of IF 
                                                }//end of IF
                                            else if ((clmIndex == currFloat.citationOnColumn) && (config.pagesContinues) && (config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height >= currFloatHt)){
                                                    var topBoundShiftedTo = currProcessClms[clmIndex].bounds[0] - config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].bounds[0];
                                                    var currMinWhiteSpace = config.minEmptySpaceAvblOnPage - topBoundShiftedTo;
                                                    var currFloatCitBaselineShiftedTo = currFloatCitBaseline + currMinWhiteSpace;
                                                    var diffBtwnBaseNBtmBnd = config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].bounds[2] - currFloatCitBaselineShiftedTo;
                                                    if (currMinWhiteSpace <= currFloatHt && diffBtwnBaseNBtmBnd >= currFloatHt){
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        }
                                                    else {
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = false;
                                                        }
                                                    //checking whether the page continues and have anough space to place inline
                                                    if((config.pagesContinues) && config['htAvblOnClm' + (clmIndex)] > currFloatHt){
                                                        floatPositionAt = 'bottom';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        config['htAvblOnClm' + (clmIndex)]  = config['htAvblOnClm' + (clmIndex)] - currFloatHt;
                                                        }
                                                    else if ((config.pagesContinues) && clmIndex == currFloat.citationOnColumn && config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height >= currFloatHt){
                                                        floatPositionAt = 'top';
                                                        config.forceToPlaceAtTop = false;
                                                        config.floatPlaceInline = true;
                                                        if (config['htAvblOnClm' + (clmIndex)] < config.baseLeading){
                                                            floatPositionAt = 'bottom';
                                                            config.forceToPlaceAtTop = false;
                                                            config.floatPlaceInline = false;
                                                            }//end of IF
                                                        config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height  = config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height - currFloatHt
                                                        }
                                                }//end of ELSE IF
                                            else if ((clmIndex == currFloat.citationOnColumn) && (config.minEmptySpaceAvblOnPage < currFloatHt) && (config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height >= currFloatHt)){
                                                config.forceToPlaceAtTop = false;
                                                config.floatPlaceInline = true;
                                                config.minEmptySpaceAvblOnPage = 0;
                                                }
                                            else if ((currFltBlockCitHt + currFloatHt) <= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height && clmIndex == currFloat.citationOnColumn){
                                                config.forceToPlaceAtTop = false;
                                                config.floatPlaceInline = true;
                                                }
                                            else if ((currFltBlockCitHt + currFloatHt) >= config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height && config.fillFloatPositionFlagArrayPageClmDetails[clmIndex].height >= (parseInt(currFloatHt*100)/100)){
                                                if (!config.pagesContinues){
                                                    clmIndex = currFloat.citationOnColumn;
                                                    }
                                                floatPositionAt = 'bottom';
                                                config.floatPlaceInline = false;
                                                chkHt = clmIndex;
                                                }
                                            else if (currFloatHt <= config.fillFloatPositionFlagArrayPageClmDetails[currFloat.citationOnColumn].height && (clmIndex != currFloat.citationOnColumn) && config.pagesContinues){
                                                if (!config.pagesContinues){
                                                    clmIndex = currFloat.citationOnColumn;
                                                    }
                                                floatPositionAt = 'bottom';
                                                config.floatPlaceInline = false;
                                                flagAtPositioningNode = true;
                                                chkHt = clmIndex;
                                                if(config.pagesContinues){
                                                    floatSpanToClms = currFloat.placeFloatAtClmIndex;
                                                    }
                                                else {
                                                    floatSpanToClms = currFloat.citationOnColumn;
                                                    }
                                                }
                                            else {
                                                config.forceToPlaceAtTop = false;
                                                config.floatPlaceInline = false;
                                                }
                                            }
                                        }//end of ELSE
                                    else if (currFloatPlaceInline && !(config.pagesContinues) && (spanValue == 0) && (citParaPageName == currPage.name)){//if the condition is true then the default placemnt willbe at the top of the current clm
                                        floatPositionAt = 'top';
                                        flagAtPositioningNode = true;
                                        //further checking whether the float could be placed inline
                                        if((previousFltBlockCitLineIndex == currFltBlockCitLineIndex) || (previousFltBlockCitLineIndex == 0) && (config['htAvblOnClm' + (clmIndex)] >= (currFloatHt + currFltBlockCitHt))){
                                            config.currentPageInlineFloats = config.currentPageInlineFloats.concat(currFloatID);
                                            config.floatPlaceInline = true;
                                            }
                                        else {
                                            config.floatPlaceInline = false;
                                            }
                                        }
                                    else if (currFloatPlaceSeqStatus == 'true'){//that is if the float is stacking with the previous one then same node position will be okay to place float
                                        flagAtPositioningNode = true;
                                        if (config.previousFloatPlacedOnClm == clmIndex){
                                            floatPositionAt = config.previousFloatPlacedOnClmAt; 
                                            }
                                        else if (config['htAvblOnClm' + (config.previousFloatPlacedOnClmAt)] >= currFloatHt){
                                            clmIndex = config.previousFloatPlacedOnClm;
                                            floatPositionAt = config.previousFloatPlacedOnClmAt; 
                                            }
                                        }
                                    else {
                                        if (floatPositionAt == 'top' && config.floatPositionFlagArray[chkHt].bottom == 'OPEN'){
                                            if(!currFloatPlaceInline){
                                                floatPositionAt = 'bottom';
                                                }
                                            var totalTextHtAvbl = config['clmLastBase'+clmIndex] - currFloatCitBaseline;
                                            for (var ind = clmIndex + 1; ind < pageClmDetailsLen; ind ++){
                                                totalTextHtAvbl = totalTextHtAvbl + (config['clmLastBase'+ind] - config.margin.top)
                                                }
                                            flagAtPositioningNode = true;
                                            }//end of IF
                                        else {//then the float could be moved to next column top
                                            floatPositionAt = 'top';
                                            var clmsAvblToRight = pageClmDetailsLen - (clmIndex);
                                            if (clmsAvblToRight > spanValue + 1){//then checking if that many clms are avilable to place this float beyond the current clm
                                                clmIndex = clmIndex + 1;//this is the new clm index and reitterating the same float
                                                cflt = cflt - 1;
                                                flagAtPositioningNode = false;
                                                currFloat.placeFloatAtClmIndex = clmIndex;
                                                break;
                                                }//end of IF
                                            else {//if clms are not avbl checking whether the float then placing
                                                if (clmIndex == 0 && floatPositionAt == 'top'){//there is no possibility to place the figure on this page
                                                    splitArray(config.pageFloatIDsArray, cflt, currFloatsForCurrPageLen);
                                                    cflt = currFloatsForCurrPageLen;                                                    
                                                    }//end of IF
                                                else {
                                                    splitArray(config.pageFloatIDsArray, cflt, currFloatsForCurrPageLen);
                                                    cflt = currFloatsForCurrPageLen;                                                    
                                                    debuggerMSG ("Condition yet to be defined clearly. May required to debug float: " + currFloatID);
                                                    }//end of ELSE
                                                }//end of ELSE
                                            }//end of ELSE
                                        }//end of ELSE
                                    //finally if both 'flagAtPositioningNode' retuns true then assigning bounds for the respective float
                                    if ((flagAtPositioningNode||config.floatPlaceInline) && (chkHt == clmIndex)){
                                        for (var bnd = floatSpanToClms; bnd >= clmIndex; bnd --){
                                            if (!config.floatPlaceInline){
                                                config.fillFloatPositionFlagArrayPageClmDetails[bnd].height = config.fillFloatPositionFlagArrayPageClmDetails[bnd].height - currFloatHt;
                                                }//end of IF
                                            config.floatPositionFlagArray[bnd][floatPositionAt] = 'SPANNED';
                                            if(bnd == clmIndex){
                                                config.docFloatIDsArray[currFloatID]["placeFloatAt"] = floatPositionAt;
//                                                if (!config.floatPlaceInline){
                                                    config.floatPositionFlagArray[bnd][floatPositionAt] = 'FILLED';
                                                    config.placedFloatsOnPage[bnd][floatPositionAt] = config.placedFloatsOnPage[bnd][floatPositionAt].concat(currFloatID);
                                                    config.previousFloatPlacedOnClm = bnd;
                                                    config.previousFloatPlacedOnClmAt = floatPositionAt;
                                                    config.docFloatIDsArray[currFloatID]["finalPositionAt"] = bnd;
   //                                                 }//end of IF
                                                }//end of IF
                                            }//end of FOR loop
                                        }//end of IF
                                    }//end of FOR loop
                                }//end of IF
                            else {
                                splitArray(config.pageFloatIDsArray, cflt, currFloatsForCurrPageLen);
                                cflt = currFloatsForCurrPageLen;
                                debuggerMSG ("Condition yet to be fully defined for placement. Debug float: " + currFloatID + " if problem still exists");
                               }
                            }//end of IF
                        else {//then spanValue should be greater than nextAvblClms
                            //then checking the below possibility to place the floats
                            /*
                                        1. Checking the previous float's citation height is greaters than 0, if so resetting the value as 0 and recurssing calculatingFloatsPlacementIndex to clumn index for each floats from there onward
                                        2. If no previous floats found with citation height is greater than 0 and then there might be 
                                            i. Only one float is there then shift the placement node to previous one position if top then reduce then clm index by 1 and then set placement location as bottom, if bottom just chance the placement position as top
                                            ii. If only one float is there then should not changes citation ht as 0
                                    */
                                if (cflt > 0){
                                    var reverseCheckFltCt = 0;
                                    for (var reItt = cflt; reItt >= 0; reItt --){
                                        var currReItteratingFloat = currFloatsForCurrPage[reItt];
                                        var currReItteratingFloatCitHt = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                        config.docFloatIDsArray[currReItteratingFloat]["citationBlockHeightOriginal"] = config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight;
                                        var currFltOtherObjectDetails = config.docFloatIDsArray[currReItteratingFloat].otherObjectDetails;
                                        reverseCheckFltCt ++
                                        if (currReItteratingFloatCitHt > 0){
                                            flt = reItt;
                                            config.docFloatIDsArray[currReItteratingFloat].citationBlockHeight = 0;//this change is being made to reprocess the same float to locate on the page
                                            //resetting the details for "config.floatPositionFlagArray", "config.placedFloatsOnPage" and "config.htAvblOnClm"
                                            for (var recdet = 0; recdet < totalClmsLen; recdet ++){
                                                config['htAvblOnClm' + recdet] = currFltOtherObjectDetails.columnHtBeforeDetails[recdet];
                                                config.floatPositionFlagArray[recdet].top = currFltOtherObjectDetails.floatsPositionAtTopBefore[recdet];
                                                config.floatPositionFlagArray[recdet].bottom = currFltOtherObjectDetails.floatsPositionAtBottomBefore[recdet];
                                                config.placedFloatsOnPage[recdet].top = currFltOtherObjectDetails.placedAtColumnTopBefore[recdet];
                                                config.placedFloatsOnPage[recdet].bottom = currFltOtherObjectDetails.placedAtColumnBottomBefore[recdet];
                                                }//end of FOR loop
                                            //====================================================================================
                                            var pageFloatIDsArrayLen = config.pageFloatIDsArray.length;
                                            config['clmHtBefore' + currFloatID] = floatPlacer.shallowCopy(config.fillFloatPositionFlagArrayPageClmDetails);
                                            config.fillFloatPositionFlagArrayPageClmDetails = config['clmHtBefore' + currReItteratingFloat];
                                            calculatingFloatsPlacementIndex(flt, pageClmDetails, pageFloatIDsArrayLen);//recurrsing calculatingFloatsPlacementIndex
                                            cflt = cflt - reverseCheckFltCt; 
                                            reItt = -1;
                                            }//end of IF
                                        else if (currReItteratingFloatCitHt == 0 && reItt == 0){
                                            splitArray(config.pageFloatIDsArray, cflt, currFloatsForCurrPageLen);
                                            }
                                        }//end of FOR loop
                                    }//end of IF
                                else {
                                    if (floatPositionAt == 'top'){
                                        currFloat.placeFloatAtClmIndex = clmIndex - 1;
                                        currFloat.floatPlaceFrom = 'bottom';
                                        cflt = cflt - 1;
                                        }//end of IF
                                    else {
                                        currFloat.floatPlaceFrom = 'top';
                                        cflt = cflt - 1;
                                        }//end of ELSE
                                    }//end of ELSE
                            }//end of ESLE
                        previousFltBlockCitLineIndex = currFloat.citationLineIndex;
                        }//end of FOR loop
                    }//end of ELSE//end of Sandwich style condition
                //==================================================================================
                //=======================moving floats inline============================================
                if (config.floatPlaceInline){
                    config.currentPageInlineFloats.reverse();
                    var currentPageInlineFloatsLen = config.currentPageInlineFloats.length;
                    for (var plcInlFlt = 0; plcInlFlt < currentPageInlineFloatsLen; plcInlFlt ++){
                        var currFltPlaceInl = config.currentPageInlineFloats[plcInlFlt];
                        var currFloatDetails = config.docFloatIDsArray[currFltPlaceInl];
                        var currFloatPlaceAtClm = currFloatDetails.finalPositionAt;
                        var citXMLNode = config.currDocDOM.evaluateXPathExpression("//span[@data-rid='"+currFltPlaceInl+"']");
                        var citXMLNodeLen = citXMLNode.length;
                        for (var fltCit = 0; fltCit < citXMLNodeLen; fltCit ++){
                            var currInlFltCit = citXMLNode[fltCit];
                            var currInlFltCitAttrib = currInlFltCit.xmlAttributes;
                            var currInlFltCitAttribLen = currInlFltCitAttrib.length;
                            for (var citAtt = 0; citAtt < currInlFltCitAttribLen; citAtt ++){
                                if(currInlFltCitAttrib[citAtt].value == "jrnlFirstCitation"){
                                    var citParaLastLine = currInlFltCit.paragraphs[0].lines.lastItem();
                                    citParaLastLine.characters.lastItem().insertionPoints[0].contents = '\r';
                                    config.currDoc.recompose();
                                    var nextPara = currInlFltCit.paragraphs[0].insertionPoints[-1].paragraphs[0];
                                    nextPara.appliedParagraphStyle = config.currDoc.paragraphStyles.itemByName("FIG_INLINE_FLOAT");
                                    var floatToBeMoved = config.currDoc.pageItems.itemByID(currFloatDetails.frameID);
                                    floatToBeMoved.textWrapPreferences.textWrapMode = TextWrapModes.NONE;
                                    var floatToBeMovedPgItems = floatToBeMoved.pageItems;
                                    var floatToBeMovedPgItemsLen = floatToBeMovedPgItems.length;
                                    //untagging items
                                    for (var pgItm = 0; pgItm < floatToBeMovedPgItemsLen; pgItm ++){
                                        try{
                                            floatToBeMovedPgItems[pgItm].associatedXMLElement.untag();
                                            }catch(e){}
                                        }//end of FOR loop
                                    currProgressPercent = currProgressPercent + percentSplit;
                                    displayMSG("Placing float: " + String(currFltPlaceInl) + "\tin-progress\t" + Math.round(currProgressPercent));
                                    debuggerMSG("Placing float: " + String(currFltPlaceInl));
                                    floatToBeMoved.select();
                                    app.cut();
                                    nextPara.insertionPoints[0].select();
                                    app.paste();
                                    //then removing that particular ID out from config.pageFloatIDsArray
                                    var floatsToBeLocatedLen = config.pageFloatIDsArray.length;
                                    for(var fIDrem =0; fIDrem < floatsToBeLocatedLen; fIDrem ++){
                                        var currObj = config.pageFloatIDsArray[fIDrem];
                                        if (currFltPlaceInl == currObj){
                                            config.pageFloatIDsArray.splice(fIDrem,1);
                                            break;
                                            }//end of IF
                                        }//end of FOR loop
                                    //then removing that particular ID out from placedFloatsOnPage.bottom
                                    var bttomFloatsOnClm = config.placedFloatsOnPage[currFloatPlaceAtClm].bottom;
                                    var bttomFloatsOnClmLen = bttomFloatsOnClm.length;
                                    for(var fIDrem =0; fIDrem < bttomFloatsOnClmLen; fIDrem ++){
                                        var currObj = bttomFloatsOnClm[fIDrem];
                                        if (currFltPlaceInl == currObj){
                                            config.placedFloatsOnPage[currFloatPlaceAtClm].bottom.splice(fIDrem,1);
                                            break;
                                            }//end of IF
                                        }//end of FOR loop
                                    //then removing that particular ID out from placedFloatsOnPage.top
                                    var topFloatsOnClm = config.placedFloatsOnPage[currFloatPlaceAtClm].top;
                                    var topFloatsOnClmLen = topFloatsOnClm.length;
                                    for(var fIDrem =0; fIDrem < topFloatsOnClmLen; fIDrem ++){
                                        var currObj = topFloatsOnClm[fIDrem];
                                        if (currFltPlaceInl == currObj){
                                            config.placedFloatsOnPage[currFloatPlaceAtClm].top.splice(fIDrem,1);
                                            break;
                                            }//end of IF
                                        }//end of FOR loop
                                    break;
                                    }
                                }
                            }//end of FOR loop
                        }//end of FOR loop
                    }//end of IF (floatPlaceInline)
                //==================================================================================
                //========================setting bounds for floats - starts==================================
                if (currPage.name == '1'){
                    pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                    config.fillFloatPositionFlagArrayPageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                    }//end of IF
                else {
                    pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                    config.fillFloatPositionFlagArrayPageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                    }//end of ELSE
                var fillFloatPositionFlagArrayPageClmDetailsLen = config.fillFloatPositionFlagArrayPageClmDetails.length;
                for (var plcFlt = 0; plcFlt < fillFloatPositionFlagArrayPageClmDetailsLen; plcFlt ++){
                    //turning the top wrap for the first floats which is top of the colums
                    if (config.placedFloatsOnPage[plcFlt].top.length > 0){
                        var floatID = config.placedFloatsOnPage[plcFlt].top[0];
                        var currFloatDetails = config.docFloatIDsArray[floatID];
                        if (!(currFloatDetails.floatRotated)){
                            config.currDoc.pageItems.itemByID(currFloatDetails.frameID).textWrapPreferences.textWrapOffset = [0, config.currDoc.pageItems.itemByID(currFloatDetails.frameID).textWrapPreferences.textWrapOffset[1], config.currDoc.pageItems.itemByID(currFloatDetails.frameID).textWrapPreferences.textWrapOffset[2], config.currDoc.pageItems.itemByID(currFloatDetails.frameID).textWrapPreferences.textWrapOffset[3]];
                            }
                        }
                    //==============================================================================
                    var totalNoOfFloatsOnClm = config.placedFloatsOnPage[plcFlt].top.length + config.placedFloatsOnPage[plcFlt].bottom.length;
                    var collectedFloatsOnClm = config.placedFloatsOnPage[plcFlt].top.concat(config.placedFloatsOnPage[plcFlt].bottom.reverse());
                    for(var fltBnd = 0; fltBnd < totalNoOfFloatsOnClm; fltBnd++){
                        var currFltForBound = collectedFloatsOnClm[fltBnd];
                        var currFloatDetails = config.docFloatIDsArray[currFltForBound];
                        var currFloatToBePlacedAt = currFloatDetails.placeFloatAt;
                        var currFloatBottomWrap = currFloatDetails.wrapBottom;
                        var currFloatSpanTo = currFloatDetails.floatSpanTo;
                        if (currFloatToBePlacedAt == 'top'){
                            currFloatDetails["floatBounds"] = [config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[1], config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[0]];
                            config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[0] = parseFloat(currFloatDetails.floatBlockHeight) + parseFloat(config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[0]);
                            if(currFloatSpanTo > 0){//extending same bound to other clm if the float's span exceeds more than a clm width
                                var spanExtendFrom = plcFlt + 1;
                                var spanExtendUpto = currFloatSpanTo;
                                var spanDiff = fillFloatPositionFlagArrayPageClmDetailsLen - currFloatSpanTo;
                                for (spanExtendFrom; spanExtendFrom <= spanExtendUpto; spanExtendFrom ++){
                                    config.fillFloatPositionFlagArrayPageClmDetails[spanExtendFrom].bounds[0] = parseFloat(currFloatDetails.floatBlockHeight) + parseFloat(config.fillFloatPositionFlagArrayPageClmDetails[spanExtendFrom].bounds[0]);
                                    }//end of FOR loop
                                }
                            }//end of IF
                        else {
                            currFloatDetails["floatBounds"] = [config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[1], config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[2] + currFloatBottomWrap - currFloatDetails.floatBlockHeight];
                            config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[2] = parseFloat(config.fillFloatPositionFlagArrayPageClmDetails[plcFlt].bounds[2]) - parseFloat(currFloatDetails.floatBlockHeight) ;
                            if(currFloatSpanTo > 0){//extending same bound to other clm if the float's span exceeds more than a clm width
                                var spanExtendFrom = plcFlt + 1;
                                var spanExtendUpto = currFloatSpanTo;
                                var spanDiff = fillFloatPositionFlagArrayPageClmDetailsLen - currFloatSpanTo;
                                for (spanExtendFrom; spanExtendFrom <= spanExtendUpto; spanExtendFrom ++){
                                    config.fillFloatPositionFlagArrayPageClmDetails[spanExtendFrom].bounds[2] = parseFloat(config.fillFloatPositionFlagArrayPageClmDetails[spanExtendFrom].bounds[2]) - parseFloat(currFloatDetails.floatBlockHeight);
                                    }//end of FOR loop
                                }
                            }//end of ELSE
                        }//end of FOR loop
                    }//end of FOR loop
                //========================setting bounds for floats - ends==================================

                //============Placing floats====================
                var floatsToBeLocated = config.pageFloatIDsArray;
                var floatsToBeLocatedLen = floatsToBeLocated.length;
                for (var ftm = 0; ftm < floatsToBeLocatedLen; ftm ++){
                    currProgressPercent = currProgressPercent + percentSplit;
                    displayMSG("Placing float: " + String(floatsToBeLocated[ftm]) + "\tin-progress\t" + Math.round(currProgressPercent));
                    debuggerMSG("Placing float: " + String(floatsToBeLocated[ftm]));
                    var currFloatToBeLocated = config.docFloatIDsArray[floatsToBeLocated[ftm]];
                    config.currDoc.recompose();
                    config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move(currPage);
                    if (currFloatToBeLocated.floatRotated){
                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0] + currFloatToBeLocated.landscapeAdditionalOffset, config.pageColumns[0].bounds[2]]);
                        }
                    else {
                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1]]);
                        }
                    config.floatsPlacedOnPages[config.floatsPlacedOnPages.length] = floatsToBeLocated[ftm];//Placed floats IDs were stored in an separate array
                    }//end of FOR loop                
                //==========================================
                //if the first column is imaginary then move the placed floats on the column to next column
                if (pageClmDetails[0].imaginary == true){;
                    var topFloatsOnFirstImgClm = config.placedFloatsOnPage[0].top;
                    var bottomFloatsOnFirstImgClm = config.placedFloatsOnPage[0].bottom;
                    config.placedFloatsOnPage[1].top.unshift (topFloatsOnFirstImgClm)
                    config.placedFloatsOnPage[1].bottom.unshift(bottomFloatsOnFirstImgClm);
                    }
                //====================================================================
                ResolveOverset(app.activeDocument);
                },//end of function "placingSandwich"
            placeAsPerUserInputs: function(currPage){
                var topMarginBound = 0;
                if (currPage.name == '1'){
                    var firstFrame = config.currDoc.textFrames.itemByName('FIRST_FRAME');
                    var firstFrameClCt = firstFrame.textFramePreferences.textColumnCount;//Actual column count for the text frame
                    var firstFrameSpanCol = firstFrame.textColumns;//Column including "Split columns". Note this value includes number of paragraphs split across text frame columns
                    var firstFrameSpanColLen = firstFrameSpanCol.length;
                    if (firstFrameClCt < firstFrameSpanColLen){
                        var firstFrameSpanColFirstActClm = firstFrameSpanCol[firstFrameSpanColLen - firstFrameClCt];//the actual first column
                        var firstFrameSpanColFirstActClmFirstLine = firstFrameSpanColFirstActClm.lines.firstItem();
                        var topBound = firstFrameSpanColFirstActClmFirstLine.characters[0].baseline - firstFrameSpanColFirstActClmFirstLine.characters[0].ascent;
                        topMarginBound = topBound - firstFrame.geometricBounds[0];
                        }//end of IF
                    }
                if (config.currPageStyle == 'VERSO'){
                    var marginForCalc = config.margin.outside;
                    }
                else{
                    var marginForCalc = config.margin.inside;
                    }
                var marginForCalc = config.margin.inside;
                if (currPage.name == '1'){
                    var clmLen = config.openerPageColumns.length;
                    var prevClmnWd = 0;
                    for (var pcd = 0; pcd < clmLen; pcd ++){
                            config.openerPageColumns[pcd]["bounds"] = [config.margin.top + topMarginBound, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].gutter, config.margin.top + config.openerPageColumns[pcd].height, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].width + config.openerPageColumns[pcd].gutter];//exculding margin
                            prevClmnWd = config.openerPageColumns[pcd].width + prevClmnWd + config.openerPageColumns[pcd].gutter;
                        }//end of FOR loop    
                    pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                    }//end of IF
                else {
                    var clmLen = config.pageColumns.length;
                    var prevClmnWd = 0;
                    for (var pcd = 0; pcd < clmLen; pcd ++){
                            config.pageColumns[pcd]["bounds"] = [config.margin.top + topMarginBound, marginForCalc + prevClmnWd + config.pageColumns[pcd].gutter, config.margin.top + config.pageColumns[pcd].height, marginForCalc + prevClmnWd + config.pageColumns[pcd].width + config.pageColumns[pcd].gutter];//exculding margin
                            prevClmnWd = config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter;
                        }//end of FOR loop    
                    pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                    }//end of ELSE
                var floatsForCurrPage = config.userPlacingFloatsDetails[currPage.name];
                var floatIDsFromPageFloatIDs = config.pageFloatIDsArray;//assigning the values received the for collectCitation to other variable
                if(floatsForCurrPage != undefined){
                    var floatsForCurrPageLen = floatsForCurrPage.length;
                    config.pageFloatIDsArray = floatsForCurrPage;
                    for(var uf = 0; uf < floatsForCurrPageLen; uf ++){
                        var currFloatUI = floatsForCurrPage[uf];
                        var currFloatXML = config.currDocDOM.evaluateXPathExpression("//div[@id='BLK_"+currFloatUI+"']");
                        var currFloatXMLPlaceAt = currFloatXML[0].xmlAttributes.itemByName("data-float-placement").value;
                        var autoWrapTop = parseInt(config.wrapAroundFloat.top);
                        var autoWrapBottom = parseInt(config.wrapAroundFloat.bottom);
                        if (currFloatXML[0].xmlAttributes.itemByName("data-top-gap").isValid){
                            var wrapTop = parseInt(currFloatXML[0].xmlAttributes.itemByName("data-top-gap").value);
                            }
                        else {
                            var wrapTop = 0;
                            }
                        if (currFloatXML[0].xmlAttributes.itemByName("data-bot-gap").isValid){
                            var wrapBottom = parseInt(currFloatXML[0].xmlAttributes.itemByName("data-bot-gap").value);
                            }
                        else {
                            var wrapBottom = 0;
                            }
                        config.docFloatIDsArray[currFloatUI].floatBlockHeight = config.docFloatIDsArray[currFloatUI].floatBlockHeight - autoWrapBottom;
                        var currFloatDetails = config.docFloatIDsArray[currFloatUI];
                        if(pageClmDetails.length == 3){
                            if(currFloatXMLPlaceAt == "TopLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[0]];
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of IF
                            else if(currFloatXMLPlaceAt == "TopRight"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[2].bounds[1], pageClmDetails[2].bounds[0]];
                                pageClmDetails[2].bounds[0] = pageClmDetails[2].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopMarginalColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                pageClmDetails[2].bounds[0] = pageClmDetails[2].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopSingleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[0]];
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopDoubleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[0]];
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                pageClmDetails[2].bounds[0] = pageClmDetails[2].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[2] + wrapBottom - currFloatDetails.floatBlockHeight];
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomRight"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[2].bounds[1], pageClmDetails[2].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[2].bounds[2] = pageClmDetails[2].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomDoubleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[2] + wrapBottom - currFloatDetails.floatBlockHeight];
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                pageClmDetails[2].bounds[2] = pageClmDetails[2].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomMarginalColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                pageClmDetails[2].bounds[2] = pageClmDetails[2].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "MarginalTopLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "MarginalBottomLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset = [wrapTop, config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset[1], wrapBottom, config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset[3]];
                            }//end of IF
                        else if (pageClmDetails.length == 2){
                            if(currFloatXMLPlaceAt == "TopLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of IF
                            else if(currFloatXMLPlaceAt == "TopRight"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[0]];
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopMarginalColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopSingleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "TopDoubleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                pageClmDetails[1].bounds[0] = pageClmDetails[1].bounds[0] + currFloatDetails.floatBlockHeight + wrapBottom;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomRight"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[1].bounds[1], pageClmDetails[1].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomDoubleColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "BottomMarginalColumn"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                pageClmDetails[1].bounds[2] = pageClmDetails[1].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "MarginalTopLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[0]];
                                pageClmDetails[0].bounds[0] = pageClmDetails[0].bounds[0] + currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            else if(currFloatXMLPlaceAt == "MarginalBottomLeft"){
                                currFloatDetails["floatBounds"] = [pageClmDetails[0].bounds[1], pageClmDetails[0].bounds[2] + wrapBottom  - currFloatDetails.floatBlockHeight];
                                pageClmDetails[0].bounds[2] = pageClmDetails[0].bounds[0] + wrapBottom  - currFloatDetails.floatBlockHeight;
                                }//end of ELSE IF
                            config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset = [wrapTop, config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset[1], wrapBottom, config.currDoc.pageItems.itemByID(config.docFloatIDsArray[currFloatUI].frameID).textWrapPreferences.textWrapOffset[3]];
                            }//end of ELSE IF
                        }//end of FOR loop
                    //============Placing floats====================
                    var floatsToBeLocated = config.pageFloatIDsArray;
                    var floatsToBeLocatedLen = floatsToBeLocated.length;
                    for (var ftm = 0; ftm < floatsToBeLocatedLen; ftm ++){
                        var currFloatToBeLocated = config.docFloatIDsArray[floatsToBeLocated[ftm]];
                        config.currDoc.recompose();
                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move(currPage);
                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1]]);
                        config.floatsPlacedOnPages[config.floatsPlacedOnPages.length] = floatsToBeLocated[ftm];//Placed floats IDs were stored in an separate array
                        }//end of FOR loop                
                    }//end of IF
                //==========================================
                //checking whether next page is valid, if so assiging the already placed (float block) IDs to 'notPlacedFloatsIDs'
                ResolveOverset(app.activeDocument);
                if (config.currDoc.pages[currPage.documentOffset+1].isValid){
                    var nextPage = config.currDoc.pages[currPage.documentOffset+1].name;
                    if (config.userPlacingFloatsDetails[nextPage] != ''){
                        config.notPlacedFloatsIDs = config.notPlacedFloatsIDs.concat(floatIDsFromPageFloatIDs);
                        }//end of IF
                    }//end of IF
                },//end of function "placeAsPerUserInputs"    
            columnBaseAlign: function(currPage, pageClmDetails){
                try{
                var currPageName = parseInt(currPage.name);
                var currPageFrame;
                if (currPageName == 1){
                    currPageFrame = currPage.textFrames.itemByName("FIRST_FRAME");
                    }
                else if(currPageName %2 ==1){
                    currPageFrame = currPage.textFrames.itemByName("RECTO");
                    config["currPageStyle"] = "RECTO";
                    var marginForCalc = config.margin.inside;
                    }
                else{
                    currPageFrame = currPage.textFrames.itemByName("VERSO");
                    config["currPageStyle"] = "VERSO";
                    var marginForCalc = config.margin.outside;
                    }
                var maxBaselinePosition;
                var nextFrameIsValid = false;
                if (currPageFrame.isValid){//checking whether the page has text frames for alignment
                    //checking whether next frame is valid
                    if (!(currPageFrame.nextTextFrame == null)){
                        var nextFrame = currPageFrame.nextTextFrame;
                        if (!(nextFrame.contents == '')){
                            nextFrameIsValid = true;
                            }
                        }//end of IF
                    //=====================================
                    if (nextFrameIsValid == true){
                        config["lastPageTextFrameAdjusted"] = false;
                        maxBaselinePosition = currPageFrame.geometricBounds[0];//assuming that the initial maximum baseline would be the text frame's geometricBounds
                        }//end of IF
                    else if (nextFrameIsValid == false){
                       //collecting floats length that placed on bottom of the page
                        if(currPage.name == '1'){
                            var currProcessClms = config.openerPageColumns;
                            var currProcessClmsLen = config.openerPageColumnsLen;
                            }//end of IF
                        else {
                            var currProcessClms = config.pageColumns;
                            var currProcessClmsLen = config.pageColumnsLen;
                            }//end of ELSE
                        //=============================================================
                        var currPageFrameTextClmCt = currPageFrame.textFramePreferences.textColumnCount;
                        var currPageFrameTextClm = currPageFrame.textColumns;
                        var clmLastLineBaseArray = new Array ();
                        for (var lstb = 0; lstb < currPageFrameTextClmCt; lstb++){
                            if (currPageFrameTextClm[lstb].isValid){
                                var currClmLastLineBase = currPageFrameTextClm[lstb].lines.lastItem().baseline;
                                clmLastLineBaseArray = clmLastLineBaseArray.concat(currClmLastLineBase);
                                config['clmHasLines' + lstb] = true;
                                }
                            else {
                                var currClmLastLineBase = config.margin.top;
                                clmLastLineBaseArray = clmLastLineBaseArray.concat(currClmLastLineBase);
                                config['clmHasLines' + lstb] = false;
                                }
                            }//end of FOR loop
                        //another possibility would be the page may have floats at bottom, in that case need to move the float upward,
                        //1. First checking whether the page has bottom floats (with the help of config.placedFloatsOnPage[x].bottom info)
                        //2. If floats is(are) there then go for the 
                        var pageBtmFloatsLen = 0;
                        config["currPageBtmFloats"] = [];
                        if (config.placedFloatsOnPage[0].bottom != ''){
                            for (var clmn = 0; clmn < currProcessClmsLen; clmn++){
                               pageBtmFloatsLen += config.placedFloatsOnPage[clmn].bottom.length;
                               config.currPageBtmFloats = config.currPageBtmFloats.concat(config.placedFloatsOnPage[clmn].bottom);
                               } 
                            }//end of IF
                        var totBtmGap = 0;
                        var floatsBtmBounds = [];
                        if (pageBtmFloatsLen > 0){
                            for (var btmGap = 0; btmGap < currProcessClmsLen; btmGap ++){
                                if(!(config['clmHasLines' + btmGap])){
                                    totBtmGap += config.fillFloatPositionFlagArrayPageClmDetails[btmGap].bounds[2] - config.fillFloatPositionFlagArrayPageClmDetails[btmGap].bounds[0];
                                    }
                                else {
                                    totBtmGap += config.fillFloatPositionFlagArrayPageClmDetails[btmGap].bounds[2] - clmLastLineBaseArray[btmGap];
                                    }
                                }//end of FOR loop                            
                            var btmFloatsShiftValue = totBtmGap/2;
                            config["resetTopWrap"] = false;
                            resetPlacedFloatsBounds (btmFloatsShiftValue,floatsBtmBounds)
                            }//end of IF
                        //============Placing floats====================
                        function resetPlacedFloatsBounds (shiftvalue,floatsBtmBounds){
                            var currPageBtmFloatsLen = config.currPageBtmFloats.length;
                            for (var ftm = 0; ftm < currPageBtmFloatsLen; ftm ++){
                                var currFloatToBeLocated = config.docFloatIDsArray[config.currPageBtmFloats[ftm]];
                                config.currDoc.recompose();
                                config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move(currPage);
                                var earlierYBound = currFloatToBeLocated.floatBounds[1];
                                if (currFloatToBeLocated.floatRotated){
                                    config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0] + currFloatToBeLocated.landscapeAdditionalOffset, config.pageColumns[0].bounds[2]]);
                                    config.docFloatIDsArray[config.currPageBtmFloats[ftm]].floatBounds = [currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1] - (shiftvalue)];
                                    }
                                else {
                                    config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).move([currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1] - (shiftvalue)]);
                                    config.docFloatIDsArray[config.currPageBtmFloats[ftm]].floatBounds = [currFloatToBeLocated.floatBounds[0], currFloatToBeLocated.floatBounds[1] - (shiftvalue)];
                                    if (config.resetTopWrap){
                                        var currWraps = config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).textWrapPreferences.textWrapOffset;
                                        var shiftvalueTolerence = (shiftvalue * 5)/100;
                                        shiftvalueTolerence = shiftvalue - shiftvalueTolerence;
                                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).textWrapPreferences.textWrapOffset = [currWraps[0]+(-shiftvalueTolerence), currWraps[1], currWraps[2], currWraps[3]];
                                        }
                                    else {
                                        var currentYbounds = config.docFloatIDsArray[config.currPageBtmFloats[ftm]].floatBounds[1];
                                        var boundsDiff = earlierYBound - currentYbounds;
                                        var currWraps = config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).textWrapPreferences.textWrapOffset;
                                        config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).textWrapPreferences.textWrapOffset = [currWraps[0], currWraps[1], currWraps[2]+boundsDiff, currWraps[3]];                                        
                                        }
                                    }
                                floatsBtmBounds.push(config.currDoc.pageItems.itemByID(currFloatToBeLocated.frameID).geometricBounds[2]);
                                }//end of FOR loop 
                            floatsBtmBounds.sort(function(a, b){return b-a});
                            }//end of function 'resetPlacedFloatsBounds'
                        //==========================================
                       //===============================================================
                        currPageFrame.textFramePreferences.verticalBalanceColumns = true;
                        var currPageFrameTextClmCt = currPageFrame.textFramePreferences.textColumnCount;
                        var currPageFrameTextClm = currPageFrame.textColumns;
                        var clmLastLineBaseArray = new Array ();
                        for (var lstb = 0; lstb < currPageFrameTextClmCt; lstb++){
                            if (currPageFrameTextClm[lstb].isValid){
                                var currClmLastLineBase = currPageFrameTextClm[lstb].lines.lastItem().baseline;
                                clmLastLineBaseArray = clmLastLineBaseArray.concat(currClmLastLineBase);
                                config['clmHasLines' + lstb] = true;
                                }
                            else {
                                var currClmLastLineBase = config.margin.top;
                                clmLastLineBaseArray = clmLastLineBaseArray.concat(currClmLastLineBase);
                                config['clmHasLines' + lstb] = false;
                                }
                            }//end of FOR loop
                        clmLastLineBaseArray.sort(function(a, b){return a-b});
                        maxBaselinePosition = clmLastLineBaseArray[clmLastLineBaseArray.length - 1];
                        if (maxBaselinePosition > floatsBtmBounds[0]){//if the maxBaseline value is greater than the max btm bound of the floats on the page then reshifting the floats, the reshifting value would be diff of maxbase and float's btm bound
                            btmFloatsShiftValue = -(maxBaselinePosition - floatsBtmBounds[0]);//negative is inculded since the floats has to be shifted down
                            floatsBtmBounds = [];
                            config.resetTopWrap = true;
                            resetPlacedFloatsBounds (btmFloatsShiftValue,floatsBtmBounds)
                            }//end of IF
                        var currPageFrameBounds = currPageFrame.geometricBounds;
                        currPageFrame.geometricBounds = [currPageFrameBounds[0], currPageFrameBounds[1], maxBaselinePosition + 0.5, currPageFrameBounds[3]];//added 0.5 intentionally to Y2
                        currPageFrame.textFramePreferences.verticalBalanceColumns = false;
                        if(config.currDoc.pages[parseInt(currPage.name)].isValid){
                            config.currDoc.pages[parseInt(currPage.name)].remove();
                        }

                        config["lastPageTextFrameAdjusted"] = true;
                        if (currPage.name == 2){
                            config.currDoc.pages[2].remove();
                            }
                        else if (currPage.name == 1){
                            config.currDoc.pages[1].remove();
                            config.currDoc.pages[2].remove();
                            }
                        }//end of ELSE IF
                    if(currPage.name == '1'){
                        var currProcessClms = config.openerPageColumns;
                        var currProcessClmsLen = config.openerPageColumnsLen;
                        }//end of IF
                    else {
                        var currProcessClms = config.pageColumns;
                        var currProcessClmsLen = config.pageColumnsLen;
                        }
                    var prevClmnWd = 0;//assuing that the previous column width would be 0 value initially
                    var marginForCalc = config.margin.inside;
                    for (var pcd = 0; pcd < currProcessClmsLen; pcd ++){
                            currProcessClms[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + currProcessClms[pcd].gutter, config.margin.top + currProcessClms[pcd].height, marginForCalc + prevClmnWd + currProcessClms[pcd].width + currProcessClms[pcd].gutter];//exculding margin
                            prevClmnWd = currProcessClms[pcd].width + prevClmnWd + currProcessClms[pcd].gutter;
                        }//end of FOR loop                
                    var currFrameParaDetails = new Array();
                    config["textColumnCountAffects"] = false;//if the currrent spn ct and text colm ct is equal this will remain false
                    config["textColumnCountDiff"] = 0;
                    if (currPageFrame.isValid){
                        var currPageFrameID = currPageFrame.id;
                        var currFrmActColCnt = currPageFrame.textFramePreferences.textColumnCount;//Actual column count for the text frame
                        var currFrmSpanCol = currPageFrame.textColumns;//Column including "Split columns". Note this value includes number of paragraphs split across text frame columns
                        var currFrmSpanColLen = currFrmSpanCol.length;
                        if (currFrmActColCnt > currFrmSpanColLen){
                            config.textColumnCountDiff = currFrmActColCnt - currFrmSpanColLen;
                            config.textColumnCountAffects = true;
                            }//end of IF
                        //Now indentifying which columns should be base aligned for the text frames. i.e) excluding the paragraphs with split columns
                        /*Collecting the results in an array and also the maximum basline where the paragraphs should align
                                 To do that  need to know whether the columns ends with page base or with paragraph splits or the columns have floats at the bottom (considering double columns)
                                 1. If the coulmns have been spilt by paragraph (could be section heads) then the maimum baseline will be first line base of the paragraph (splits) minus its leading and top space.
                                 2. If the columns have floats at the bottom there would be two situatiion
                                        i. The top most floats from the bottom spans across columns (page)
                                        ii. Each columns has different types of floats at the top most position
                                      To handle this each column's maximum base position should be taken into account using the floats placed
                                 3. If the columns ends with page base then the maimum baseline will be the baseline until bottom margin of the page
                                */   
                        var clmsForAlign = new Array();
                        var clmsForAlignTempCount = 0;
                        if(currPage.name == '1'){
                            //The below details collected for first page and for the rest will be collected in 'placingStacks' function 
                            var clmLen = config.openerPageColumns.length;
                            var prevClmnWd = 0;
                            var marginForCalc = config.margin.inside;
                            for (var pcd = 0; pcd < clmLen; pcd ++){
                                    config.openerPageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].gutter, config.margin.top + config.openerPageColumns[pcd].height, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].width + config.openerPageColumns[pcd].gutter];//exculding margin
                                    prevClmnWd = config.openerPageColumns[pcd].width + prevClmnWd + config.openerPageColumns[pcd].gutter;
                                }//end of FOR loop
                            //=====================================================================
                            pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);//IMPORTANT: Needed update                            
                            }//end of IF
                        else {
                            var clmLen = config.pageColumns.length;
                            var prevClmnWd = 0;
                            var marginForCalc = config.margin.inside;
                            for (var pcd = 0; pcd < clmLen; pcd ++){
                                    config.pageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.pageColumns[pcd].gutter, config.margin.top + config.pageColumns[pcd].height, marginForCalc + prevClmnWd + config.pageColumns[pcd].width + config.pageColumns[pcd].gutter];//exculding margin
                                    prevClmnWd = config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter;
                                }//end of FOR loop
                            pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                            }
                        for (var clmItt = 0; clmItt < currFrmSpanColLen; clmItt ++){
                            //pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                            var currCol = currFrmSpanCol[clmItt];
                            var currColSpn = currCol.spanSplitColumnCount.constructor.name;
                            //if 'currColSpn' constructor name returns "Enumerator", then it means that column does not have any paragraphs with "Split columns" and also the actual column of the frame
                            if(currColSpn == 'Enumerator'){
                                clmsForAlign[clmsForAlignTempCount] = clmItt;//Since the collected column details are getting affected while adjusting paragraphs for basealign so just collecting the column index alone 
                                clmsForAlignTempCount ++;
                                if (currFrmSpanCol[clmItt + 1].isValid && currFrmSpanCol[clmItt + 1].spanSplitColumnCount.constructor.name == 'Number'){//next paragraph has split column option
                                    maxBaselinePosition = currFrmSpanCol[clmItt + 1].paragraphs[0].lines[0].baseline - (currFrmSpanCol[clmItt + 1].paragraphs[0].lines[0].leading + currFrmSpanCol[clmItt + 1].paragraphs[0].lines[0].spaceBefore);
                                    var clmsForAlignLen = clmsForAlign.length;
                                    var maxBaselinePositionArray = new Array();
                                    for (var mbp = 0; mbp < clmsForAlignLen; mbp ++){
                                        maxBaselinePositionArray[mbp] = maxBaselinePosition;
                                        }//end of FOR loop
                                    config.recalledFromParaTracking = false;
                                    //Noticed a bug on 15-Feb-2017, whenever a full page block occupies a page the below function results next textframes data, so in order to avoid that we have modified the code to verify whether page name of first line of frame and currPage name is equal
                                    if (config.currDoc.textFrames.itemByID(currPageFrameID).lines[0].parentTextFrames[0].parentPage.name == currPage.name){
                                        floatPlacer.events.collectingColumnDetails(clmsForAlign, maxBaselinePositionArray, currPageName, currPageFrameID);
                                        }//end of IF
                                    clmsForAlign = new Array();
                                    clmsForAlignTempCount = 0;
                                    }//end of IF 
                                else if (!(currFrmSpanCol[clmItt + 1].isValid)){//if this condition is true then that should be the last column for the page with no further split columns and  also satisfies the statement 2 and 3 above.
                                    var clmsForAlignLen = clmsForAlign.length;
                                    var maxBaselinePositionArray = new Array();
                                    for (var mbp = 0; mbp < clmsForAlignLen; mbp ++){
                                        if (!(currPageFrame.nextTextFrame == undefined)){
                                            var test = pageClmDetails[mbp];
                                            maxBaselinePositionArray[mbp] = pageClmDetails[mbp].bounds[2];
                                            }
                                        else {
                                            maxBaselinePositionArray[mbp] = maxBaselinePosition;
                                            }
                                        }//end of FOR loop
                                    config.recalledFromParaTracking = false;
                                    //Noticed a bug on 15-Feb-2017, whenever a full page block occupies a page the below function results next textframes data, so in order to avoid that we have modified the code to verify whether page name of first line of frame and currPage name is equal
                                    if (config.currDoc.textFrames.itemByID(currPageFrameID).lines[0].parentTextFrames[0].parentPage.name == currPage.name){
                                        floatPlacer.events.collectingColumnDetails(clmsForAlign, maxBaselinePositionArray, currPageName, currPageFrameID);
                                        }//end of IF
                                    clmsForAlign = new Array();
                                    clmsForAlignTempCount = 0;
                                    }
                                }//end of IF 
                            else {
                                clmsForAlign = new Array();
                                clmsForAlignTempCount = 0;
                                }//end of IF 
                            }//end of FOR loop
                        }//end of IF                                        
                    }//end of IF
                config.placedFloatsOnPage[0] = {"top":[],"bottom":[]};
                config.placedFloatsOnPage[1] = {"top":[],"bottom":[]};
				} catch (e){"Error to be logged"}
                },//end of 'columnBaseAlign' function
            collectingColumnDetails: function(clmsForAlign, maxBaselinePositionArray, currPageName, currPageFrameID){
                config["baseAlignmentDetails"] = {};
                var clmsForAlignLen = clmsForAlign.length;
                /*Now collecting following details
                        1. Possibility to track paragraphs +ve/-ve 
                        2. Paragraph style name
                        3. Last line of each column and its base
                        4. Indentifying to which page column's index the 'clmsForAlign' have been tied up
                        5. i. Number of lines on current column when paragraph breaks
                            ii. Number of lines on next column/page when paragraph breaks
                        6. Details of the paragraphs on next column/page
                        7. Collecting lines which could be included for VJ 
                        */
                //1. Possibility to track paragraphs +ve/-ve
                //2. Paragraph style name
                config["maxColumnLenForBaseAlign"] = clmsForAlignLen + 2; //Two count is added aditionally for tolerance
                config["maxColumnLenForBaseAlignCt"] = 0;
                for (var cl = 0; cl < clmsForAlignLen; cl ++){
                    if (config.reduceClmItteration){
                        cl = cl - 1;
                        clmsForAlignLen = clmsForAlignLen - 1;
                        }
                    var currClm = config.currDoc.textFrames.itemByID(currPageFrameID).textColumns[clmsForAlign[cl]];
                    var currClmFrameParas = currClm.paragraphs;//collecting paragraphs on the page
                    var currClmFrameParasLen = currClmFrameParas.length;
                    var previousLineBaseline = undefined;
                    config.baseAlignmentDetails["numOfLinesOnCurrClm"] = currClm.lines.length;
                    config.baseAlignmentDetails["clmParaDetails"] = new Array();
                    config.baseAlignmentDetails["clmParasForLooseLines"] = new Array();
                    config.baseAlignmentDetails["clmParasForTightLines"] = new Array();
                    var clmParaDetailsCt = 0;
                    var looseLineCt = 0;
                    var tightLineCt = 0;
                    var paraLeading;
                    for (var cp = 0; cp < currClmFrameParasLen; cp ++){
                        var currPara = currClmFrameParas[cp];
                        paraLeading = calcLeading(currPara);
                        if (currPara.appliedParagraphStyle.name == 'jrnlRefHead'){
                            currPara.spanSplitColumnCount = 2;
                            currPara.spanColumnType = SpanColumnTypeOptions.SPAN_COLUMNS;
                            splitBackmatterTextframe("//h1[@pstyle='jrnlRefHead']", false, currPage, 18);
                            }
                        var currParaLines = currPara.lines;
                        var currParaLinesLen = currParaLines.length;
                        var linesStartIndex = 0;
                        var linesEndIndex = 0;
                        var trackOption;
                        var currClmnWd, paraOnClm = 0;
                        if (cp == 0){
                            var paraFirstLinePageName = currPara.lines.firstItem().parentTextFrames[0].parentPage.name;
                            var paraLastLinePageName = currPara.lines.lastItem().parentTextFrames[0].parentPage.name;
                            if (!(parseInt(paraFirstLinePageName) == parseInt(paraLastLinePageName))){
                                var paraSplitAcrossPage = true;
                                }//end of IF
                            else {
                                var paraSplitAcrossPage = false;
                                }//end of ELSE
                            }//end of IF
                        else {
                                var paraSplitAcrossPage = false;
                            }//end of IF
                        var lastLineLastCharPos = currPara.lines.lastItem().characters.lastItem().insertionPoints[0].horizontalOffset;
                        if (config.currPageStyle == 'VERSO'){
                            var currClmnWdExtrmHrOffset = config.margin.outside;
                            }
                        else{
                            var currClmnWdExtrmHrOffset = config.margin.inside;
                            }
                        //checking whether the para is continued between two columns, is at least require 3 lines of the para should be on the current column (only for the very firts paragraph)
                        var lineIterrCt = 0;
                        var allowForTracking = true;
                        if (cp == 0 && (currParaLines.length > 4)){
                            if (currParaLines[currParaLinesLen - 1].baseline > currParaLines[currParaLinesLen - 3].baseline){
                                allowForTracking = true
                                }
                            else {
                                allowForTracking = false;
                                }
                            }//end of IF
                        else {
                            if(currParaLines.length > 1){
                                allowForTracking = true;
                                }
                            }
                        for (var hzc = 0; hzc < config.pageColumnsLen; hzc ++){
                            currClmnWd = parseFloat(config.pageColumns[hzc].width);
                            currClmnWdExtrmHrOffset = parseFloat(currClmnWdExtrmHrOffset) + config.pageColumns[hzc].gutter + currClmnWd;
                            if (lastLineLastCharPos < currClmnWdExtrmHrOffset && currParaLinesLen > 1){//
                                paraOnClm = hzc;
                                var lastLineFirstCharPos = currPara.lines.lastItem().characters.firstItem().insertionPoints[0].horizontalOffset;
                                var posDiff = lastLineLastCharPos - lastLineFirstCharPos;
                                if ((currClmnWd - posDiff) >= (posDiff/2) && allowForTracking){//if the last character position of the paragraph is less than half of the column width then could assume that we could go for -ve tracking, if not +ve tracking
                                    trackOption = 'negative';
                                    }
                                else if (allowForTracking){
                                    trackOption = 'positive';
                                    }
                                break;
                                }//end of IF
                            }//end of FOR loop 
                        var paraStyleName = currPara.appliedParagraphStyle.name;
                        config.baseAlignmentDetails.clmParaDetails[clmParaDetailsCt] = {'paraObject':currPara, 'paraStyleName':paraStyleName}
                        clmParaDetailsCt ++;
                        if (trackOption == 'negative'){
                            config.baseAlignmentDetails.clmParasForTightLines[tightLineCt] = {'paraObject':currPara, 'tracking':trackOption, 'linesLength':currPara.lines.length, 'paraLeading':paraLeading, 'paraSplitAcrossPage':paraSplitAcrossPage}
                            tightLineCt ++;
                            }//end of IF
                        else {
                            config.baseAlignmentDetails.clmParasForLooseLines[looseLineCt] = {'paraObject':currPara, 'tracking':trackOption, 'linesLength':currPara.lines.length, 'paraLeading':paraLeading, 'paraSplitAcrossPage':paraSplitAcrossPage}
                            looseLineCt ++;
                            }
                        }//end of FOR loop
                    //3. Identifying first and last line of each column
                    var clmFirstLine = currClm.lines.firstItem();
                    if (clmFirstLine.isValid){
                        config["clmFirstLineTopPosition"] = clmFirstLine.baseline - clmFirstLine.ascent;
                        var clmLastLine = currClm.lines.lastItem();
                        var clmLastLineCharacters = clmLastLine.characters;
                        var clmLastLineCharactersLen = clmLastLineCharacters.length;
                        for (var llb = 0; llb < clmLastLineCharactersLen; llb ++){
                            var currChar = clmLastLineCharacters[llb];
                            if (!(currChar.position == 1935831907) && !(currChar.position == 1936749411)){
                                var clmLastLineBase = currChar.baseline;//basline of the last line on the column
                                break;
                                }
                            else if (llb == (clmLastLineCharactersLen - 1)){
                                var clmLastLineBase = clmLastLine.baseline;//basline of the last line on the column
                                }
                            }//end of FOR loop
                        }//end of IF
                    //4. Indentifying to which page column the 'clmsForAlign' has been tied up
                    if (clmFirstLine.isValid){
                        if(currPage.name == '1'){
                            var clmLen = config.openerPageColumns.length;
                            var prevClmnWd = 0;
                            var marginForCalc = config.margin.inside;
                            for (var pcd = 0; pcd < clmLen; pcd ++){
                                    config.openerPageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].gutter, config.margin.top + config.openerPageColumns[pcd].height, marginForCalc + prevClmnWd + config.openerPageColumns[pcd].width + config.openerPageColumns[pcd].gutter];//exculding margin
                                    prevClmnWd = config.openerPageColumns[pcd].width + prevClmnWd + config.openerPageColumns[pcd].gutter;
                                }//end of FOR loop
                            pageClmDetails = floatPlacer.shallowCopy(config.openerPageColumns);
                            }//end of IF
                        else {
                            var clmLen = config.pageColumns.length;
                            var prevClmnWd = 0;
                            var marginForCalc = config.margin.inside;
                            for (var pcd = 0; pcd < clmLen; pcd ++){
                                    config.pageColumns[pcd]["bounds"] = [config.margin.top, marginForCalc + prevClmnWd + config.pageColumns[pcd].gutter, config.margin.top + config.pageColumns[pcd].height, marginForCalc + prevClmnWd + config.pageColumns[pcd].width + config.pageColumns[pcd].gutter];//exculding margin
                                    prevClmnWd = config.pageColumns[pcd].width + prevClmnWd + config.pageColumns[pcd].gutter;
                                }//end of FOR loop
                            pageClmDetails = floatPlacer.shallowCopy(config.pageColumns);
                            }
                        var clmFirstLineStartHzOffset = clmFirstLine.characters.firstItem().insertionPoints[0].horizontalOffset;
                        var clmFirstLineEndHzOffset = clmFirstLine.characters.lastItem().insertionPoints[0].horizontalOffset;
                        var pageClmDetailsLen = pageClmDetails.length;
                        var actClmInd = 0;
                        var pageCurrClmBounds;
                        for (var pc = 0; pc < pageClmDetailsLen; pc ++){
                            pageCurrClmBounds = pageClmDetails[pc].bounds;
                            if (Math.round(clmFirstLineStartHzOffset) >= Math.round(pageCurrClmBounds[1]) && Math.round(clmFirstLineEndHzOffset) <= Math.round(pageCurrClmBounds[3])){//if this codition satisfies then the actual page column index will be 'actClmInd';                           
                                actClmInd = pc;
                                pc = pageClmDetailsLen;
                                }//end of IF
                            }//end of FOR loop
                        }//end of IF
                    if (config.textColumnCountAffects){
                        config.baseAlignmentDetails["currentClmIndex"] = actClmInd;//earlier 'actClmInd' is the variable but has been modified to 'cl' on 13-Dec-2016
                        if (actClmInd == 0){
                            actClmInd = 0;
                            }//end of IF
                        else {
                            actClmInd = actClmInd - 1;
                            }//end of ELSE
                        }
                    else if (cl != actClmInd){
                        config.baseAlignmentDetails["currentClmIndex"] = actClmInd;//earlier 'actClmInd' is the variable but has been modified to 'cl' on 13-Dec-2016
                        cl = actClmInd;
                        }
                    else {
                        actClmInd = actClmInd;
                        config.baseAlignmentDetails["currentClmIndex"] = cl;//earlier 'actClmInd' is the variable but has been modified to 'cl' on 13-Dec-2016
                        }//end of ELSE
                    config.baseAlignmentDetails["clmX1position"] = pageCurrClmBounds[1];//
                    config.baseAlignmentDetails["clmX2position"] = pageCurrClmBounds[3];//
                    //Case 1: To verify the max base line for the column checking whether the current column has floats at the bottom if so the top most float's top bound would excluding its top wrap would be the baseline for that column
                    //Case 2: If there is no float at the bottom for the current column then checking whether the previous float's span to current column, this condition should be upto to very first column
                    var frmIDSpan;
                    if (config.placedFloatsOnPage[actClmInd].bottom.length > 0){//checking whether the current column has float at the bottom (Case 1)
                        var bottomLastFloat = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[config.placedFloatsOnPage[actClmInd].bottom[config.placedFloatsOnPage[actClmInd].bottom.length - 1]].frameID);
                        var bottomLastFloatBounds = bottomLastFloat.geometricBounds;
                        maxBaselinePositionArray[actClmInd] = bottomLastFloatBounds[0] - bottomLastFloat.textWrapPreferences.textWrapOffset[0];
                        }//end of IF
                    else if (config.placedFloatsOnPage[cl].bottom.length == 0 && cl > 0){//Case 2
                        for (var pcf = cl - 1; pcf >=0 ; pcf --){
                            var prevClmBtmFltLen = config.placedFloatsOnPage[pcf].bottom.length;
                            if (prevClmBtmFltLen > 0){
                                var prevClmBtmFlts = config.placedFloatsOnPage[pcf].bottom;
                                for (var pclmF = 0; pclmF < prevClmBtmFltLen; pclmF ++){
                                    var prevClmCurrFltSpn = config.docFloatIDsArray[config.placedFloatsOnPage[pcf].bottom[pclmF]].floatSpanTo;
                                    if (prevClmCurrFltSpn != 0 && (prevClmCurrFltSpn + pcf) == cl){
                                        frmIDSpan = config.docFloatIDsArray[config.placedFloatsOnPage[pcf].bottom[pclmF]].frameID;
                                        break
                                        }//end of IF
                                    }//end of FOR loop
                                }//end of IF
                            }//end of FOR loop
                        if(frmIDSpan != null){
                            var bottomLastFloat = config.currDoc.textFrames.itemByID(frmIDSpan);
                            var bottomLastFloatBounds = bottomLastFloat.geometricBounds;
                            maxBaselinePositionArray[actClmInd] = bottomLastFloatBounds[0] - bottomLastFloat.textWrapPreferences.textWrapOffset[0];
                            }
                        }//end of ELSE IF
                    config.baseAlignmentDetails["actualBase"] = maxBaselinePositionArray[actClmInd];
                    tempClmShortBy = maxBaselinePositionArray[actClmInd] - parseInt(clmLastLineBase*100)/100;
                    if (tempClmShortBy < 0){
                        tempClmShortBy = 0;
                        }
                    config.baseAlignmentDetails["clmShortBy"] = parseInt(tempClmShortBy*100)/100;//**IMPORTANT VALUE**
                    config.baseAlignmentDetails["actualClmShortBy"] = maxBaselinePositionArray[actClmInd] - clmLastLineBase;//**IMPORTANT VALUE**
                    config.baseAlignmentDetails["maxBaseLine"] = maxBaselinePositionArray[actClmInd];
                    //5, Checking whether the last paragraph has been split across columns
                    //to do so checking whether the pargraph index for last line and first line of next coulmn are the same
                    config.baseAlignmentDetails["clmLastParaDetails"] = {};
                    var clmLastLineParaIndex = clmLastLine.paragraphs[0].index;
                    config.baseAlignmentDetails.clmLastParaDetails["index"] = clmLastLineParaIndex;
                    if (currClm.lines.lastItem().leading == 1635019116){
                        var pointSize = currClm.lines.lastItem().pointSize;
                        var autoLeadingValue = currClm.lines.lastItem().autoLeading;
                        config.baseAlignmentDetails.clmLastParaDetails["leading"] = (pointSize * autoLeadingValue)/100;
                        }//end of IF
                    else {
                    config.baseAlignmentDetails.clmLastParaDetails["leading"] = currClm.lines.lastItem().leading;
                        }
                    var nxtClmFirstLineParaIndex = 0;//assuming that the initial first line on next para's index is 0
                    var linesOnCurrClm = new Array ();
                    var linesOnNextClm = new Array ();
                    var paraSplitsAcrossClm = currClm.paragraphs.lastItem();                    
                    var paraSplitsAcrossClmLastLineParentPage = paraSplitsAcrossClm.lines.lastItem().parentTextFrames[0].parentPage.name;                    
                    if ((cl + 1) < clmsForAlignLen){//only if the text's next column is on the same page
                        nxtClmFirstLineParaIndex =  config.currDoc.textFrames.itemByID(currPageFrameID).textColumns[clmsForAlign[cl + 1]].lines.firstItem().paragraphs[0].index;//index of the paragraph on next column top
                        if (nxtClmFirstLineParaIndex == clmLastLineParaIndex){//if this condition is true, then the last paragraph of the column has been split across columns and then for future usage calculating how many lines of the paragraph stay on the current column and how many on next column
                                var paraSplitsAcrossClmLineCtOnCurrClm, paraSplitsAcrossClmLineCtOnNextClm = 0;
                                var paraSplitsAcrossClmLines = paraSplitsAcrossClm.lines;
                                var paraSplitsAcrossClmLinesLen = paraSplitsAcrossClmLines.length;
                                for (var clmPLn = 0; clmPLn < paraSplitsAcrossClmLinesLen; clmPLn ++){
                                    var paraSplitsAcrossClmCurrLnClmIndex = paraSplitsAcrossClmLines[clmPLn].textColumns[0].index;
                                    if ((clmPLn + 1) < paraSplitsAcrossClmLinesLen){
                                        var paraSplitsAcrossClmNextLnClmIndex = paraSplitsAcrossClmLines[clmPLn +1].textColumns[0].index
                                        if (paraSplitsAcrossClmCurrLnClmIndex != paraSplitsAcrossClmNextLnClmIndex){//if this condition is true then the next lines belongs to next column(s);
                                            paraSplitsAcrossClmLineCtOnCurrClm = clmPLn + 1;
                                            paraSplitsAcrossClmLineCtOnNextClm = paraSplitsAcrossClmLinesLen - paraSplitsAcrossClmLineCtOnCurrClm;
                                            }//end of IF
                                        }//end of IF
                                    }//end of FOR loop
                              config.baseAlignmentDetails.clmLastParaDetails["lastParaNoLinesOnCurrClm"] = paraSplitsAcrossClmLineCtOnCurrClm;
                              config.baseAlignmentDetails.clmLastParaDetails["lastParaNoOfLinesOnNextClm"] = paraSplitsAcrossClmLineCtOnNextClm;
                            }//end of IF 
                        else {
                            config.baseAlignmentDetails.clmLastParaDetails["lastParaNoLinesOnCurrClm"] = currClm.paragraphs.lastItem().lines.length;
                            config.baseAlignmentDetails.clmLastParaDetails["lastParaNoOfLinesOnNextClm"] = 0;
                            }//end of ELSE
                        }//end of IF 
                    else if (parseInt(currPageName) < parseInt(paraSplitsAcrossClmLastLineParentPage)){//if the column next page
                            var paraSplitsAcrossClmLineCtOnCurrClm, paraSplitsAcrossClmLineCtOnNextClm = 0;
                            var paraSplitsAcrossClmLines = paraSplitsAcrossClm.lines;
                            var paraSplitsAcrossClmLinesLen = paraSplitsAcrossClmLines.length;
                            for (var clmPLn = 0; clmPLn < paraSplitsAcrossClmLinesLen; clmPLn ++){
                                var paraSplitsAcrossClmCurrLnClmIndex = paraSplitsAcrossClmLines[clmPLn].textColumns[0].index;
                                if ((clmPLn + 1) < paraSplitsAcrossClmLinesLen){
                                    var paraSplitsAcrossClmNextLnClmIndex = paraSplitsAcrossClmLines[clmPLn +1].textColumns[0].index
                                    if (paraSplitsAcrossClmCurrLnClmIndex != paraSplitsAcrossClmNextLnClmIndex){//if this condition is true then the next lines belongs to next column(s);
                                        paraSplitsAcrossClmLineCtOnCurrClm = clmPLn + 1;
                                        paraSplitsAcrossClmLineCtOnNextClm = paraSplitsAcrossClmLinesLen - paraSplitsAcrossClmLineCtOnCurrClm;
                                        }//end of IF
                                    }//end of IF
                                }//end of FOR loop
                          config.baseAlignmentDetails.clmLastParaDetails["lastParaNoLinesOnCurrClm"] = paraSplitsAcrossClmLineCtOnCurrClm;
                          config.baseAlignmentDetails.clmLastParaDetails["lastParaNoOfLinesOnNextClm"] = paraSplitsAcrossClmLineCtOnNextClm;
                        }
                    //6. Details of the paragraph(s) on next column/page that has to be pulled back if possible
                    //To do so we are first checking whether the index of first line on current column and last line of the first pagagraph on the next column are not equal 
                    //If so then keepLinesTogether and keepAllLinesTogether if true then the para might be a head level, then going through next para(s), another calc 'textHeightFromNextClm' made to confirm whether the para(s) could be moved based the clmShortBy area avble 
                    //and also textHeightFromNextClm should be less the clmShortBy value, keep checking the same for rest of the paragraphs until appearance of normal para or the condition textHeightFromNextClm > clmShortBy fails
                    var paraOnNextClm = currClm.paragraphs.lastItem().insertionPoints[-1].paragraphs[0];
                    var textHeightFromNextClm = 0;
                    var paraOnNextClmLinesLen = 0;
                    if (paraOnNextClm.isValid){//
                        var paraOnNextClmFirstLineIndex =  paraOnNextClm.lines.firstItem().textColumns[0].index;                     
                        var paraOnNextClmLastLineIndex =  paraOnNextClm.lines.lastItem().textColumns[0].index; 
                        var paraOnNextClmSpaceAbove = paraOnNextClm.spaceBefore;
                        var paraOnNextClmSpaceBelow = paraOnNextClm.spaceAfter;
                        var resultLeading;
                        //calc leading for the paragraph
                        var paraLeading = calcLeading(paraOnNextClm);
                        paraOnNextClmLinesLen = paraOnNextClm.lines.length;
                        var paraOnNextClmSpn = paraOnNextClm.spanSplitColumnCount.constructor.name;
                        //assuming if the para has keepLinesTogether and keepAllLinesTogether true then the para might be a head level then going through next para(s) and also textHeightFromNextClm should be less the clmShortBy value
                        //and if the condition is true then keep in mind that none of the head level will remain lonely, it will move along with its next para
                        //Ensure whether the last para of the column is not the last para of the chapter/article
                        if (!(currClm.paragraphs.lastItem().index == paraOnNextClm.index)){
                            if (paraOnNextClmFirstLineIndex == paraOnNextClmLastLineIndex && paraOnNextClmSpn == 'Enumerator' && (paraOnNextClm.keepLinesTogether == paraOnNextClm.keepAllLinesTogether == true) && (textHeightFromNextClm < config.baseAlignmentDetails.clmShortBy)){
                                textHeightFromNextClm = paraLeading * paraOnNextClmLinesLen + paraOnNextClmSpaceAbove;
                                var nextPara = paraOnNextClm.insertionPoints[-1].paragraphs[0];
                                if (nextPara.isValid){
                                    textHeightFromNextClm = textHeightFromNextClm + paraOnNextClmSpaceBelow;//only after confirming that the paragraph is a head level then below space will be added to the block height
                                    textHeightFromNextClm = checkNextPara(nextPara, textHeightFromNextClm);
                                    }//end of IF
                                }//end of IF
                            else if (paraOnNextClmSpn == 'Enumerator'){
                                if(paraOnNextClmLinesLen == 1){
                                    textHeightFromNextClm += paraLeading * 3 + paraOnNextClmSpaceAbove;
                                    }//end of IF
                                else if(paraOnNextClmLinesLen == 3){
                                    textHeightFromNextClm += paraLeading * 3 + paraOnNextClmSpaceAbove;
                                    }//end of IF
                                else {
                                    textHeightFromNextClm += paraLeading * 2 + paraOnNextClmSpaceAbove;
                                    }//end of IF                            
                                }//end of ELSE IF
                            //from the details collected above
                            config.baseAlignmentDetails["textHeightFromNextClm"] = textHeightFromNextClm;
                            config.baseAlignmentDetails["paraOnNextColumn"] = {'paraObject':paraOnNextClm, 'paraStyleName':paraOnNextClm.appliedParagraphStyle.name};
                            config.baseAlignmentDetails["paraOnNextColumnLinesLen"] = paraOnNextClmLinesLen;
                            }//end of IF
                        }//end of IF
                    //7. Collecting line details
                    if(config.detailsForVJ.VJallowed){
                        config['linesCollectedForVJ'] = [];
                        var currClmLines = currClm.lines;
                        var currClmLinesLen = currClmLines.length;
                        var stylesExcludedForVJ = String(config.detailsForVJ.stylesExcludedForVJ);
                        var pattern = stylesExcludedForVJ.replace(/,/g, '|');
                        var myRegExp = new RegExp('(' + pattern + ')$');
                        var stylesExcludedForVJLen = 1;
                        for (var ln = 1; ln < currClmLinesLen; ln ++){//excluding first line of the clm
                            var currLine = currClmLines[ln];
                            var currLineParaStyle = currLine.paragraphs[0].appliedParagraphStyle.name;
                            if (!(myRegExp.test(currLineParaStyle)) && !(currLine.leading == 1635019116)){
                                config.linesCollectedForVJ = config.linesCollectedForVJ.concat(currLine);
                                }//end of IF
//~                             else if (myRegExp.test(currLineParaStyle)){//if the lines pstyle matches the VJ's exlude style list then breaking the loop
//~                                 break;
//~                                 }//end of ELSE IF
                            }//end of FOR loop
                        }
                    //A private function to calc the block height of next paragraphs
                    function checkNextPara(nextPara, textHeightFromNextClm){
                        var paraIndex = nextPara.index;
                        var nextParaSpaceAbove = nextPara.spaceBefore;
                        var nextParaSpaceBelow = nextPara.spaceAfter;
                        var nextParaSpn = nextPara.spanSplitColumnCount.constructor.name;
                        var nextParaLeading = calcLeading(nextPara);
                        var nextParaLines = nextPara.lines;
                        var nextParaLinesLen = nextParaLines.length;
                        if (nextParaSpn == 'Enumerator' && (nextPara.keepLinesTogether == nextPara.keepAllLinesTogether == true)){
                            nextPara = nextPara.insertionPoints[-1].paragraphs[0];
                            textHeightFromNextClm += paraLeading * nextParaLinesLen + nextParaSpaceAbove + nextParaSpaceBelow;
                            if (nextPara.isValid){
                                if(!(nextPara.index == paraIndex)){
                                    textHeightFromNextClm = checkNextPara(nextPara, textHeightFromNextClm);
                                    }
                                }//end of IF
                            }//end of IF
                        else if (nextParaSpn == 'Enumerator'){
                            if(nextParaLines == 3){
                                textHeightFromNextClm += nextParaLeading * 3 + nextParaSpaceAbove;
                                }//end of IF
                            else {
                                textHeightFromNextClm += nextParaLeading * 2 + nextParaSpaceAbove;
                                }//end of IF
                            }//end of ELSE IF
                        return textHeightFromNextClm;
                        }//end of function
                    if (config.reduceClmItteration){
                        cl = cl++;
                        clmsForAlignLen = clmsForAlignLen--;
                        config.reduceClmItteration = false;
                        }
                    //Sometimes due to wrong margin value in config or templates, basealigmnet function would run in recurrsive, to break that now we are checking whether config.maxColumnLenForBaseAlignCt is greater than config.maxColumnLenForBaseAlign
                    //then breaking the loop and writing a note saying basealignment has been skipped
                    if (config.maxColumnLenForBaseAlignCt > config.maxColumnLenForBaseAlign){
                        config.baseAlignmentDetails.clmShortBy = 0;
                        cl = clmsForAlignLen;
                        debuggerMSG ("Base alignment is missing for page: " + currPage.name);
                        }
                    //Now parsing the collected value
                    if (!(config.baseAlignmentDetails.clmShortBy == 0)){
                       floatPlacer.events.baseAlignment(config.baseAlignmentDetails, currPageName, clmsForAlign, maxBaselinePositionArray, currPageFrameID, currClm);
                        }//end of IF
                       config.maxColumnLenForBaseAlignCt ++;
                }//end of FOR loop 'clmsForAlign'
        },//end of function 'collectingColumnDetails'
    baseAlignment: function(baseAlignmentDetails, currPageName, clmsForAlign, maxBaselinePositionArray, currPageFrameID, currClm){
        config["columnBaseAligned"] = false;
        var clmShortBy = baseAlignmentDetails.clmShortBy;
        var baseLeading = config.baseLeading;
        var numOfLines = config.baseAlignmentDetails.numOfLinesOnCurrClm;
        var shortBy;//final value need to be adjusted for base align
        var lastLineLeading = config.baseAlignmentDetails.clmLastParaDetails.leading;
        var floatFrmsOnClmLen = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.length + config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top.length;
        var wrapAllTextsAroundFloats = false;
        var adjustSpacingFor = '';
        config["proceedFloatsAdjust"] = false;
        config["proceedHeadSpaceAdjust"] = false;
        config["VJadjustmentProcess"] = false;
        config.shortByValueBalance = clmShortBy;
        /*We are handling base alignments using 4 different options
             OPTION 1: Adjusting space around floats, inclusive distributing space for multiple floats  on the column
             OPTION 2: Adjusting space above/below heading levels, increase or decrease having limitaion (refer config) in percentage
             OPTION 3: Tracking paragraphs - based on the limitation (refer config)
             OPTION 4: Implementation of vertical justification - only if the config allows
             Above are the possible area where we could adjust spaces (increase/decrease) for base align
             As per dicussion made on 13-Feb-2017, we have came up cases for base alignments, see it listed below
             Case 1: If the clm has less than minimum no of lines (say 3 lines or 4 lines) on the page and float(s) are there then swap all text out from the column
             Case 2: If the 'clmShortBy' value is lesser than last paragraph's leading then we are distributing the space in incremental order in the sequence OPTION  1, OPTION 2 and OPTION 4, this condition if the last para of the frame continued to next column or not continue
             Case 3: If the last paragraph doesn't continue to next column and the 'clmShortBy' is equal to last line height then (a) we are distributing the space in incremental order in the sequence OPTION  1 and OPTION 2. 
                            (b) If the value fully distributed then trying OPTION 3 but then the logic here is if we apply OPTION 3 then no need for OPTION 1 or OPTION 2. (3) If no possiblity for OPTION 3 then need to try OPTION 4
             Case 4: If last para doesn't continue to next column and  'clmShortBy' value is greater than last line's leading but lesser than or equal to twice its leading then (a) we are distributing the space in incremental order in the sequence OPTION  1 and OPTION 2. 
                            (b) If fails do OPTION 3 for any one of the paragraphs and again check for possiblity of OPTION 1, OPTION 2. (c) If still fails, would add OPTION 4 additionally based on the requirement 
             Case 5: At last there would be one situation where there will be more space for 'clmShortBy', that is greater than twice the leading, then the base align condition would follow as below or the last way to do base align
                            INCREMENTAL: (a) Go for OPTION 1, OPTION 2 and OPTION 4
                                                           (b) If the above condition would not work use OPTION 3 and gain a max of 2 lines on the column (can be decided after receiving the amount of sapce for OPTION 3) and then apply OPTION 1, OPTION 2 and OPTION 4 based on requirement
                                                            And if none of the case works, then should go for DECREMENTAL values
                            DECREMENTAL: The amount of space required to decerement would be the difference of height of block of text from next column, for e.g, if the amount of short on current column is 30 pt and height of text that could be gained from next column is 50 pt,
                                                            then the amount of the space is 50 - 30 = 20 pt.
                                                            (a) Distribute the space in decremental for OPTION 1 and OPTION 2.
                                                            (b) If still not working could use OPTION 3 first to track a couple of paragraph to gain couple of lines and then go with OPTION 1 and OPTION 2. Note: OPTION 4 should not be used for decremental values
            */
        if (numOfLines < config.minNoLinesOnPag && floatFrmsOnClmLen > 0){//Case 1
            wrapAllTextsAroundFloats = true;
            adjustSpacingFor = 'increment'
            clmShortBy = (lastLineLeading * numOfLines) + clmShortBy;
            adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
            config.reduceClmItteration = true;
            }//end of IF
        else if (clmShortBy < lastLineLeading){//Case 2
            wrapAllTextsAroundFloats = false;
            adjustSpacingFor = 'increment'
            //===================================================================
            if(floatFrmsOnClmLen > 0 && (config.lastPageTextFrameAdjusted == false)){//if no of floats on the clm is greater than 0, proceeding further
                adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                if (config.proceedFloatsAdjust){//if proceedFloatsAdjust is true then there might be some balance space available for headlevel adjustment or for the further space adjusment
                    adjustingHeadlevels(config.shortByValueBalance, lastLineLeading, adjustSpacingFor);
                    if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                        VJadjustment(config.shortByValueBalance);
                        if(config.shortByValueBalance == 0) {
                        config.proceedFloatsAdjust = true;
                        config.proceedHeadSpaceAdjust = true;
                        }//end of IF
                        else {
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }
                        }//end of IF
                    }//end of IF
                }//end of IF
            else {//if there is no floats then proceed with head level adjustment
                adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor);
                if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                    VJadjustment(config.shortByValueBalance);
                    if(config.shortByValueBalance == 0) {
                    config.proceedHeadSpaceAdjust = true;
                    }//end of IF
                    else {
                        config.proceedHeadSpaceAdjust = false;
                        }
                    }//end of IF
                }//end of ELSE
            //====================Reprocess adjustment===========================
            //Now adjustingFloatsSpaces and adjustingHeadlevels only if "shortByValueBalance" is 0
            if (config.shortByValueBalance == 0){
                if (config.proceedFloatsAdjust){
                    adjustingFloatsSpaces(numOfLines, config.floatsMaxSpaceToBeAdjusted, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                    }//end of IF
                if (config.proceedHeadSpaceAdjust){
                    adjustParaSpace(config.headLevelToBeDistributed, config.headlevelMaxSpaceCanAdjust, adjustSpacingFor)
                    }//end of IF
                }
            //=====================================================================
            }//end of IF
        else if (clmShortBy == lastLineLeading){//Case 3
            wrapAllTextsAroundFloats = false;
            adjustSpacingFor = 'increment'
            var parasForTracking = config.baseAlignmentDetails.clmParasForLooseLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
            var trackingLimitation = config.trackingLimit.maximum;
            var trackParaCt = 1;
            config.trackedParasCt = 0;
            var checkLastLineLeading = true;//if this condition is true then while tracking we are not last line's leading the current para's leading
            //======================================================================
            if(floatFrmsOnClmLen > 0 && (config.lastPageTextFrameAdjusted == false)){//if no of floats on the clm is greater than 0, proceeding further
                adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                if (config.proceedFloatsAdjust){//if proceedFloatsAdjust is true then there might be some balance space available for headlevel adjustment or for the further space adjusment
                    adjustingHeadlevels(config.shortByValueBalance, lastLineLeading, adjustSpacingFor);
                    if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                        config.returnTrackingResult = false;
                        trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                        if (config.returnTrackingResult){
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }
                        else if (!config.returnTrackingResult && config.baseAlignmentDetails.clmLastParaDetails.lastParaNoOfLinesOnNextClm > 1){
                            parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt))
                            config.returnTrackingResult = false;
                            trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                            if (config.returnTrackingResult){//if true then assigning null the float and headlevels 
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of IF
                            else {
                                VJadjustment(config.shortByValueBalance);
                                if(config.shortByValueBalance == 0) {
                                config.proceedFloatsAdjust = true;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of IF
                                else {
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }
                                }//end of ELSE
                            }//end of ELSE IF
                        else {
                            VJadjustment(config.shortByValueBalance);
                            if(config.shortByValueBalance == 0) {
                            config.proceedFloatsAdjust = true;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of IF
                            else {
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }
                            }
                        }//end of IF
                    else {//after the adjusting headlevel resetting to do float adjust
                        config.proceedFloatsAdjust = true;
                        }//end of IF
                    }//end of IF
                }//end of IF
            else {//if there is no floats then proceed with head level adjustment
                adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor);
                if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                    config.returnTrackingResult = false;
                    trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                    if (config.returnTrackingResult){
                        config.shortByValueBalance = 0;
                        config.proceedFloatsAdjust = false;
                        config.proceedHeadSpaceAdjust = false;
                        }//end of IF
                    else if (!config.returnTrackingResult){
                        parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt))
                        config.returnTrackingResult = false;
                        trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                        if (config.returnTrackingResult){
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }
                        else {
                            VJadjustment(config.shortByValueBalance);
                            if(config.shortByValueBalance == 0) {
                            config.proceedFloatsAdjust = true;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of IF
                            else {
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }
                            }//end of ELSE
                        }//end of ELSE IF
                    else {
                        VJadjustment(config.shortByValueBalance);
                        if(config.shortByValueBalance == 0) {
                        config.proceedFloatsAdjust = true;
                        config.proceedHeadSpaceAdjust = true;
                        }//end of IF
                        else {
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }//end of ELSE
                        }//end of ELSE
                    }//end of IF
                }//end of ELSE
            //====================Reprocess adjustment===========================
            //Now adjustingFloatsSpaces and adjustingHeadlevels only if "shortByValueBalance" is 0
            if (config.shortByValueBalance == 0){
                if (config.proceedFloatsAdjust){
                    adjustingFloatsSpaces(numOfLines, config.floatsMaxSpaceToBeAdjusted, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                    }//end of IF
                if (config.proceedHeadSpaceAdjust){
                    adjustParaSpace(config.headLevelToBeDistributed, config.headlevelMaxSpaceCanAdjust, adjustSpacingFor)
                    }//end of IF
                }//end of IF
            //=====================================================================            
            }//end of ELSE IF
        else if (clmShortBy > lastLineLeading && (clmShortBy <= 2*lastLineLeading)){//Case 4
            wrapAllTextsAroundFloats = false;
            adjustSpacingFor = 'increment'
            var parasForTracking = config.baseAlignmentDetails.clmParasForLooseLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
            var trackingLimitation = config.trackingLimit.maximum;
            var trackParaCt = 2;
            config.trackedParasCt = 0;
            var poitiveTrackStatus = false;//setting a flag for 
            var checkLastLineLeading = true;//if this condition is true then while tracking we are not last line's leading the current para's leading
            //======================================================================
            if(floatFrmsOnClmLen > 0 && (config.lastPageTextFrameAdjusted == false)){//if no of floats on the clm is greater than 0, proceeding further
                adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                if (config.proceedFloatsAdjust){//if proceedFloatsAdjust is true then there might be some balance space available for headlevel adjustment or for the further space adjusment
                    adjustingHeadlevels(config.shortByValueBalance, lastLineLeading, adjustSpacingFor);
                    if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                        if (config.shortByValueBalance == 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                            trackParaCt = trackParaCt;
                            }//end of IF
                        else {
                            trackParaCt = 1;
                            }//end of ELSE
                        var spaceBeforeTracking = config.shortByValueBalance;
                        config.returnTrackingResult = false;
                        trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                        if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }//end of IF
                        else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                            //======================================================================================
                            //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                            var tempClmShortByValue = clmShortBy;
                            var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                            //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                            if ((tempClmShortByValue - lastLineLeading) > totalSpaceTakenSoFar){
                                config.shortByValueBalance = tempClmShortByValue - (lastLineLeading + totalSpaceTakenSoFar);
                                }//end of IF
                            else if (totalSpaceTakenSoFar > lastLineLeading){
                                config.shortByValueBalance = clmShortBy - totalSpaceTakenSoFar; 
                                trackedParas = config.trackedParas;
                                revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                }//end of ELSE IF
                            else if ((tempClmShortByValue - lastLineLeading) < totalSpaceTakenSoFar){
                                config.shortByValueBalance = 0;
                                config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (lastLineLeading + config.floatsMaxSpaceToBeAdjusted);
                                config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                }//end of ELSE IF
                            else {
                                if (config.headlevelMaxSpaceCanAdjust == undefined && config.floatsMaxSpaceToBeAdjusted > 0){
                                    config.floatsMaxSpaceToBeAdjusted = clmShortBy - config.lastTrackedParaLeading;
                                    config.shortByValueBalance = 0;
                                    }
                                else {
                                    config.shortByValueBalance = 0;
                                    }
                                }
                            //======================================================================================
                            if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                VJadjustment(config.shortByValueBalance);
                                //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                if (config.shortByValueBalance == 0){
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }
                                else {
                                    trackedParas = config.trackedParas;
                                    revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }//end of ELSE
                                }//end of IF
                            else {
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = true;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of ELSE
                            }//end of ELSE IF
                        else if (!config.returnTrackingResult && config.baseAlignmentDetails.clmLastParaDetails.lastParaNoOfLinesOnNextClm > 1){
                            if (config.shortByValueBalance == 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                                trackParaCt = trackParaCt;
                                }//end of IF
                            else {
                                trackParaCt = 1;
                                }//end of ELSE
                            parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
                            config.returnTrackingResult = false;
                            trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                            if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of IF
                            else if (config.returnTrackingResult && config.trackedParasCt == 1){//still there are some space to be distributed
                                //======================================================================================
                                //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                                var tempClmShortByValue = clmShortBy;
                                var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                                //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                                if ((tempClmShortByValue - lastLineLeading) > totalSpaceTakenSoFar){
                                    config.shortByValueBalance = tempClmShortByValue - (lastLineLeading + totalSpaceTakenSoFar);
                                    }//end of IF
                                else if ((tempClmShortByValue - lastLineLeading) < totalSpaceTakenSoFar){
                                    config.shortByValueBalance = 0;
                                    if ((tempClmShortByValue - lastLineLeading) < config.floatsMaxSpaceToBeAdjusted){
                                        config.floatsMaxSpaceToBeAdjusted = tempClmShortByValue - lastLineLeading;
                                        }//end of IF
                                    else {
                                        config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (lastLineLeading + config.floatsMaxSpaceToBeAdjusted);
                                        config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                        }//end of ELSE
                                    }//end of ELSE IF
                                else {
                                    config.shortByValueBalance = 0;
                                    }
                                //======================================================================================
                                if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = true;
                                        config.proceedHeadSpaceAdjust = true;
                                        }//end fof 
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                    }//end of IF
                                else {
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end of ELSE
                                }//end of IF
                            else {
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of ELSE
                            }//end of ELSE IF
                        else {
                            VJadjustment(config.shortByValueBalance);
                            //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                            if (config.shortByValueBalance == 0){
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = true;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of IF
                            else {
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of ELSE
                            }//end of ELSE
                        }//end of IF
                    else {//after the adjusting headlevel resetting to do float adjust
                        config.proceedFloatsAdjust = true;
                        }//end of IF
                    }//end of IF
                }//end of IF
            else {//if there is no floats then proceed with head level adjustment
                adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor);
                if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                    if (config.shortByValueBalance == 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                        trackParaCt = trackParaCt;
                        }//end of IF
                    else {
                        trackParaCt = 1;
                        }//end of ELSE
                    var spaceBeforeTracking = config.shortByValueBalance;
                    config.returnTrackingResult = false;
                    trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                    if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                        config.shortByValueBalance = 0;
                        config.proceedFloatsAdjust = false;
                        config.proceedHeadSpaceAdjust = false;
                        }//end of IF
                    else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                        //======================================================================================
                        //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                        var tempClmShortByValue = clmShortBy;
                        if (config.headlevelMaxSpaceCanAdjust == undefined){
                            var totalSpaceTakenSoFar = 0;
                            }
                        else {
                            var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                            }
                        //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                        if ((tempClmShortByValue - lastLineLeading) > totalSpaceTakenSoFar){
                            config.shortByValueBalance = tempClmShortByValue - (lastLineLeading + totalSpaceTakenSoFar);
                            }//end of IF
                        else if ((tempClmShortByValue - lastLineLeading) < totalSpaceTakenSoFar){
                            config.shortByValueBalance = 0;
                            config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - lastLineLeading;
                            }//end of ELSE IF
                        else {
                            config.shortByValueBalance = 0;
                            }
                        //======================================================================================
                        if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                            VJadjustment(config.shortByValueBalance);
                            //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                            if (config.shortByValueBalance == 0){
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = true;
                                }
                            else {
                                trackedParas = config.trackedParas;
                                revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of ELSE
                            }//end of IF
                        else {
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of ELSE
                        }//end of ELSE IF
                    else if (!config.returnTrackingResult && config.baseAlignmentDetails.clmLastParaDetails.lastParaNoOfLinesOnNextClm > 1){
                        if (config.shortByValueBalance == 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                            trackParaCt = trackParaCt;
                            }//end of IF
                        else {
                            trackParaCt = 1;
                            }//end of ELSE
                        parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
                        config.returnTrackingResult = false;
                        trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                        if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }//end of IF
                        else if (config.returnTrackingResult && config.trackedParasCt == 1){//still there are some space to be distributed
                        //======================================================================================
                        //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                        var tempClmShortByValue = clmShortBy;
                        var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                        //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                        if ((tempClmShortByValue - lastLineLeading) > totalSpaceTakenSoFar){
                            config.shortByValueBalance = tempClmShortByValue - (lastLineLeading + totalSpaceTakenSoFar);
                            }//end of IF
                        else if ((tempClmShortByValue - lastLineLeading) < totalSpaceTakenSoFar){
                            config.shortByValueBalance = 0;
                            config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - lastLineLeading;
                            }//end of ELSE IF
                        else {
                            config.shortByValueBalance = 0;
                            }
                        //======================================================================================
                            if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                VJadjustment(config.shortByValueBalance);
                                //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                if (config.shortByValueBalance == 0){
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end fof 
                                else {
                                    trackedParas = config.trackedParas;
                                    revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }//end of ELSE
                                }//end of IF
                            else {
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of ELSE
                            }//end of IF
                        else {
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }//end of ELSE
                        }//end of ELSE IF
                    else {
                        VJadjustment(config.shortByValueBalance);
                        //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                        if (config.shortByValueBalance == 0){
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = true;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of IF
                        else {
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = false;
                            }//end of ELSE
                        }//end of ELSE
                    }//end of IF
                }//end of ELSE
            //====================Reprocess adjustment===========================
            //Now adjustingFloatsSpaces and adjustingHeadlevels only if "shortByValueBalance" is 0
            if (config.shortByValueBalance == 0){
                if (config.proceedFloatsAdjust){
                    adjustingFloatsSpaces(numOfLines, config.floatsMaxSpaceToBeAdjusted, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                    }//end of IF
                if (config.proceedHeadSpaceAdjust){
                    adjustParaSpace(config.headLevelToBeDistributed, config.headlevelMaxSpaceCanAdjust, adjustSpacingFor)
                    }//end of IF
                }//end of IF
            //=====================================================================            
            }//end of ELSE IF
        else if (clmShortBy <= 4*lastLineLeading ){//Case 5
            wrapAllTextsAroundFloats = false;
            adjustSpacingFor = 'increment';
            var parasForTracking = config.baseAlignmentDetails.clmParasForLooseLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
            var trackingLimitation = config.trackingLimit.maximum;
            var trackParaCt = 2;
            config.trackedParasCt = 0;
            var poitiveTrackStatus = false;//setting a flag for 
            var checkLastLineLeading = false;//if this condition is true then while tracking we are not last line's leading the current para's leading
            //=======================Start of incremental method==============================
            if(floatFrmsOnClmLen > 0 && (config.lastPageTextFrameAdjusted == false)){//if no of floats on the clm is greater than 0, proceeding further
                adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                if (config.proceedFloatsAdjust){//if proceedFloatsAdjust is true then there might be some balance space available for headlevel adjustment or for the further space adjusment
                    adjustingHeadlevels(config.shortByValueBalance, lastLineLeading, adjustSpacingFor);
                    if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                        if (clmShortBy >= 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                            trackParaCt = trackParaCt;
                            }//end of IF
                        else {
                            trackParaCt = 1;
                            }//end of ELSE
                        var spaceBeforeTracking = config.shortByValueBalance;
                        config.returnTrackingResult = false;
                        trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                        if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                            //======================================================================================
                            //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                            var tempClmShortByValue = clmShortBy;
                            var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                            if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                }//end of IF
                            else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                config.shortByValueBalance = 0;
                                config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.floatsMaxSpaceToBeAdjusted);
                                config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                }//end of ELSE IF
                            //======================================================================================
                            if(!(config.shortByValueBalance == 0)){//column base aligned after two paragraphs were tracked
                                VJadjustment(config.shortByValueBalance);
                                //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                if (config.shortByValueBalance == 0){
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end fof 
                                else {
                                    trackedParas = config.trackedParas;
                                    revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }//end of ELSE
                                }//end of IF
                            else {
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = true;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of ELSE
                            }//end of IF
                        else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                            //======================================================================================
                            //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                            var tempClmShortByValue = clmShortBy;
                            var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                            //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                            if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                }//end of IF
                            else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                config.shortByValueBalance = 0;
                                config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.floatsMaxSpaceToBeAdjusted);
                                config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                }//end of ELSE IF
                            //======================================================================================
                            if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                VJadjustment(config.shortByValueBalance);
                                //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                if (config.shortByValueBalance == 0){
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }
                                else {
                                    trackedParas = config.trackedParas;
                                    revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }//end of ELSE
                                }//end of IF
                            else {
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = true;
                                config.proceedHeadSpaceAdjust = true;
                                }//end of ELSE
                            }//end of ELSE IF
                        else if (!config.returnTrackingResult && config.shortByValueBalance != 0){
                                VJadjustment(config.shortByValueBalance);
                                //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                if (config.shortByValueBalance == 0){
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end fof 
                                else {
                                    trackedParas = config.trackedParas;
                                    revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = false;
                                    }//end of ELSE
                            }//end of ELSE IF
                        }//end of IF
                    }//end of IF
                }//end of IF
            else {//adjusting head level spaces
                adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor);
                if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                    if (clmShortBy >= 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                        trackParaCt = trackParaCt;
                        }//end of IF
                    else {
                        trackParaCt = 1;
                        }//end of ELSE
                    var spaceBeforeTracking = config.shortByValueBalance;
                    config.returnTrackingResult = false;
                    trackingParagraphs(parasForTracking, trackingLimitation, '+', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                    if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                        //======================================================================================
                        //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                        var tempClmShortByValue = clmShortBy;
                        var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                        if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                            config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                            }//end of IF
                        else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                            config.shortByValueBalance = 0;
                            config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.headlevelMaxSpaceCanAdjust);
                            }//end of ELSE IF
                        //======================================================================================
                        if(!(config.shortByValueBalance == 0)){//column base aligned after two paragraphs were tracked
                            VJadjustment(config.shortByValueBalance);
                            //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                            if (config.shortByValueBalance == 0){
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = true;
                                }//end fof 
                            else {
                                trackedParas = config.trackedParas;
                                revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of ELSE
                            }//end of IF
                        else {
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of ELSE
                        }//end of IF
                    else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                        //======================================================================================
                        //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                        var tempClmShortByValue = clmShortBy;
                        if (config.headlevelMaxSpaceCanAdjust == undefined){
                            var totalSpaceTakenSoFar = 0;
                            }
                        else {
                            var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                            }
                        //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                        if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                            config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                            }//end of IF
                        else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                            config.shortByValueBalance = 0;
                            config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - config.spaceTakenForLeading;
                            }//end of ELSE IF
                        //======================================================================================
                        if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                            VJadjustment(config.shortByValueBalance);
                            //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                            if (config.shortByValueBalance == 0){
                                config.shortByValueBalance = 0;
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = true;
                                }
                            else {
                                trackedParas = config.trackedParas;
                                revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                config.proceedFloatsAdjust = false;
                                config.proceedHeadSpaceAdjust = false;
                                }//end of ELSE
                            }//end of IF
                        else {
                            config.shortByValueBalance = 0;
                            config.proceedFloatsAdjust = false;
                            config.proceedHeadSpaceAdjust = true;
                            }//end of ELSE
                        }//end of ELSE IF               
                }//end of ELSE IF
            }//end of ELSE
            //====================End of incremental method================================
            //====================Start of decremental method================================
            if (!(config.shortByValueBalance == 0)){
                adjustSpacingFor = 'decrement';
                parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
                config.returnTrackingResult = false;
                }//end of IF
            if (adjustSpacingFor == 'decrement' && !(config.shortByValueBalance == 0)){//still paragraphs were not aligned
                config.proceedFloatsAdjust = false;
                config.proceedHeadSpaceAdjust = false;
                clmShortBy = config.baseAlignmentDetails.textHeightFromNextClm - clmShortBy;
                config.shortByValueBalance = clmShortBy;
                if(floatFrmsOnClmLen > 0){//if no of floats on the clm is greater than 0, proceeding further
                    adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);                   
                    if (config.proceedFloatsAdjust){//if proceedFloatsAdjust is true then there might be some balance space available for headlevel adjustment or for the further space adjusment
                        adjustingHeadlevels(config.shortByValueBalance, lastLineLeading, adjustSpacingFor);
                        if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                            if (config.shortByValueBalance >= 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                                trackParaCt = trackParaCt;
                                }//end of IF
                            else {
                                trackParaCt = 1;
                                }//end of ELSE
                            var spaceBeforeTracking = config.shortByValueBalance;
                            config.returnTrackingResult = false;
                            trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                            if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                                //======================================================================================
                                //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                                var tempClmShortByValue = clmShortBy;
                                var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                                if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                    config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                    }//end of IF
                                else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                    config.shortByValueBalance = 0;
                                    config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.floatsMaxSpaceToBeAdjusted);
                                    config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                    }//end of ELSE IF
                                //======================================================================================
                                if(!(config.shortByValueBalance == 0)){//column base aligned after two paragraphs were tracked
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = true;
                                        config.proceedHeadSpaceAdjust = true;
                                        }//end fof 
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                    }//end of IF
                                else {
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end of ELSE
                                }//end of IF
                            else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                                //======================================================================================
                                //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                                var tempClmShortByValue = clmShortBy;
                                var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust + config.floatsMaxSpaceToBeAdjusted;
                                //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                                if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                    config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                    }//end of IF
                                else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                    config.shortByValueBalance = 0;
                                    config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.floatsMaxSpaceToBeAdjusted);
                                    config.floatsMaxSpaceToBeAdjusted = config.floatsMaxSpaceToBeAdjusted;
                                    }//end of ELSE IF
                                //======================================================================================
                                if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = true;
                                        config.proceedHeadSpaceAdjust = true;
                                        }
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                    }//end of IF
                                else {
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = true;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end of ELSE
                                }//end of ELSE IF
                            else if (!config.returnTrackingResult && config.shortByValueBalance != 0){
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = true;
                                        config.proceedHeadSpaceAdjust = true;
                                        }//end fof 
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                }//end of ELSE IF
                            }//end of IF
                        }//end of IF                                        
                    }//end of IF                
                    else {//adjusting head level spaces
                        adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor);
                        if (config.proceedHeadSpaceAdjust || config.shortByValueBalance != 0){//still there are some space to be distributed
                            parasForTracking = config.baseAlignmentDetails.clmParasForTightLines.sort(multiDiArraySortBy('linesLength', true, parseInt));
                            if (config.shortByValueBalance >= 2*lastLineLeading){//checking whether the still the shortByValue is equal twice the last line leading 
                                trackParaCt = trackParaCt;
                                }//end of IF
                            else {
                                trackParaCt = 1;
                                }//end of ELSE
                            var spaceBeforeTracking = config.shortByValueBalance;
                            config.returnTrackingResult = false;
                            trackingParagraphs(parasForTracking, trackingLimitation, '-', trackParaCt, lastLineLeading, checkLastLineLeading, config.trackedParasCt);
                            if (config.returnTrackingResult && config.trackedParasCt == 2){//if the result is true then two paragraphs have been tracked and the base alignment is reached
                                //======================================================================================
                                //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                                var tempClmShortByValue = clmShortBy;
                                var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                                if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                    config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                    }//end of IF
                                else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                    config.shortByValueBalance = 0;
                                    config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - (config.spaceTakenForLeading + config.headlevelMaxSpaceCanAdjust);
                                    }//end of ELSE IF
                                //======================================================================================
                                if(!(config.shortByValueBalance == 0)){//column base aligned after two paragraphs were tracked
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = true;
                                        }//end fof 
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                    }//end of IF
                                else {
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end of ELSE
                                }//end of IF
                            else if (config.returnTrackingResult && config.trackedParasCt == 1){//if this is true then proceed further for VJ if required
                                //======================================================================================
                                //Then have to check first whether after tracking the space already shared for floats and headlevel would change
                                var tempClmShortByValue = clmShortBy;
                                var totalSpaceTakenSoFar = config.headlevelMaxSpaceCanAdjust;
                                //To do so check whether the shortByValueBalance is equal to or less than space avbl after reducing lastLineLeading in tempClmShortByValue is equal to or greater or lesser or equal than totalSpaceTakenSoFar
                                if ((tempClmShortByValue - config.spaceTakenForLeading) > totalSpaceTakenSoFar){
                                    config.shortByValueBalance = tempClmShortByValue - (config.spaceTakenForLeading + totalSpaceTakenSoFar);
                                    }//end of IF
                                else if ((tempClmShortByValue - config.spaceTakenForLeading) < totalSpaceTakenSoFar){
                                    config.shortByValueBalance = 0;
                                    config.headlevelMaxSpaceCanAdjust = tempClmShortByValue - config.spaceTakenForLeading;
                                    }//end of ELSE IF
                                //======================================================================================
                                if (config.shortByValueBalance != 0){//still there are some space to be distributed trying VJ
                                    VJadjustment(config.shortByValueBalance);
                                    //checking the balance space has been distributed, if true breaking the loop but if but if not reverting the tracked para(s)
                                    if (config.shortByValueBalance == 0){
                                        config.shortByValueBalance = 0;
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = true;
                                        }
                                    else {
                                        trackedParas = config.trackedParas;
                                        revertTrack(trackedParas);//the loop breaks down the line here for positive track
                                        config.proceedFloatsAdjust = false;
                                        config.proceedHeadSpaceAdjust = false;
                                        }//end of ELSE
                                    }//end of IF
                                else {
                                    config.shortByValueBalance = 0;
                                    config.proceedFloatsAdjust = false;
                                    config.proceedHeadSpaceAdjust = true;
                                    }//end of ELSE
                                }//end of ELSE IF               
                        }//end of ELSE IF
                    }//end of ELSE
                }//end of IF
            //====================End of decremental method================================
            //====================Reprocess adjustment===========================
            //Now adjustingFloatsSpaces and adjustingHeadlevels only if "shortByValueBalance" is 0
            if (config.shortByValueBalance == 0){
                if (config.proceedFloatsAdjust){
                    adjustingFloatsSpaces(numOfLines, config.floatsMaxSpaceToBeAdjusted, baseLeading, lastLineLeading, config.baseAlignmentDetails.currentClmIndex, wrapAllTextsAroundFloats, adjustSpacingFor, config.proceedFloatsAdjust);
                    }//end of IF
                if (config.proceedHeadSpaceAdjust){
                    adjustParaSpace(config.headLevelToBeDistributed, config.headlevelMaxSpaceCanAdjust, adjustSpacingFor)
                    }//end of IF
                }//end of IF
            //=====================================================================                        
        }//end of IF
       },//end of function 'baseAlignment'
//Box placing function
        placingBoxLib: function(myDoc, respectiveFloat, currPage, wrapTop, wrapLeft, wrapBottom, wrapRight, figPageNumber, currCitation){
            config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
            var allLib = app.libraries;
            var allLibLen = allLib.length;
            for (var lb = allLibLen - 1; lb >= 0; lb --){
                var closeLib = allLib[lb].close();//closing all opened libraries
                }
            var libVar = myDoc.textVariables.item("LIB_NAME");
            if (libVar.isValid){
                var libVarName = libVar.variableOptions.contents;//library name
                var libFilePath = File(layerTemplateScript+ "\\" + libVarName +".indl");
                if (libFilePath.exists){
                    currLib = app.open(libFilePath);
                    }//end of IF
                }//end of IF              
                var currBoxBlock = respectiveFloat[0];
                var boxType = currBoxBlock.xmlAttributes.itemByName("data-type").value;
                myDoc.pages[0].textFrames[0].select();
                //var tempFrame = myDoc.pages[0].textFrames.add({geometricBounds:[0,0,10,10]});//this temp text frame is added to change the text selection mode of cursor to object selection mode 
                if ((typeof(currLib) === 'undefined') || (currLib.assets.item(boxType).isValid == false)){
                    floatPlacerError = "Error: Please update Box type (" + boxType + ") in template\tfailed\t0";
                    exit();
                    }
                var currLibItem = currLib.assets.item(boxType).placeAsset(myDoc);
                currLibItem[0].move (currPage);
//~                 tempFrame.remove();
                if (parseInt(figPageNumber)%2 == 0){//verso pages
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                currLibItem[0].move ([config.geoBoundsVerso[1] - config.pageSize.width, config.geoBoundsVerso[0]]);
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                }
                else{//recto pages
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                currLibItem[0].move ([config.geoBoundsRecto[1] + config.pageSize.width, config.geoBoundsRecto[0]]);
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                }        
                var currBoxBlockPage = currPage;
                var currMoveObj, diffInPosition, TCHContFrmBoundsBefore, TCHContFrmBoundsAfter, TCHContFrm, TCContFrm, TCContFrmBoundsBefore, TCContFrmBoundsAfter;
                var currContFrm;
                var movingObj = currLibItem[0].pageItems;
                var movingObjLen = movingObj.length;
                var currBoxBlockPageName = currPage;
                var captionPara;
                try{
                var frmFirstParaStyle = respectiveFloat[0].xmlElements[0].xmlAttributes.itemByName("pstyle").value;}catch(e){}
                //By default first paragraph item for the will be moved to header container
                for (var mov = 0; mov < movingObjLen; mov ++){
                    if(movingObj[mov].label == 'TEXT_CONTAINER_HEAD'){
                        var currBoxBlockFirstPara = currBoxBlock.xmlItems[0];
                        TCHContFrm = movingObj[mov];
                        TCHContFrmBoundsBefore = TCHContFrm.geometricBounds;
                        TCHContFrm.placeXML(currBoxBlockFirstPara);
                        TCHContFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY; //Fix Text Frame Height here.          
                        myDoc.recompose();
                        }//end of if 
                    else if(movingObj[mov].label == 'TEXT_CONTAINER'){
                        TCContFrm = movingObj[mov];
                        TCContFrmBoundsBefore = TCContFrm.geometricBounds;
                        TCContFrm.placeXML(currBoxBlock);
                        myDoc.recompose();
                        TCContFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY; //Fix Text Frame Height here. 
                        myDoc.recompose();
                    }//end of ELS E IF
                }//end of FOR loop
                //checking empty paragraphs in frames after text has been moved
                for (var cl = 0; cl < movingObjLen; cl ++){
                    var currFrm = movingObj[cl];
                    var frmParaLen = currFrm.paragraphs.length;
                    var frmFirstPara = currFrm.paragraphs.firstItem();
                    if(!(frmFirstParaStyle == undefined)){
                        frmFirstPara.appliedParagraphStyle = config.currDoc.paragraphStyles.itemByName(frmFirstParaStyle);
                        }//end of IF
                    var frmLastPara = currFrm.paragraphs.lastItem();
                    var frmLastParaStyle = frmLastPara.appliedParagraphStyle.name;
                    if (frmParaLen > 1){
                        var frmPenultPara = currFrm.paragraphs[frmParaLen-2];
                        var frmPenultParaStyle = frmPenultPara.appliedParagraphStyle.name;
                        var frmSecondPara = currFrm.paragraphs[1];
                        var frmSecondParaStyle = frmSecondPara.appliedParagraphStyle.name;
                        }//end of IF
                    var firstChar = frmFirstPara.characters[0];
                    var secondChar = frmFirstPara.characters[1].contents;
                    if (frmLastPara.characters.lastItem().contents == '\r'){
                        frmLastPara.characters.lastItem().contents = "";
                        frmLastPara.appliedParagraphStyle = frmLastParaStyle;                            
                        }//end of IF
                    else if (frmParaLen > 1){
                        if (frmPenultPara.characters.lastItem().contents == '\r'){
                            frmPenultPara.characters.lastItem().contents = "";
                            frmPenultPara.appliedParagraphStyle = frmPenultParaStyle;                            
                            }
                        }//end of ELSE IF
                    if((/\s/).test(firstChar) && (secondChar == '\r') && (typeof(frmSecondParaStyle) != 'undefined')){
                        frmFirstPara.characters.lastItem().contents = '';
                        frmFirstPara.appliedParagraphStyle = myDoc.paragraphStyles.itemByName(frmSecondParaStyle);
                        }//end of IF
                    }//end of FOR loop
                // ============updating glyphs===================
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                var tempBound = currLibItem[0].geometricBounds;
                currLibItem[0].move(currPage);
                var grpPageItems = currLibItem[0].allPageItems;
                var grpPageItemsLen = grpPageItems.length;
                for (var gf = 0; gf < grpPageItemsLen; gf ++){
                    currTextFrameObjectForGlyphSearch = grpPageItems[gf];
                    if (currTextFrameObjectForGlyphSearch instanceof TextFrame){
                        app.doScript(File(layerTemplateScript + "\\"+ "missingGlyph.jsx"), ScriptLanguage.javascript, [layerTemplateScript, currTextFrameObjectForGlyphSearch]);
                        _math_cstyle_apply_and_remove_overlap();
                        }
                    }
                currLibItem[0].move([tempBound[1], tempBound[0]]);
                config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                //=============================================
                TCHContFrmBoundsAfter = TCHContFrm.geometricBounds;
                TCContFrmBoundsAfter = TCContFrm.geometricBounds;
                //adjusting 'TEXT_CONTAINER' bounds if required
                if (TCHContFrmBoundsAfter[2] > TCHContFrmBoundsBefore[2]){
                    var htDiff = TCHContFrmBoundsBefore[2] - TCHContFrmBoundsAfter[2];
                    TCContFrm.geometricBounds = [TCContFrmBoundsAfter[0] + htDiff, TCContFrmBoundsAfter[1], TCContFrmBoundsAfter[2] + htDiff, TCContFrmBoundsAfter[3]]
                    }//end of IF
                else if (TCHContFrmBoundsAfter[2] < TCHContFrmBoundsBefore[2]){
                    var htDiff = TCHContFrmBoundsAfter[2] - TCHContFrmBoundsBefore[2];
                    TCContFrm.geometricBounds = [TCContFrmBoundsAfter[0] + htDiff, TCContFrmBoundsAfter[1], TCContFrmBoundsAfter[2] + htDiff, TCContFrmBoundsAfter[3]]
                    }
                currLib.close();
                currLibItem[0].textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                if (respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").isValid){
                    wrapTop = respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").value.replace('pt', '');
                    }
                if (respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").isValid){
                    wrapBottom = respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").value.replace('pt', '');
                    }
                if (respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").isValid){
                    wrapLeft = respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").value.replace('pt', '');
                    }
                if (respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").isValid){
                    wrapRight = respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").value.replace('pt', '');
                    }                
                currLibItem[0].textWrapPreferences.textWrapOffset = [wrapTop, wrapLeft, wrapBottom, wrapRight];
                var currLibBounds = currLibItem[0].geometricBounds;        
                floatBlockWd = currLibBounds[3] - currLibBounds[1];
                floatBlockHt = currLibBounds[2] - currLibBounds[0] + parseFloat(wrapBottom);
                floatBlockArea = floatBlockWd * floatBlockHt;
                tempFigureFrmID = currLibItem[0].id;
                currFloatWd = floatBlockWd;
                //checking to how many column the current float spans - starts
                if(currPage.name == '1'){
                    var currProcessClmsWidth = config.openerPageColumnsSpanWidth;
                    var currProcessClmsWidthLen = config.openerPageColumnsLen;
                    }//end of IF
                else {
                    var currProcessClmsWidth = config.columnSpanWidth;
                    var currProcessClmsWidthLen = config.pageColumnsLen;
                    }                           
                var columnSpanWidthLen = config.columnSpanWidth.length;
                for (var sp = currProcessClmsWidthLen - 1; sp >= 0; sp --){
                    var currSpnWdith = currProcessClmsWidth[sp][0].width;
                    if (!(currProcessClmsWidth[sp-1] == undefined)){
                        var preSpnWdith = currProcessClmsWidth[sp-1][0].width;
                        if (parseInt(currFloatWd*100)/100 > parseInt(preSpnWdith*100)/100 && parseInt(currFloatWd*100)/100 <= parseInt(currSpnWdith*100)/100){
                            floatSpnTo = currProcessClmsWidth[sp][1].index;
                            break;
                            }
                        else if (parseInt(currFloatWd*100)/100 > parseInt(preSpnWdith*100)/100 && parseInt(currFloatWd*100)/100 > parseInt(currSpnWdith*100)/100){
                            floatSpnTo = currProcessClmsWidth[sp][1].index;
                            config.rotateFloat = true;
                            break;
                            }
                        }//end of IF
                    else{
                        floatSpnTo = currProcessClmsWidth[sp][1].index;
                        }//end of ELSE
                    }//end of FOR loop
                //checking to how many column the current float spans - ends

                //config.notPlacedFloatsIDs.unshift(currCitID);
                config.rotateFloat = false;//by default setting that the box is not rotated may need update later
                wdSplitEqually = 0
                //checking whether the box size is greater than text area, if so same lib would be called again and a continued would be set 
                //And it would work as a recurrsive function, as long as the box has text height greater the text clm height the box will be continued
                if (floatBlockHt > config.pageColumns[0].height && boxType == 'TYPE2'){
                    config["groupItteration"] = 1;
                    config["previousBoxGroupID"] = 0;
                    var previousBoxht = floatBlockHt;
                    var contLibItem, TCContFrmCont;
                    continueBox(currLibItem[0], TCContFrm, currBoxBlock, previousBoxht);
                    function continueBox(previousLibItem, continuedFrame, currBoxBlock, previousBoxht){
                    var prevTCContFrm = TCContFrm;
                    prevTCContFrmBound = prevTCContFrm.geometricBounds;
                    currLib = app.open(libFilePath);
                    contLibItem = currLib.assets.item(boxType).placeAsset(myDoc);
                    contLibItem[0].move (currPage);
                    if (parseInt(figPageNumber)%2 == 0){//verso pages
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                    contLibItem[0].move ([config.geoBoundsVerso[1] - config.pageSize.width, config.geoBoundsVerso[0]]);
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                    }
                    else{//recto pages
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                    contLibItem[0].move ([config.geoBoundsRecto[1] + config.pageSize.width, config.geoBoundsRecto[0]]);
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                    }        
                    var currBoxBlockPage = currPage;
                    var currMoveObj, diffInPosition, TCHContFrmBoundsBefore, TCHContFrmBoundsAfter, TCHContFrmCont, TCContFrmBoundsBefore, TCContFrmBoundsAfter;
                    var currContFrm;
                    var movingObj = contLibItem[0].pageItems;
                    var movingObjLen = movingObj.length;
                    var currBoxBlockPageName = currPage;       
                    config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
                    for (var mov = 0; mov < movingObjLen; mov ++){
                        if(movingObj[mov].label == 'TEXT_CONTAINER_HEAD'){
                            captionPara = currBoxBlock.xmlItems[0].paragraphs[0];
                            TCHContFrmCont = movingObj[mov];
                            TCHContFrmContBoundsBefore = TCHContFrmCont.geometricBounds;
                            boxLabelText = captionPara.contents.replace(/(Box\s\d+).+/,'$1');
                            TCHContFrmCont.insertionPoints[0].contents = boxLabelText
                            TCHContFrmCont.characters.lastItem().insertionPoints[-1].contents =  SpecialCharacters.EM_SPACE;
                            TCHContFrmCont.characters.lastItem().insertionPoints[-1].contents =  'Continued';
                            TCHContFrmCont.paragraphs[0].appliedParagraphStyle = 'jrnlBoxCaption';
                            TCHContFrmCont.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY; //Fix Text Frame Height here.          
                            myDoc.recompose();
                            }//end of if 
                        else if(movingObj[mov].label == 'TEXT_CONTAINER'){
                            var contBoxHt,contBoxWd,contBoxArea; 
                            continuedFrame.recompose();
                            TCContFrmBounds = continuedFrame.geometricBounds; 
                            var frmToBeReducedBy = previousBoxht - config.pageColumns[0].height;
                            frmToBeReducedBy = frmToBeReducedBy - 10;//reducing another 18 pt to fit continued box
                            continuedFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
                            continuedFrame.geometricBounds = [TCContFrmBounds[0], TCContFrmBounds[1], TCContFrmBounds[2] - frmToBeReducedBy, TCContFrmBounds[3]];
                            TCContFrmCont = movingObj[mov];
                            continuedFrame.nextTextFrame = TCContFrmCont;
                            continuedFrame.fit(FitOptions.FRAME_TO_CONTENT);
                            TCContFrmBounds = continuedFrame.geometricBounds; 
                            TCContFrmContBoundsBefore = TCContFrmCont.geometricBounds;
                            TCContFrmCont.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY; //Fix Text Frame Height here. 
                            //adding footer continued============================================================================================
                            var continuedTextStyle = config.continuedStyle.table.footer['continuedTextStyle']; //TBL_CONT
                            continueText = config.continuedStyle.table.footer['continuedText']; //Get config footer continued text here.
                            var openBracket = continueText.split("<i>")[0];
                            var splitText = continueText.split("<i>")[1];
                            var contText = splitText.split("</i>")[0];
                            var closeBracket = splitText.split("</i>")[1]; //Split continued text here;
                            var continuedTextStyleInsetPref = config.currDoc.objectStyles.itemByName('TBL_CONT_BOTTOM').textFramePreferences.insetSpacing;
                            continueTextAdd =  config.currDoc.pages.itemByName(currPage.name).textFrames.add({geometricBounds: [TCContFrmBounds[2], TCContFrmBounds[1], TCContFrmBounds[2] + 18, TCContFrmBounds[3]]}); //Create continued text text frame here.
                            continueTextAdd.contents = contText; //Place continued here.
                            continueTextAdd.paragraphs[0].appliedCharacterStyle = continuedTextStyle;
                            continueTextAdd.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN; //Continue style bottom align here.
                            continueTextAdd.textFramePreferences.firstBaselineOffset=FirstBaseline.LEADING_OFFSET; //Continue style offset Leading here.
                            continueTextAdd.parentStory.justification=Justification.RIGHT_ALIGN; //Continue style right align here.
                            continueTextAdd.textFramePreferences.ignoreWrap = true;
                            continueTextAdd.fit(FitOptions.FRAME_TO_CONTENT);
                            var newGroupArray = new Array(); 
                            var earlierBox = previousLibItem.pageItems;
                            var earlierBoxLen = earlierBox.length;
                            for (var gi = 0; gi < earlierBoxLen; gi ++){
                                earlierBox[gi].select();
                                newGroupArray.push(app.selection[0]);
                                }
                            newGroupArray.push(continueTextAdd);
                            previousLibItem.ungroup();
                            var newGroup = config.currDoc.groups.add(newGroupArray);
                            newGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                            newGroup.textWrapPreferences.textWrapOffset = [wrapTop, wrapLeft, wrapBottom, wrapRight];
                            contLibItem[0].textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                            contLibItem[0].textWrapPreferences.textWrapOffset = [wrapTop, wrapLeft, wrapBottom, wrapRight];
                            //===============================================================================================================
                            var currLibBounds = newGroup.geometricBounds;        
                            if(config.groupItteration == 1){
                                tempFigureFrmID = newGroup.id;
                                floatBlockWd = currLibBounds[3] - currLibBounds[1];
                                floatBlockHt = currLibBounds[2] - currLibBounds[0] + parseFloat(wrapBottom);
                                floatBlockArea = floatBlockWd * floatBlockHt;                            
                                }
                            else {//these values are the modified when the box keeps continuing
                                config.previousBoxGroupID = newGroup.id;
                                contBoxWd = currLibBounds[3] - currLibBounds[1];
                                contBoxHt = currLibBounds[2] - currLibBounds[0] + parseFloat(wrapBottom);
                                contBoxArea = floatBlockWd * floatBlockHt;                            
                                }
                            myDoc.recompose();
                        }//end of ELS E IF
                    }//end of FOR loop
                    //===================================================================================================
                        TCHContFrmContBoundsAfter = TCHContFrmCont.geometricBounds;
                        TCContFrmContBoundsAfter = TCContFrmCont.geometricBounds;
                        //adjusting 'TEXT_CONTAINER' bounds if required
                        if (TCHContFrmContBoundsAfter[2] > TCHContFrmContBoundsBefore[2]){
                            var htDiff = TCHContFrmContBoundsBefore[2] - TCHContFrmContBoundsAfter[2];
                            TCContFrmCont.geometricBounds = [TCContFrmContBoundsAfter[0] + htDiff, TCContFrmContBoundsAfter[1], TCContFrmContBoundsAfter[2] + htDiff, TCContFrmContBoundsAfter[3]]
                            }//end of IF
                        else if (TCHContFrmContBoundsAfter[2] < TCHContFrmContBoundsBefore[2]){
                            var htDiff = TCHContFrmContBoundsAfter[2] - TCHContFrmContBoundsBefore[2];
                            TCContFrmCont.geometricBounds = [TCContFrmContBoundsAfter[0] + htDiff, TCContFrmContBoundsAfter[1], TCContFrmContBoundsAfter[2] + htDiff, TCContFrmContBoundsAfter[3]]
                            }
                        currLib.close();
                        contLibItem[0].textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
                        if (respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").isValid){
                            wrapTop = respectiveFloat[0].xmlAttributes.itemByName("data-top-gap").value.replace('pt', '');
                            }
                        if (respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").isValid){
                            wrapBottom = respectiveFloat[0].xmlAttributes.itemByName("data-bot-gap").value.replace('pt', '');
                            }
                        if (respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").isValid){
                            wrapLeft = respectiveFloat[0].xmlAttributes.itemByName("data-left-gap").value.replace('pt', '');
                            }
                        if (respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").isValid){
                            wrapRight = respectiveFloat[0].xmlAttributes.itemByName("data-right-gap").value.replace('pt', '');
                            }                
                        contLibItem[0].textWrapPreferences.textWrapOffset = [wrapTop, wrapLeft, wrapBottom, wrapRight];
                        var currLibBounds = contLibItem[0].geometricBounds;        
                        contFloatBlockWd = currLibBounds[3] - currLibBounds[1];
                        contFloatBlockHt = currLibBounds[2] - currLibBounds[0] + parseFloat(wrapBottom);
                        contFloatBlockArea = contFloatBlockWd * contFloatBlockHt;
                        config.continuedBox = true;
                        config.continuedBoxID.push(currCitation + '_' + config.groupItteration);
                        config.continuedBoxDetails[currCitation + '_' + config.groupItteration] = {"citationBlockHeight":0,"floatBlockHeight":contFloatBlockHt, "floatBlockWidth":contFloatBlockWd, "floatBlockArea":contFloatBlockArea,"floatSpanTo":floatSpnTo,"frameID":contLibItem[0].id, "floatPlaceFrom":'', "onPage":currPage.name, "currCitBaseline":0, 'floatRotated':config.rotateFloat, "landscapeAdditionalOffset":0, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":config.placingSequence, "preferredOnColumn":config.preferredOnColumn};
                        if(config.groupItteration > 1){//if the box is being continued for second itteration onward, we need to reset the previous cpontinued block frame ID
                            config.continuedBoxDetails[currCitation + '_' + (config.groupItteration - 1)].frameID = config.previousBoxGroupID;
                            config.continuedBoxDetails[currCitation + '_' + (config.groupItteration - 1)].contFloatBlockWd = contBoxWd;
                            config.continuedBoxDetails[currCitation + '_' + (config.groupItteration - 1)].floatBlockHeight = contBoxHt;
                            config.continuedBoxDetails[currCitation + '_' + (config.groupItteration - 1)].floatBlockArea = contBoxArea;
                            }
                        config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
                        config.groupItteration++;
                        //===================================================================================================
                        }//end of continueBox function
                    if(contFloatBlockHt > config.pageColumns[0].height){
                        previousBoxht = contFloatBlockHt;
                        continueBox(contLibItem[0], TCContFrmCont, currBoxBlock, previousBoxht);
                        }
                    }//end of IF (box continue check)
                return floatSpnTo, floatBlockWd, floatBlockHt, floatBlockArea, tempFigureFrmID, config.rotateFloat, wdSplitEqually;
            }//end of function;
//==================================================    
      }//end of events
})(floatPlacer || {});

//==================================================
function citation(currPageCitID, currCitBlkArea, currPageCit, defaultFitOnPage, forceMove, totalCitHt, currCitBlkHt, hzc, currPageName, currCitBaseline){
    var currPageCitIDLen = currPageCitID.length;
    var groupCitations = false;//Flag for group citations, that is if a single citation ref has multiple citations then flagging that for future reference
    for (var cit = 0; cit < currPageCitIDLen; cit ++){
        var currPageCitation = currPageCitID[cit];
        //checking whether the float is already placed
        var tempFloatsPlacedOnPages = config.floatsPlacedOnPages;
        var tempFloatsPlacedOnPagesLen = tempFloatsPlacedOnPages.length;
        var floatAlreadyPlaced = false;
        for(var v = 0; v < tempFloatsPlacedOnPagesLen; v++){
            if (tempFloatsPlacedOnPages[v] == currPageCitation){
                floatAlreadyPlaced = true;
                v = tempFloatsPlacedOnPagesLen;
                break;
                }//end of IF
            }//end of FOR loop
        //======================================
        config["placingSequence"] = '';
        config["placingInline"] = '';
        config["preferredOnColumn"] = '';
        config["preferredOnCurrentPage"] = '';
        config["overrideCitationHeight"] = null;
        if (floatAlreadyPlaced == false){
                    config["floatContinued"] = false;
                    floatCalcDone = false;
                    result = floatPlacer.events.calcFloatAreas(currPageCitation, currPageCit, hzc, currCitBlkHt, config.rotateFloat, currCitBlkHt)//here sending the collected citation XML info to another function "calcFloatAreas"
                    //checking whether the float fit on the same page
                    if ((config.maxFloatArea >= (floatBlockArea + currCitBlkArea)) && defaultFitOnPage && !(forceMove) && !(config.floatContinued)){
                            floatFitOnCurrPage = true;
                            config.maxFloatArea = config.maxFloatArea - (floatBlockArea + currCitBlkArea);
                        }//edn of if 
                    else {
                            floatFitOnCurrPage = false;
                            defaultFitOnPage = false;
                            forceMove = false;
                            config.maxFloatArea = config.maxFloatArea - (floatBlockArea + currCitBlkArea);
                        }
                    totalCitHt = totalCitHt + currCitBlkHt;
                    config.citationsOnCurrPage = config.citationsOnCurrPage.concat([currPageCitation]);
                    //IMPORTANT: If the citation ref has muliple citations then "citationBlockHeight" should be '0', checking that below
                    if(currPageCitIDLen > 0 && groupCitations == true){
                        currCitBlkHt = 0;
                        }//end of IF                  
                    else if (config.overrideCitationHeight == 0){
                        currCitBlkHt = 0;
                        }
                        //===============================================
                    if(!config.floatContinued){
                        //checking whether the float is also placed by user also
                        if(config.userPlacingFloatsDetails[currPage.name] == null) {
                            config.userPlacingFloatsDetails[currPage.name] = '';
                            }
                        if(checkValueInArray(config.userPlacingFloatsDetails[currPage.name], currPageCitation)){
                            config.userPlacedFloatCitationBlockHeight = config.userPlacedFloatCitationBlockHeight + currCitBlkHt;
                            currCitBlkHt = 0;
                            floatCalcDone = false;
                            floatFitOnCurrPage = true;
                            config.userPlacedFloatIntervene = true;
                            }//end of IF
                        else {
                            if (config.userPlacedFloatIntervene){
                                config.userPlacedFloatIntervene = false;
                                currCitBlkHt = currCitBlkHt + config.userPlacedFloatCitationBlockHeight;
                                config.userPlacedFloatCitationBlockHeight = 0;
                                }//end of IF
                            config.userPlacedFloatCitationBlockHeight = 0;
                            }//end of ELSE
                        config.docFloatIDsArray[currPageCitation] = {"citationOnColumn":hzc,"citationBlockHeight":currCitBlkHt,"citationBlockArea":currCitBlkArea,"floatBlockHeight":floatBlockHt, "floatBlockWidth":floatBlockWd, "floatBlockArea":floatBlockArea,"floatSpanTo":floatSpnTo,"frameID":tempFigureFrmID, "floatPlaceFrom":'', "onPage":currPageName, "currCitBaseline":currCitBaseline, 'floatRotated':config.rotateFloat, "landscapeAdditionalOffset":parseInt(wdSplitEqually*100)/100, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":config.placingSequence, "preferredOnColumn":config.preferredOnColumn, "preferredOnCurrentPage":config.preferredOnCurrentPage, "placingInline":config.placingInline, "citationLineIndex":config.citLineIndex, "currFloatClassName":config.currFloatClassName};//pushing collected citations into an array, "frameName":respectiveFloat
                         if(config.continuedBox){
                            var continuedBoxIDLen = config.continuedBoxID.length;
                            for (var bc = 0; bc < continuedBoxIDLen; bc ++){
                                var currObject = config.continuedBoxDetails[config.continuedBoxID[bc]];
                                config.docFloatIDsArray[config.continuedBoxID[bc]] = {"citationOnColumn":hzc,"citationBlockHeight":0,"citationBlockArea":0,"floatBlockHeight":currObject.floatBlockHeight, "floatBlockWidth":currObject.floatBlockWidth, "floatBlockArea":currObject.floatBlockArea,"floatSpanTo":floatSpnTo,"frameID":currObject.frameID, "floatPlaceFrom":'', "onPage":currPageName, "currCitBaseline":currCitBaseline, 'floatRotated':config.rotateFloat, "landscapeAdditionalOffset":parseInt(wdSplitEqually*100)/100, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":false, "preferredOnColumn":config.preferredOnColumn, "preferredOnCurrentPage":config.preferredOnCurrentPage, "placingInline":config.placingInline, "citationLineIndex":config.citLineIndex, "currFloatClassName":config.currFloatClassName};//pushing collected citations into an array, "frameName":respectiveFloat
                                }//end of FOR
                             }       
                        //For multiple refs on a single citation the below condition will be checked
                        if(currCitBlkHt == 0 || (currPageCitIDLen > 0 && currCitBlkHt > 0)){
                            groupCitations = true;
                        }//end of IF
                    //===============================================
                        }//end of IF
                    if (!floatCalcDone && !config.floatContinued){//if already the float is processed then the float info will be stored, so the ID is skipped now
                        if (floatFitOnCurrPage && !(config.lastFloatMovedToFloatNotOnCurrPage)){//if the float fit for the curr page then pushed to 'pageFloatIDsArray' 
                            //before adding citation for placement checking whether that has been already added
                            if (!(checkValueInArray(config.pageFloatIDsArray, currPageCitation))){
                                config.pageFloatIDsArray = config.pageFloatIDsArray.concat([currPageCitation]);
                                if (config.continuedBox){
                                var continuedBoxIDLen = config.continuedBoxID.length;
                                for (var bc = 0; bc < continuedBoxIDLen; bc ++){
                                    config.pageFloatIDsArray = config.pageFloatIDsArray.concat([config.continuedBoxID[bc]]);
                                    }
                                    config.continuedBox = false;
                                    config.continuedBoxDetails = '';
                                    }
                                }
                            }//
                        else {//if not then will be moved to 'notPlacedFloatsIDs'
                            if (!(checkValueInArray(config.notPlacedFloatsIDs, currPageCitation)) && !checkValueInArray(config.pageFloatIDsArray, currPageCitation)){
                                config.notPlacedFloatsIDs =config.notPlacedFloatsIDs.concat([currPageCitation]);
                                config.lastFloatMovedToFloatNotOnCurrPage = true;
                                if (config.continuedBox){
                                var continuedBoxIDLen = config.continuedBoxID.length;
                                for (var bc = 0; bc < continuedBoxIDLen; bc ++){
                                    config.notPlacedFloatsIDs = config.notPlacedFloatsIDs.concat([config.continuedBoxID[bc]]);
                                    }
                                    config.continuedBox = false;
                                    config.continuedBoxDetails = '';
                                    }
                                }
                            }
                        }//end of IF
                    floatCalcDone = false;
                    //the citation height floats on the same citation would remain the same so making in '0' for multiple citation in the same citation
                    if (currPageCitIDLen > 1){
                        currCitBlkHt = currCitBlkArea = 0;
                        }                                                        
            }//end of IF
        }//end of for
    }//end of function

//==================================================
function sortArrayAscending(a,b) { return a - b; }
//==================================================
//==================================================
function checkArrayDescending(arr){
    var sorted = false;    
    for (var i = 1; i < arr.length; i++) {
        if (config.docFloatIDsArray[arr[i -1]].floatSpanTo >= config.docFloatIDsArray[arr[i]].floatSpanTo) {
            if (i == (arr.length - 1)){
                config["floatPlaceFrom"] = ["top"];
                return sorted = true;
                }//end of IF
        }//end of IF
    else {
        break;
        }
    }
}
function checkArrayAscending(arr){
    var sorted = false;
    for (var i = 1; i < arr.length ; i++) {
        if (config.docFloatIDsArray[arr[i -1]].floatSpanTo <= config.docFloatIDsArray[arr[i]].floatSpanTo) {
            if (i == (arr.length - 1)){
                config["floatPlaceFrom"] = ["bottom"];
                return sorted = true;
                }//end of IF
        }//end of IF
    else {
        break;
        }
    }
}

function splitArray(arr, splitAtIndexStart, splitAtIndexEnd){
    var startPart = arr.slice(0, splitAtIndexStart);
    var endPart = arr.slice(splitAtIndexStart, splitAtIndexEnd)
    config.notPlacedFloatsIDs = endPart.concat(config.notPlacedFloatsIDs);
    config.pageFloatIDsArray = startPart;
}//end of split array


function checkValueInArray(arr, matchString, indexOf){
    var arrLen = arr.length;
    for (var al = 0; al < arrLen; al ++){
        var myRegExp = new RegExp(matchString);
        if (myRegExp.test(arr[al])){
            return result = true, floatCalcDone = true;
            }
        }
}//end of checkValueInArray

//the following function will sort multi dimentional array based on the 'filed' what we wanted to sorted by
function multiDiArraySortBy(field, reverse, dataConv){
   var key = dataConv ? 
       function(x) {return dataConv(x[field])} : 
       function(x) {return x[field]};
   reverse = !reverse ? 1 : -1;
   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}//end of function multiDiArraySortBy
//===========================================
//Sometimes we may have autoleading for paragrphs so unfortunately we cant get the leading as is  applied for the para
//so the below fundtion will check whether auto leading has been turned on for the para and do a calc
function calcLeading(para){
var paraFirstLine = para.lines.firstItem();
var paraFirstLineLeading = paraFirstLine.leading;
var resultLeading;
    if (paraFirstLineLeading == 1635019116){
        var pointSize = paraFirstLine.pointSize;
        var autoLeadingValue = paraFirstLine.autoLeading;
        resultLeading = (pointSize * autoLeadingValue)/100;
        return resultLeading;
        }//end of IF
    else {
        resultLeading = paraFirstLine.leading;
        return resultLeading;
        }
    }
function testStringInArray(currArr, matchString){
    var currArrLen = currArr.length;
    for (var ta = 0; ta < currArrLen; ta ++){
        var currPattern = new RegExp(currArr[ta].styleName + '_.+$');
        spaceAllowed = 0;
        if (matchString.match(currArr[ta].styleName) && !(currPattern.test(matchString))){
            if (currArr[ta].maxSpaceAllowed != undefined){
                spaceAllowed = currArr[ta].maxSpaceAllowed;
                }//end of IF
            else{
                spaceAllowed = currArr[ta].minSpaceAllowed;
                }//end of ELSE
            return spaceAllowed;
            break;
            }//end of IF 
        }//end of for
    }//end of function

function adjustParaSpace(arr, value, adjust){
    //Cases handled
    //Case 1: If the clmShortBy value is greater than last para leading, less than twice the leading and only 2 lines of the last paragraph available on the next column/page, then the difference between (leading * 2) and clmShortBy value should be substracted equally for the head levels
    //Case 2: If the clmShortBy value is less than last para leading or no longer lines of last paragraph split across page/column also clmShortBy value is less than last para leading then the clmShortBy value should be distributed for the head levels
    //Case 3: The other case handled is if it is a normal paragraph on the next column/page or it is section head (along with its following para) trying to pull it back to the current column, in short trying to make base align using the para on the next column/page 
    /*Logic used in this calculator (refer example 8 from the link 'http://www.math-shortcut-tricks.com/ratio-example-1/')
        Step 1: Adding all maximum value (ratio) allowed (Sum of the ratio)
        Step 2: Multiply the current ratio with the value to be equaly divided
        Step 3: Divide it by the sum resulted in Step 1
    */
    var valueToBeDivided = value;
    arrLen = arr.length;
    var maxSpaceCanAdjust = 0;
    if (arrLen == 0){
        config["columnBaseAligned"] = false;
        config.shortByValueBalance = valueToBeDivided;
        config.proceedHeadSpaceAdjust = false;
        }
    for (var al = 0; al < arrLen; al++){
        maxSpaceCanAdjust += parseFloat(arr[al].spaceAllowed);
        }//end of FOR loop
    if (valueToBeDivided <= maxSpaceCanAdjust || config.proceedHeadSpaceAdjust){//only if the valueToBeDivided of allowed space is lesser or equal to maxSpaceCanAdjust then only we are proceeding further
        for (var sp = 0; sp < arrLen; sp ++){
            var spaceToBeAdjusted = parseFloat(arr[sp].spaceAllowed) *  valueToBeDivided/maxSpaceCanAdjust;
            var adjustAt = arr[sp].adjustAt;
            if (adjust == 'increment'){
                spaceToBeAdjusted = spaceToBeAdjusted - 0.01;
                if (adjustAt == 'after'){
                    arr[sp].paraObj.paraObject.spaceAfter = arr[sp].paraObj.paraObject.spaceAfter + spaceToBeAdjusted;
                    }
                else if (adjustAt == 'before'){
                    arr[sp].paraObj.paraObject.spaceBefore = arr[sp].paraObj.paraObject.spaceBefore + spaceToBeAdjusted;
                    }
                }//end of IF
            else {
                //In order to get very close to the base adding 0.001 with the actual value **** know bug to be resolved later
                spaceToBeAdjusted = spaceToBeAdjusted + 0.001;
                if (adjustAt == 'after'){
                    arr[sp].paraObj.paraObject.spaceAfter = arr[sp].paraObj.paraObject.spaceAfter - spaceToBeAdjusted;
                    }
                else if (adjustAt == 'before'){
                    arr[sp].paraObj.paraObject.spaceBefore = arr[sp].paraObj.paraObject.spaceBefore - spaceToBeAdjusted;
                    }
                }//end of ELSE
            }//end of FOR loop        
        config["columnBaseAligned"] = true;
        config.shortByValueBalance = 0;
        }//end of IF
    else {//the below details are recorded for redoing the space adjustment later if needed
        if (!(arrLen == 0)){
            config.headLevelToBeDistributed = arr;
            }
        else {
            config.headLevelToBeDistributed = [];
            }
        config.headLevelToBeDistributedLen = arrLen;
        config["headlevelSpaceAdjustFor"] = adjust;//flagging whether to increase/decrease the space
        config["headlevelMaxSpaceCanAdjust"] = maxSpaceCanAdjust;
        config["columnBaseAligned"] = false;
        config.shortByValueBalance = valueToBeDivided - maxSpaceCanAdjust;
        config.proceedHeadSpaceAdjust = true;
        }//end of IF
    var myDoc = app.activeDocument;
    myDoc.recompose()
    }//end of function adjustParaSpace
//================================================================
function VJadjustment(clmShortBy){
    var collectedLines = config.linesCollectedForVJ;
    var totalLinesLen = collectedLines.length;
    var valuesToBeDistributed = clmShortBy/totalLinesLen;
    //reducing 10% from valuesToBeDistributed as tolerence
    var toleranceValue = (valuesToBeDistributed * 10)/100
    var actualValuesToBeDistributed = valuesToBeDistributed - toleranceValue;
    actualValuesToBeDistributed = parseInt(actualValuesToBeDistributed*100)/100;
    //Then we are setting up a condition the value of "valuesToBeDistributed" should be <= to 6% of baseleading
    //checking the percentage of "valuesToBeDistributed"
    var maxPercent = config.baseLeading * 6/100;
    if(valuesToBeDistributed <= maxPercent){
        for (var vj = 0; vj < totalLinesLen; vj ++){
            collectedLines[vj].leading = collectedLines[vj].leading + actualValuesToBeDistributed;
            }//end of FOR loop
        config.VJadjustmentProcess = true;   
        config.shortByValueBalance = 0;
        }//end of IF
    else {//if the above condition is failed then assuming that there is no other possiblity to do base align further
        config.VJadjustmentProcess = false;
        }
    }//end of VJadjustment
//================================================================
function trackingParagraphs(parasForTracking, trackingLimitation, trackingOption, trackParaCt, lastLineLeading, checkLastLineLeading, trackedParasCt){
    var clmParasForTracking = parasForTracking;
    config.spaceTakenForLeading = 0;
    config["trackedParas"] = new Array();
    config.trackedParasCt = 0;
    config["returnTrackingResult"] = false;
    for (var tln = 0; tln < clmParasForTracking.length; tln ++){
        var paraToBeAdjusted = clmParasForTracking[tln]; 
        value = trackingLimitation;
        if(paraToBeAdjusted.paraLeading == lastLineLeading || !checkLastLineLeading){
            config.returnTrackingResult = trackParas(paraToBeAdjusted, value, trackingOption, config.returnTrackingResult, config.trackedParasCt);
            if (config.returnTrackingResult){//if the trac result is true then itterating tracked para count  
                config.shortByValueBalance = config.shortByValueBalance - paraToBeAdjusted.paraLeading;
                config["lastTrackedParaLeading"] = paraToBeAdjusted.paraLeading;
                trackedParasCt++;
                }//end of IF
            }//end of IF
        if (trackParaCt == trackedParasCt){//the break point if the no of paragraphs required tracking is satisfied
            break;
            }//end of IF
        }//end of FOR loop
        return trackedParasCt;
    }//end of 'trackingParagraphs' function
//================================================================
function revertTrack(trackedParas){
    var trackedParasLen = config.trackedParas.length;
    for (var rt = 0; rt < trackedParasLen; rt ++){
        var revertTrackPara = config.trackedParas[rt];
        revertTrackPara.paraObject.tracking = revertTrackPara.originalTrack;
        }//end of  for loop
    }//end of 'revertTrack' function 
//================================================================
function adjustingHeadlevels(clmShortBy, lastLineLeading, adjustSpacingFor){
	try{
    if (adjustSpacingFor == 'decrement'){//Case 1
        shortBy = parseInt (clmShortBy*100)/100;//trimming the result to two decimal
        decreaseParaSpace(shortBy, adjustSpacingFor);
        }//end of IF 
    else if (adjustSpacingFor == 'increment'){//Case 2
        shortBy = clmShortBy;
        shortBy = parseInt (shortBy*100)/100;//trimming the result to two decimal
        increaseParaSpace(shortBy, adjustSpacingFor);
        }//end of ELSE IF
    else if (!(config.baseAlignmentDetails.paraOnNextColumn.paraObject == undefined) && (config.baseAlignmentDetails.textHeightFromNextClm < clmShortBy)){//Case 3
        shortBy = clmShortBy - config.baseAlignmentDetails.textHeightFromNextClm;
        shortBy = parseInt (shortBy*100)/100;//trimming the result to two decimal
        decreaseParaSpace(shortBy, adjustSpacingFor);
        }//end of ELSE IF
    else if (!(config.baseAlignmentDetails.paraOnNextColumn.paraObject == undefined) && (config.baseAlignmentDetails.textHeightFromNextClm > clmShortBy)){//Case 3
        shortBy = config.baseAlignmentDetails.textHeightFromNextClm - clmShortBy;
        shortBy = parseInt (shortBy*100)/100;//trimming the result to two decimal
        decreaseParaSpace(shortBy, adjustSpacingFor);
        }//end of ELSE IF
      }catch(e){}
    }//end of adjustingHeadlevels function
//==================================================
//function for decreasing space between paragraphs
function decreaseParaSpace(shortBy, adjustSpacingFor){
    //calculating the amount of space (above/below) head levels would allow for the styles (refer config)
    var stylesAllowingDecreaseSpaceBefore = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.decrease.before);
    stylesAllowingDecreaseSpaceBefore = stylesAllowingDecreaseSpaceBefore.split(/,/g);
    var stylesAllowingDecreaseSpaceAfter = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.decrease.after);
    stylesAllowingDecreaseSpaceAfter = stylesAllowingDecreaseSpaceAfter.split(/,/g);
    var spaceAdjustingLimitationPercentMin = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.limitationPercentage.minimum);
    var spaceAdjustingLimitationPercentMax = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.limitationPercentage.maximum);
    var stylesAllowingDecreaseSpaceBeforeLen = stylesAllowingDecreaseSpaceBefore.length;
    for (var ibs = 0; ibs < stylesAllowingDecreaseSpaceBeforeLen; ibs ++){
        var currStyle = config.prefixForHeadStyles + stylesAllowingDecreaseSpaceBefore[ibs];
        if (config.currDoc.paragraphStyles.itemByName(currStyle).isValid){
            var currStyleAboveSpace = config.currDoc.paragraphStyles.itemByName(currStyle).spaceBefore;
            var minSpaceAllowed = (currStyleAboveSpace * spaceAdjustingLimitationPercentMin)/100;
            stylesAllowingDecreaseSpaceBefore[ibs] = {};
            stylesAllowingDecreaseSpaceBefore[ibs]["styleName"] = currStyle;            
            stylesAllowingDecreaseSpaceBefore[ibs]["minSpaceAllowed"] = minSpaceAllowed;
            }
        else if (config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).isValid){
            var currStyleAboveSpace = config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).spaceBefore;
            var minSpaceAllowed = (currStyleAboveSpace * spaceAdjustingLimitationPercentMin)/100;
            stylesAllowingDecreaseSpaceBefore[ibs] = {};
            stylesAllowingDecreaseSpaceBefore[ibs]["styleName"] = currStyle.replace(config.prefixForHeadStyles,'');            
            stylesAllowingDecreaseSpaceBefore[ibs]["minSpaceAllowed"] = minSpaceAllowed;
            }
        }//end of FOR loop                
    var stylesAllowingDecreaseSpaceAfterLen = stylesAllowingDecreaseSpaceAfter.length;
    for (var ibs = 0; ibs < stylesAllowingDecreaseSpaceAfterLen; ibs ++){
        var currStyle = config.prefixForHeadStyles + stylesAllowingDecreaseSpaceAfter[ibs];
        if (config.currDoc.paragraphStyles.itemByName(currStyle).isValid){
            var currStyleBelowSpace = config.currDoc.paragraphStyles.itemByName(currStyle).spaceAfter;
            var minSpaceAllowed = (currStyleBelowSpace * spaceAdjustingLimitationPercentMin)/100;
            stylesAllowingDecreaseSpaceAfter[ibs] = {};
            stylesAllowingDecreaseSpaceAfter[ibs]["styleName"] = currStyle;            
            stylesAllowingDecreaseSpaceAfter[ibs]["minSpaceAllowed"] = minSpaceAllowed;  
            }
        else if (config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).isValid){
            var currStyleBelowSpace = config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).spaceAfter;
            var minSpaceAllowed = (currStyleBelowSpace * spaceAdjustingLimitationPercentMin)/100;
            stylesAllowingDecreaseSpaceAfter[ibs] = {};
            stylesAllowingDecreaseSpaceAfter[ibs]["styleName"] = currStyle.replace(config.prefixForHeadStyles,'');            
            stylesAllowingDecreaseSpaceAfter[ibs]["minSpaceAllowed"] = minSpaceAllowed;  
            }
        }//end of FOR loop
    //collecting the paragraphs for which space should be modified
    var parasOnTheClm = config.baseAlignmentDetails.clmParaDetails.concat(config.baseAlignmentDetails.paraOnNextColumn);
    var parasOnTheClmLen = parasOnTheClm.length
    var paraArrForDecreaseSpace = new Array();
    var paraArrForDecreaseSpaceCt = 0;
    for (var p = 0; p < parasOnTheClmLen; p ++){
        matchString = parasOnTheClm[p].paraStyleName;
        testStringInArray(stylesAllowingDecreaseSpaceBefore, matchString);
        if (!(spaceAllowed == 0) && (p > 0)){
            paraArrForDecreaseSpace[paraArrForDecreaseSpaceCt] = {'paraObj':parasOnTheClm[p], 'spaceAllowed':spaceAllowed, 'paraStyle':matchString, 'adjustAt':'before'};
            paraArrForDecreaseSpaceCt++;
            }//end of IF
        testStringInArray(stylesAllowingDecreaseSpaceAfter, matchString);
        if (!(spaceAllowed == 0) && (p < parasOnTheClmLen - 1)){
            paraArrForDecreaseSpace[paraArrForDecreaseSpaceCt] = {'paraObj':parasOnTheClm[p], 'spaceAllowed':spaceAllowed, 'paraStyle':matchString, 'adjustAt':'after'};
            paraArrForDecreaseSpaceCt++;
            }//end of IF
        }//end of FOR loop
    adjustParaSpace(paraArrForDecreaseSpace, shortBy, adjustSpacingFor)
    }//end of function decreaseParaSpace

//function for increasing space between paragraphs
function increaseParaSpace(shortBy, adjustSpacingFor){
    //calculating the amount of space (above/below) head levels would allow for the styles (refer config)
    var stylesAllowingIncreaseSpaceBefore, stylesAllowingIncreaseSpaceAfter = [];
    var stylesAllowingIncreaseSpaceBefore = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.increase.before);
    stylesAllowingIncreaseSpaceBefore = stylesAllowingIncreaseSpaceBefore.split(/,/g);
    var stylesAllowingIncreaseSpaceAfter = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.increase.after);
    stylesAllowingIncreaseSpaceAfter = stylesAllowingIncreaseSpaceAfter.split(/,/g);
    var spaceAdjustingLimitationPercentMin = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.limitationPercentage.minimum);
    var spaceAdjustingLimitationPercentMax = floatPlacer.shallowCopy(config.adjustParagraphSpaceStyleList.limitationPercentage.maximum);
    //redefining the style list array with further details like min and max space allowed
    var stylesAllowingIncreaseSpaceBeforeLen = stylesAllowingIncreaseSpaceBefore.length;
    for (var ibs = 0; ibs < stylesAllowingIncreaseSpaceBeforeLen; ibs ++){
        var currStyle = config.prefixForHeadStyles + stylesAllowingIncreaseSpaceBefore[ibs];
        if (config.currDoc.paragraphStyles.itemByName(currStyle).isValid){
            var currStyleAboveSpace = config.currDoc.paragraphStyles.itemByName(currStyle).spaceBefore;
            var maxSpaceAllowed = (currStyleAboveSpace * spaceAdjustingLimitationPercentMax)/100;
            stylesAllowingIncreaseSpaceBefore[ibs] = {};
            stylesAllowingIncreaseSpaceBefore[ibs]["styleName"] = currStyle;            
            stylesAllowingIncreaseSpaceBefore[ibs]["maxSpaceAllowed"] = maxSpaceAllowed;
            }        
        else if (config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).isValid){
            var currStyleAboveSpace = config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).spaceBefore;
            var maxSpaceAllowed = (currStyleAboveSpace * spaceAdjustingLimitationPercentMax)/100;
            stylesAllowingIncreaseSpaceBefore[ibs] = {};
            stylesAllowingIncreaseSpaceBefore[ibs]["styleName"] = currStyle.replace(config.prefixForHeadStyles,'');            
            stylesAllowingIncreaseSpaceBefore[ibs]["maxSpaceAllowed"] = maxSpaceAllowed;
            }
        }//end of FOR loop
    var stylesAllowingIncreaseSpaceAfterLen = stylesAllowingIncreaseSpaceAfter.length;
    for (var ibs = 0; ibs < stylesAllowingIncreaseSpaceAfterLen; ibs ++){
        var currStyle = config.prefixForHeadStyles + stylesAllowingIncreaseSpaceAfter[ibs];
        if (config.currDoc.paragraphStyles.itemByName(currStyle).isValid){
            var currStyleBelowSpace = config.currDoc.paragraphStyles.itemByName(currStyle).spaceAfter;
            var maxSpaceAllowed = (currStyleBelowSpace * spaceAdjustingLimitationPercentMax)/100;
            stylesAllowingIncreaseSpaceAfter[ibs] = {};
            stylesAllowingIncreaseSpaceAfter[ibs]["styleName"] = currStyle;            
            stylesAllowingIncreaseSpaceAfter[ibs]["maxSpaceAllowed"] = maxSpaceAllowed;
            }
        else if (config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).isValid){
            var currStyleBelowSpace = config.currDoc.paragraphStyles.itemByName(currStyle.replace(config.prefixForHeadStyles,'')).spaceAfter;
            var maxSpaceAllowed = (currStyleBelowSpace * spaceAdjustingLimitationPercentMax)/100;
            stylesAllowingIncreaseSpaceAfter[ibs] = {};
            stylesAllowingIncreaseSpaceAfter[ibs]["styleName"] = currStyle.replace(config.prefixForHeadStyles,'');            
            stylesAllowingIncreaseSpaceAfter[ibs]["maxSpaceAllowed"] = maxSpaceAllowed;
            }
        }//end of FOR loop
    //collecting the paragraphs for which space should be modified
    var parasOnTheClm = config.baseAlignmentDetails.clmParaDetails;
    var parasOnTheClmLen = parasOnTheClm.length
    var paraArrForIncreaseSpace = new Array();
    var paraArrForIncreaseSpaceCt = 0;
    for (var p = 0; p < parasOnTheClmLen; p ++){
        matchString = parasOnTheClm[p].paraStyleName;
        testStringInArray(stylesAllowingIncreaseSpaceBefore, matchString);
        if (!(spaceAllowed == 0) && (p > 0 || currPage.name == 1)){
            paraArrForIncreaseSpace[paraArrForIncreaseSpaceCt] = {'paraObj':parasOnTheClm[p], 'spaceAllowed':spaceAllowed, 'paraStyle':matchString, 'adjustAt':'before'};
            paraArrForIncreaseSpaceCt++;
            }//end of IF
        testStringInArray(stylesAllowingIncreaseSpaceAfter, matchString);
        if (!(spaceAllowed == 0) && (p < parasOnTheClmLen - 1)){
            paraArrForIncreaseSpace[paraArrForIncreaseSpaceCt] = {'paraObj':parasOnTheClm[p], 'spaceAllowed':spaceAllowed, 'paraStyle':matchString, 'adjustAt':'after'};
            paraArrForIncreaseSpaceCt++;
            }//end of IF
        }//end of FOR loop
    adjustParaSpace(paraArrForIncreaseSpace, shortBy, adjustSpacingFor)
    }//end of function increaseParaSpace
//==================================================

function adjustingFloatsSpaces(numOfLines, clmShortBy, baseLeading, lastLineLeading, cl, wrapAllTextsAroundFloats, adjustSpacingFor, proceedFloatsAdjust){
    //Case handled
    //Case 1: If there are two/one/no lines avlb on the column, then space required for base align would be the difference between top/bottom bound of column and top/bottom bound of last float, so the clmShortBy value will vary now
    //Case 2: We are first checking whether the clmShortBy is lesser than 4 times of leading, if that is the case then the number of times of leading space available must be less than or equal to the number of floats avbl on that column, then the space should be equally distributed for the floats
    //Case 3: Another case would be clmShortBy may be lesser than two times of leading and only one float avbl, for this situation we are just extending the float's wrap value
    var currClmIndex = config.baseAlignmentDetails.currentClmIndex;
    var X1Position = config.baseAlignmentDetails.clmX1position;//
    var X2Position = config.baseAlignmentDetails.clmX2position;//
    var currClmFloatsFromBottom, currClmFloatsFromTop;
    var distributeSpace = false;
    if (config.placeStyle == 'Stack'){
        if (config.placedFloatsOnPage[currClmIndex].bottom.length > 0){
            var floatsPlacedFrom = 'bottom';
            var currClmFloats = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom;
            }//end of IF
        else {
            var floatsPlacedFrom = 'top';
            var currClmFloats = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top;
            }//end of ELSE
        }//end of IF
    else if (config.placeStyle == 'Sandwich'){
            currClmFloatsFromBottom = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom;
            currClmFloatsFromTop = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top;
            var currClmFloats = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.concat(config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top);
        }//end of ELSE IF
    var floatFrmsOnClmLen = config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.length + config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top.length;
    var clmTopBound = config.margin.top;
    var clmBottomBound = config.margin.top + config.columnDetails[currClmIndex].height;
    var leastFloatOnClmFrm, diffBetweenFltNClmEdge;//least float on the column is the last float placed from the top/bottom   
    if (config.placeStyle == 'Stack'){
        if (floatsPlacedFrom == 'top'){
            leastFloatOnClmFrm = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top.length - 1]].frameID);
            leastFloatOnClmFrmBtmWrap = leastFloatOnClmFrm.textWrapPreferences.textWrapOffset[2];
            diffBetweenFltNClmEdge = clmBottomBound - (leastFloatOnClmFrm.geometricBounds[2] + leastFloatOnClmFrmBtmWrap);
            }//end of IF
        else {
            leastFloatOnClmFrm = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.length - 1]].frameID);
            leastFloatOnClmFrmTopWrap = leastFloatOnClmFrm.textWrapPreferences.textWrapOffset[0];
            diffBetweenFltNClmEdge = (leastFloatOnClmFrm.geometricBounds[0]) - (config.clmFirstLineTopPosition + leastFloatOnClmFrmTopWrap);//update made here on 31-Jan-2017
            }//end of ELSE
        }
    else if (config.placeStyle == 'Sandwich'){
        if(config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top.length > 0){
            leastFloatOnClmFrm = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].top.length - 1]].frameID);
            leastFloatOnClmFrmBtmWrap = leastFloatOnClmFrm.textWrapPreferences.textWrapOffset[2];
            diffBetweenFltNClmEdge = clmBottomBound - (leastFloatOnClmFrm.geometricBounds[2] + leastFloatOnClmFrmBtmWrap);
            }//end of IF
        if (config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.length > 0){
            leastFloatOnClmFrm = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom[config.placedFloatsOnPage[config.baseAlignmentDetails.currentClmIndex].bottom.length - 1]].frameID);
            leastFloatOnClmFrmTopWrap = leastFloatOnClmFrm.textWrapPreferences.textWrapOffset[0];
            diffBetweenFltNClmEdge = (leastFloatOnClmFrm.geometricBounds[0]) - (config.clmFirstLineTopPosition + leastFloatOnClmFrmTopWrap);//update made here on 31-Jan-2017
            }//end of IF
        }//end of ELSE IF
        var floatsSpaceAdjustingLimitationPercentMin = floatPlacer.shallowCopy(config.adjustFloatsSpace.limitationPercentage.minimum);
        var minFloatsSpaceAllowed = (config.wrapAroundFloat.top * floatsSpaceAdjustingLimitationPercentMin)/100;
        var floatsSpaceAdjustingLimitationPercentMax = floatPlacer.shallowCopy(config.adjustFloatsSpace.limitationPercentage.maximum);
        var maxFloatsSpaceAllowed = (config.wrapAroundFloat.top * floatsSpaceAdjustingLimitationPercentMax)/100;
        if (wrapAllTextsAroundFloats){
            shortBy = diffBetweenFltNClmEdge + clmShortBy;
            }//end of IF
        else {
            shortBy = clmShortBy;
            }//end of ELSE
        var shortByValueToDistribt;//the value that is to be equally distributed
        if (floatFrmsOnClmLen == 1 || floatFrmsOnClmLen == 2 && !(wrapAllTextsAroundFloats)){
            shortByValueToDistribt = shortBy/floatFrmsOnClmLen;
            }//end of IF
        else if ((numOfLines >= 3) && adjustSpacingFor == 'decrement' && !(wrapAllTextsAroundFloats)){//if the clm has >= 3 lines, the last paragraph has continued of min 3 lines to next column and the shortByValueToDistribt is less than half of last line leading then we could reduce the floats between spaces
            shortByValueToDistribt = -((lastLineLeading - shortBy)/(floatFrmsOnClmLen));
            }//end of IF
        else {
            if(!(wrapAllTextsAroundFloats)){
                shortByValueToDistribt = shortBy/(floatFrmsOnClmLen);
                }//end of IF
            else if (wrapAllTextsAroundFloats){
                shortByValueToDistribt = shortBy;
                }
            }//end of IF    
     shortByValueToDistribt = parseInt (shortByValueToDistribt*100)/100;//trimming the result to two decimal
     //Now checking whether 'shortByValueToDistribt' fits is space allowed for floats
     var spaceDiff, totalSpaceDiff;
     if (adjustSpacingFor == 'increment'){
         if (shortByValueToDistribt > maxFloatsSpaceAllowed && !(wrapAllTextsAroundFloats)){
             spaceDiff = shortByValueToDistribt - maxFloatsSpaceAllowed;
             totalSpaceDiff = spaceDiff * floatFrmsOnClmLen;
             shortByValueToDistribt = maxFloatsSpaceAllowed;
             }//end of IF
         else {
             distributeSpace = true;
             }
         }//end of IF
     else if (adjustSpacingFor == 'decrement'){
         if (shortByValueToDistribt > minFloatsSpaceAllowed && !(wrapAllTextsAroundFloats)){
             spaceDiff = shortByValueToDistribt - minFloatsSpaceAllowed;
             totalSpaceDiff = spaceDiff * floatFrmsOnClmLen;
             shortByValueToDistribt = maxFloatsSpaceAllowed;
             }//end of IF
         else {
             distributeSpace = true;
             }
         }//end of IF
     if (config.proceedFloatsAdjust || (distributeSpace)){//the condition here either value to distributed should be equal to clmShortBy value or proceedFloatsAdjust is true
        if(config.proceedFloatsAdjust){
            shortByValueToDistribt = config.floatsMaxSpaceToBeAdjusted/floatFrmsOnClmLen;
            } 
        var earlierOffset = 0;
        config.floatsFrmIndexPlacedOnCurrClm = [];       
        /*For some reason if we would accurate value for wrap it distrubes the lines or not resulting what we expected, so we reducing a value of 0.01 from the shortByValueToDistribt values */
        shortByValueToDistribt = shortByValueToDistribt - 0.01;//****IMPORTANT*****//
        //collecting the floats which are on the current column
         //=======================================
         var fltCtFromTop = 0; 
         var fltCtFromBtm = 0;
         var currClmFloatsLen = currClmFloats.length;
         for (var fop = 0; fop < currClmFloatsLen; fop ++){//itterating float frm to space adjustment
            var currFloatOnCurrClm = config.currDoc.textFrames.itemByID(config.docFloatIDsArray[currClmFloats[fop]].frameID);
            var currFloatOnCurrClmX1Position = currFloatOnCurrClm.geometricBounds[1];
            var currFloatOnCurrClmX2Position = currFloatOnCurrClm.geometricBounds[3];
                if (currClmFloatsLen == 1 && ((shortBy < baseLeading * 3) ||(wrapAllTextsAroundFloats)) && adjustSpacingFor == 'increment'){//if there is only one float just extending the wrap
                    if (config.docFloatIDsArray[currClmFloats[fop]].placeFloatAt == 'top'){
                        currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2]+ shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                        }//end of IF
                    else{
                        currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                        }//end of ELSE
                    config["columnBaseAligned"] = true;
                    config["floatsMaxSpaceToBeAdjusted"] = 0;
                    }//end of IF
                else if (((shortBy < baseLeading*3)||(wrapAllTextsAroundFloats)) && adjustSpacingFor == 'increment'){//if more than one float and the shortBy value is less the 3 times of leading distributing the space equally to the floats, only wrap value be modified for the floats drop from the top/grow from the bottom
                    if (config.docFloatIDsArray[currClmFloats[fop]].placeFloatAt == 'top'){
                        if (fop == 0 | fltCtFromTop == 0) {
                            currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                            fltCtFromTop++
                            }//end of IF
                        else {
                            if (fltCtFromTop == 0){
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                fltCtFromTop++
                                }//end of IF
                            else {
                                earlierOffset = earlierOffset + shortByValueToDistribt;
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                currFloatOnCurrClm.geometricBounds = [currFloatOnCurrClm.geometricBounds[0] + earlierOffset, currFloatOnCurrClm.geometricBounds[1], currFloatOnCurrClm.geometricBounds[2] + earlierOffset, currFloatOnCurrClm.geometricBounds[3]];
                                fltCtFromTop++
                                }//end of ELSE
                            }//end of ELSE
                        }//end of IF                    
                    else{
                        if (fop == floatFrmsOnClmLen - 1 | fltCtFromBtm == 0) {
                            currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                            fltCtFromBtm++
                            }//end of IF
                        else {
                            if (fltCtFromBtm == 0){
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                fltCtFromBtm++
                                }//end of IF
                            else {
                                earlierOffset = earlierOffset + shortByValueToDistribt;
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] + shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                currFloatOnCurrClm.geometricBounds = [currFloatOnCurrClm.geometricBounds[0] - earlierOffset, currFloatOnCurrClm.geometricBounds[1], currFloatOnCurrClm.geometricBounds[2] - earlierOffset, currFloatOnCurrClm.geometricBounds[3]];
                                fltCtFromBtm++
                                }//end of ELSE IF
                            }//end of ELSE
                        }//end of IF                    
                    config["columnBaseAligned"] = true;
                    config["floatsMaxSpaceToBeAdjusted"] = 0;
                    }//end of ELSE IF
                else if (adjustSpacingFor == 'decrement'){//trying to pull text from next column if possible by reducing the wrap value
//~                     shortBy = config.baseAlignmentDetails.textHeightFromNextClm - clmShortBy;
//~                     shortByValueToDistribt = shortBy/floatFrmsOnClmLen;
                    if (shortByValueToDistribt <= minFloatsSpaceAllowed){
                        if (config.docFloatIDsArray[currClmFloats[fop]].placeFloatAt == 'top'){
                            if (fop == 0 | fltCtFromTop == 0) {
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] - shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                fltCtFromTop++ 
                                }//end of IF
                            else {
                                if (fltCtFromTop == 0){
                                    currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] - shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                    fltCtFromTop++
                                    }//end of IF
                                else {
                                    earlierOffset = earlierOffset + shortByValueToDistribt;
                                    currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2] - shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                    currFloatOnCurrClm.geometricBounds = [currFloatOnCurrClm.geometricBounds[0] - earlierOffset, currFloatOnCurrClm.geometricBounds[1], currFloatOnCurrClm.geometricBounds[2] - earlierOffset, currFloatOnCurrClm.geometricBounds[3]];
                                    fltCtFromTop++
                                    }//end of ELSE
                                }//end of ELSE
                            }//end of IF                    
                        else{
                            if (fop == floatFrmsOnClmLen - 1 | currClmFloatsFromBottom.length == 1) {
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] - shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                }//end of IF
                            else {
                                earlierOffset = earlierOffset + shortByValueToDistribt;
                                currFloatOnCurrClm.textWrapPreferences.textWrapOffset = [currFloatOnCurrClm.textWrapPreferences.textWrapOffset[0] - shortByValueToDistribt, currFloatOnCurrClm.textWrapPreferences.textWrapOffset[1], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[2], currFloatOnCurrClm.textWrapPreferences.textWrapOffset[3]];
                                currFloatOnCurrClm.geometricBounds = [currFloatOnCurrClm.geometricBounds[0] + earlierOffset, currFloatOnCurrClm.geometricBounds[1], currFloatOnCurrClm.geometricBounds[2] + earlierOffset, currFloatOnCurrClm.geometricBounds[3]];
                                }//end of ELSE
                            }//end of ELSE                    
                        config["columnBaseAligned"] = true;                    
                        config["floatsMaxSpaceToBeAdjusted"] = 0;
                        }//end of IF
                    }//end of IF
             }//end of FOR 
         config.shortByValueBalance = 0;
         }//end of IF
     else {
        config.shortByValueBalance = totalSpaceDiff;
        config["floatsMaxSpaceToBeAdjusted"] = floatFrmsOnClmLen*shortByValueToDistribt;
        config.proceedFloatsAdjust = true;
        }//end of ELSE
    }//end of function adjustingFloatsSpaces
//==================================================
//function for tracking paragraphs
function trackParas(paraToBeAdjusted, value, trackingOption, returnTrackingResult, trackedParasCt){
        //trying to do tracking by 3 ittration, that is dividing the allowed track value by 3 and doing tracking in  3 itrration
        trackValue = value/3;
        var orginalNoOfLinesInPara = paraToBeAdjusted.paraObject.lines.length;
        var orginalTrackingInPara = paraToBeAdjusted.paraObject.tracking;
        var updatedNoOfLinesInPara;
        for (var tl = 0; tl < 3; tl ++){
            switch (trackingOption){
                case '-':
                paraToBeAdjusted.paraObject.tracking = paraToBeAdjusted.paraObject.tracking - trackValue;
                break;
                case '+':
                paraToBeAdjusted.paraObject.tracking = paraToBeAdjusted.paraObject.tracking + trackValue;
                break;
                }//end of switch case
            updatedNoOfLinesInPara = paraToBeAdjusted.paraObject.lines.length;
            if (updatedNoOfLinesInPara < orginalNoOfLinesInPara){//checking whether a line has been tighten
                returnTrackingResult = true;
                tl = 3;
                config.trackedParas[trackedParasCt] = {'paraObject':paraToBeAdjusted.paraObject, 'originalTrack':orginalTrackingInPara};
                trackedParasCt ++;
                config.recalledFromParaTracking = true;
                config.spaceTakenForLeading = config.spaceTakenForLeading + paraToBeAdjusted.paraLeading;
                }//end of IF
            else if (updatedNoOfLinesInPara > orginalNoOfLinesInPara){//checking whether a line has been loosen
                returnTrackingResult = true;
                tl = 3;
                config.trackedParas[trackedParasCt] = {'paraObject':paraToBeAdjusted.paraObject, 'originalTrack':orginalTrackingInPara};
                trackedParasCt ++;
                config.recalledFromParaTracking = true;
                config.spaceTakenForLeading = config.spaceTakenForLeading + paraToBeAdjusted.paraLeading;
                }//end of ELSE IF
            if (orginalNoOfLinesInPara == updatedNoOfLinesInPara && tl == 2){//if actual line length and modified line of the para is equal and itteration meet its limit then reverting back the tracking of para
                paraToBeAdjusted.paraObject.tracking = orginalTrackingInPara;
                }//end of IF
            }//end of FOR loop
        config.trackedParasCt = trackedParasCt;
        return returnTrackingResult;
    }//end of function trackParas
//==============================================
function floatContinuedBlock(tableFrameNameCurr, currPageName, tblObjStyle, floatCapPstyle, floatCapObjStyle, tableFrameCurr, firstItteration, currPageCitation, hzc, floatSpnTo, currCitBaseline, rotateFloat, wdSplitEqually, defaultFloatContCt, currCitBlkHt, boundsForContFrms){
    var curDoc = app.activeDocument;
    resetBounds = tableFrameNameCurr.geometricBounds;
    var tableFrameNameCurrY1 = boundsForContFrms[0];
    var tableFrameNameCurrX1 = boundsForContFrms[1];
    var tableFrameNameCurrY2 = boundsForContFrms[2];
    var tableFrameNameCurrX2 = boundsForContFrms[3];
    var pagesWidth = config.pageSize['width']; //Template Page Width
    var pagesHeight = config.pageSize['height']; //Template Page height
    var marginTop = config.margin['top']; //y1
    var marginBottom = config.margin['bottom']; //y2
    var marginInside = config.margin['inside']; //x2
    var marginOutside = config.margin['outside']; //x1
    var tableHeaderBelowSp = config.continuedStyle.table.header['space-below']; //Table Header Below Space
    var continuedTextStyle = config.continuedStyle.table.footer['continuedTextStyle']; //TBL_CONT
    var tableLastRowStyle = config.continuedStyle.table.header['tableLastRowStyle']; //TBLR
    var tableHeadRowStyle = config.continuedStyle.table.header['tableHeadRowStyle']; //TCH
    if(firstItteration){
        tableFrameCurr = tableFrameNameCurr; 
        }   
    var curTable, tableFrameNext, curTableWidth, continueTextAdd, tableFrameCurrGroup, firstFrameGroup;
    var tblStartRow = 0;
    if(tableFrameNameCurr.parentStory.overflows){
        tableFrameNext = curDoc.pages.itemByName(currPageName).textFrames.add({geometricBounds: [tableFrameNameCurrY1, tableFrameNameCurrX1, tableFrameNameCurrY2, tableFrameNameCurrX2]}); //Creating Next Text Frame here
        tableFrameNext.move([tableFrameNameCurrX1, tableFrameNameCurrY1])
        tableFrameNext.previousTextFrame = tableFrameCurr; //In link for current frame to Next frame.
        _remove_math_overlap_in_table(tableFrameCurr);
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        app.findGrepPreferences.findWhat = "(~m)";
        app.findGrepPreferences.appliedParagraphStyle = "jrnlTblBody";
        app.changeGrepPreferences.changeTo = "$1~i"
        app.activeDocument.changeGrep();
        //updating any missing glyphs==================================
           config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
           var tempBound = tableFrameNext.geometricBounds;
           tableFrameNext.textWrapPreferences.textWrapMode = TextWrapModes.NONE;
           tableFrameNext.move(currPage);
           currTextFrameObjectForGlyphSearch = tableFrameNext;
           app.doScript(File(layerTemplateScript + "\\"+ "missingGlyph.jsx"), ScriptLanguage.javascript, [layerTemplateScript, currTextFrameObjectForGlyphSearch]);
           tableFrameNext.move([tempBound[1], tempBound[0]]);
           config.currDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;
        //===================================================================================
        tableFrameCurr.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY; //Fix Text Frame Height here.
        tableFrameCurr.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
        tableFrameNext.appliedObjectStyle = curDoc.objectStyles.itemByName(tblObjStyle);
    //************************ Start - Current Text Frame - Text wrap here *********************************************
        var wrapSpaceTop = config.wrapAroundFloat['top'];
        var wrapSpaceBottom = config.wrapAroundFloat['bottom'];
        var wrapSpaceLeft = config.wrapAroundFloat['left'];
        var wrapSpaceRight = config.wrapAroundFloat['right'];
        tableFrameCurr.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
        tableFrameCurr.textWrapPreferences.textWrapOffset = new Array (wrapSpaceTop, wrapSpaceLeft, wrapSpaceBottom, wrapSpaceRight);
        tableFrameNext.textFramePreferences.ignoreWrap = true;
//************************ End - Current Text Frame - Text wrap here *********************************************
//************************ Start - Applied table cell style in the last row here *******************************************
        var tableFrameCurrID = tableFrameCurr.id;
        var firstFrameID = tableFrameNameCurr.id;
        if(firstItteration){
            var allTables = tableFrameNameCurr.tables;
            config.previousTableContFrame = tableFrameNameCurr;
            }
        else {
            var allTables = tableFrameCurr.tables;
            if (allTables.length == 0){
                var allTables = config.previousTableContFrame.tables;
                }
            else {
                config.previousTableContFrame = tableFrameCurr;
                }
            }
        var allTablesLen = allTables.length;
        var cumulativeRowHt = 0;
        for (var t = 0; t < allTablesLen; t++){  
            curTable = allTables[t];
            var currTableClmLen = curTable.columns.length;
            var allRows = curTable.rows;
            var nRows   = allRows.length;        
            var headerRowsHt = 0;
            //collecting header row height details
            for (var hrw = 0; hrw < nRows; hrw ++){
                //alert(allRows[hrw].rowType);
                if (allRows[hrw].rowType == 'HEADER_ROW'){
                    headerRowsHt = headerRowsHt + allRows[hrw].height;
                    }//end of IF
                else {
                    break;
                    }
                }//end of FOR loop
            for (var r = tblStartRow; r < nRows; r++){
                var curRow = allRows[r];
                var curRowHt = curRow.height;
                cumulativeRowHt = cumulativeRowHt + curRowHt;
                var iP = curRow.cells[0].insertionPoints[0];
                if(!(iP.parentTextFrames[0] == undefined)){
                var partFrameID = iP.parentTextFrames[0].id; //Collect current cell ID
                var repeatSubHeader = config.continuedStyle.table.header['repeat-sub-header'];
                var lastRowAppliedStyle;
                  if(firstFrameID != partFrameID && (tableFrameNext.id == partFrameID)){
                       if(repeatSubHeader == true){
                        var currLastRowFillColor =  allRows[r-1].fillColor.name;
                        lastRowAppliedStyle = allRows[r-1].cells.everyItem().appliedCellStyle = tableLastRowStyle; //Applied table cell style in the last row here 
                        allRows[r-1].cells.everyItem().fillColor = currLastRowFillColor;
                        var subHeaderRow = curTable.rows.add(LocationOptions.BEFORE, curRow); //Add Heading row
                        var subHeaderText = allTables[t].rows[0].contents;
                            subHeaderRow.contents = subHeaderText; //Place Head row
                            tblStartRow = r;
                            r = nRows;
                            }
                        else{
                            var lastRowCellItem = allRows[r-1].cells;
                            var lastRowCellItemLen = lastRowCellItem.length;
                            var baseLineArray = new Array();
                            for(var bas =0; bas<lastRowCellItemLen; bas++){
                                var lastRowLineBase = lastRowCellItem[bas].lines.lastItem().baseline;
                                baseLineArray.push(lastRowLineBase);
//~                                 try{
//~                                     var lastRowLineBase = lastRowCellItem[bas].lines.lastItem().baseline;
//~                                     }
//~                                 catch(e){
//~                                     var lastRowLineBase = 0;
//~                                         }
//~                                 baseLineArray.push(lastRowLineBase);
                                }
                                max = arrayMax(baseLineArray);
                                function arrayMax(arr){
                                    var len = arr.length, max = -Infinity;
                                    while (len--) {
                                        if (arr[len] > max){
                                        max = arr[len];
                                        }
                                    }
                                    return max;
                                };
                            var lastRowMaxLineBase = max;
                            var lastRowBottomInsetAddBase = allRows[r-1].bottomInset + lastRowMaxLineBase + config.continuedStyle.table.footer.tableBottomDefaultGap;
                            var tableFrameCurrBtmBound = tableFrameCurr.geometricBounds[2];
                            var tableFrameCurrInsetSp = tableFrameCurr.textFramePreferences.insetSpacing[2];
                            var tableFrameCurrInsetSpMinHt = tableFrameCurrBtmBound - tableFrameCurrInsetSp;
                            var tbfTopInset = app.activeDocument.cellStyles.itemByName("TBF").properties.topInset;
                            if(!(tableFrameCurrInsetSpMinHt >= lastRowBottomInsetAddBase)){                                
                                var currLastRowFillColor =  allRows[r-2].fillColor.name;
                                //==============================================================================================
                                //Now checking whether the cell count of row 'r-2' is equal to actual table col count, if less then the possiblity would be cell(s) in the previous row(s) will have rowspan, so stepping only one step back 
                                //to indentify the cell which has row span and applying 'tableLastRowStyle' to that also
                                var currRowCellCt = allRows[r-2].cells.length;
                                if (currRowCellCt < currTableClmLen){
                                    var preRowCells = allRows[r-3].cells;
                                    var preRowCellsLen = preRowCells.length;
                                    for (var pr = 0; pr < preRowCellsLen; pr ++){
                                        var currPrevRowCell = preRowCells[pr];
                                        if (currPrevRowCell.rowSpan > 1){
                                            currPrevRowCell.appliedCellStyle = tableLastRowStyle;
                                            }//end of IF
                                        }//end of FOR loop
                                    }//end of IF                                
                                //==============================================================================================
                                lastRowAppliedStyle = allRows[r-2].cells.everyItem().appliedCellStyle = tableLastRowStyle;
                                allRows[r-2].cells.everyItem().fillColor = currLastRowFillColor;
                                var rowColorOnNextFrame = allRows[r-1].fillColor.name;
                                //TBF cell inset top value
//~                                 nextFirstRowAppliedStyle = allRows[r-1].cells.everyItem().appliedCellStyle = "TBF"; //Applied table cell style in the last row here
                                allRows[r-1].cells.everyItem().topInset = tbfTopInset;
                                allRows[r-1].cells.everyItem().topEdgeStrokeWeight = app.activeDocument.cellStyles.itemByName("TBF").topEdgeStrokeWeight;
                               // allRows[r-1].cells.everyItem().fillColor = rowColorOnNextFrame;
                               if (firstItteration){
                                    tableFrameNameCurr.geometricBounds = [tableFrameNameCurr.geometricBounds[0], tableFrameNameCurr.geometricBounds[1], tableFrameNameCurr.geometricBounds[2] - 6, tableFrameNameCurr.geometricBounds[3]];
                                   }
                               tableFrameNameCurr.fit(FitOptions.FRAME_TO_CONTENT)
                                }
                            else{
                                var currLastRowFillColor =  allRows[r-1].fillColor.name;
                                //==============================================================================================
                                //Now checking whether the cell count of row 'r-1' is equal to actual table col count, if less then the possiblity would be cell(s) in the previous row(s) will have rowspan, so stepping only one step back 
                                //to indentify the cell which has row span and applying 'tableLastRowStyle' to that also
                                var currRowCellCt = allRows[r-1].cells.length;
                                if (currRowCellCt < currTableClmLen){
                                    var preRowCells = allRows[r-2].cells;
                                    var preRowCellsLen = preRowCells.length;
                                    for (var pr = 0; pr < preRowCellsLen; pr ++){
                                        var currPrevRowCell = preRowCells[pr];
                                        if (currPrevRowCell.rowSpan > 1){
                                            currPrevRowCell.appliedCellStyle = tableLastRowStyle;
                                            }//end of IF
                                        }//end of FOR loop
                                    }//end of IF                                
                                //==============================================================================================
                                var spanCell = allRows[r-2].cells[5];
                                lastRowAppliedStyle = allRows[r-1].cells.everyItem().appliedCellStyle = tableLastRowStyle; //Applied table cell style in the last row here
                                allRows[r-1].cells.everyItem().fillColor = currLastRowFillColor;
                                var rowColorOnNextFrame = allRows[r].fillColor.name;
                                //nextFirstRowAppliedStyle = allRows[r].cells.everyItem().appliedCellStyle = "TBF"; //Applied table cell style in the last row here
//~                                 allRows[r].cells.everyItem().fillColor = rowColorOnNextFrame;
                                allRows[r].cells.everyItem().topInset = tbfTopInset;
                                allRows[r].cells.everyItem().topEdgeStrokeWeight = app.activeDocument.cellStyles.itemByName("TBF").topEdgeStrokeWeight;
                                tableFrameNameCurr.fit(FitOptions.FRAME_TO_CONTENT)
                                }
                            }
                        break;
                    }//end if
                 }
            }
        }
    tableFrameCurr.fit(FitOptions.FRAME_TO_CONTENT);
//************************ Start - Applied table cell style in the last row here *******************************************      
    curTableWidth = curTable['width']; //Get to current table full width
    var tableFrameCurrBoundValueY1 = tableFrameCurr.geometricBounds[0]; //Get Current Frame page zise Y1 value.
    var tableFrameCurrBoundValueX1 = tableFrameCurr.geometricBounds[1]; //Get Current Frame page zise X1 value.
    var tableFrameCurrBoundValueY2 = tableFrameCurr.geometricBounds[2]; //Get Current Frame page zise Y2 value.
    var tableFrameCurrBoundValueX2 = tableFrameCurr.geometricBounds[3]; //Get Current Frame page zise X2 value.
    continueText = config.continuedStyle.table.footer['continuedText']; //Get config footer continued text here.
    var openBracket = continueText.split("<i>")[0];
    var splitText = continueText.split("<i>")[1];
    var contText = splitText.split("</i>")[0];
    var closeBracket = splitText.split("</i>")[1]; //Split continued text here;
    var continuedTextStyleInsetPref = curDoc.objectStyles.itemByName('TBL_CONT_BOTTOM').textFramePreferences.insetSpacing;
    continueTextAdd =  curDoc.pages.itemByName(currPageName).textFrames.add({geometricBounds: [tableFrameCurrBoundValueY1+tableFrameCurrBoundValueY2, tableFrameCurrBoundValueX1, tableFrameCurrBoundValueY2-continuedTextStyleInsetPref[2], tableFrameCurrBoundValueX1+curTableWidth+continuedTextStyleInsetPref[3]]}); //Create continued text text frame here.
    continueTextAdd.geometricBounds = [tableFrameCurrBoundValueY1+tableFrameCurrBoundValueY2, tableFrameCurrBoundValueX1, tableFrameCurrBoundValueY2-continuedTextStyleInsetPref[2], tableFrameCurrBoundValueX1+curTableWidth+continuedTextStyleInsetPref[3]];
    continueTextAdd.contents = contText; //Place continued here.
    continueTextAdd.paragraphs[0].appliedCharacterStyle = continuedTextStyle;
    continueTextAdd.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN; //Continue style bottom align here.
    continueTextAdd.textFramePreferences.firstBaselineOffset=FirstBaseline.LEADING_OFFSET; //Continue style offset Leading here.
    continueTextAdd.parentStory.justification=Justification.RIGHT_ALIGN; //Continue style right align here.
    continueTextAdd.textFramePreferences.ignoreWrap = true;
    continueTextAdd.fit(FitOptions.FRAME_TO_CONTENT);
//******************* Start Group *********************   
    if(firstItteration){
        tableFrameCurrGroup = new Array(); //Add the items to the array
        tableFrameCurrGroup.push(tableFrameCurr);
        tableFrameCurrGroup.push(continueTextAdd);
        tblNContGroup = curDoc.groups.add(tableFrameCurrGroup) // Group text frame here
        var tblNContGroupBounds = tblNContGroup.geometricBounds;
        floatBlockHt = tblNContGroupBounds[2] - tblNContGroupBounds[0];
        floatBlockWd = tblNContGroupBounds[3] - tblNContGroupBounds[1];
        floatBlockArea = floatBlockHt * floatBlockWd;
        tempFigureFrmID = tblNContGroup.id;
        tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
        //bottom wrap of the float will be extended upto full page height, to do that getting the page text area height and then reducing that to float height 
        var pageMaxHt = config.columnDetails[0].height;
        var bottomWrap = pageMaxHt - floatBlockHt;
        tblNContGroup.textWrapPreferences.textWrapOffset = [config.wrapAroundFloat.top, config.wrapAroundFloat.left, bottomWrap, config.wrapAroundFloat.right];
        currCitBlkHt = currCitBlkHt;
        currCitBlkArea = 0;
        //checking whether the float should be set in landscape
        if (config.rotateFloat){
           currFloatWd = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
           currFloatHt = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
           tblNContGroup.rotationAngle = 90;
           //after rotating the float width and height of the float will be trasposed
           var tempWd = currFloatHt;
           var tempHt = currFloatWd;
            currFloatWd = tempHt;
            currFloatHt = tempWd;
            tblNContGroup.fit(FitOptions.FRAME_TO_CONTENT);                                
            htAfterRotate = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
            wdAfterRotate = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
            var singleClmMaxWidth = config.columnSpanWidth[0][0].width;
            var twoThirdClmMaxWidth = config.landscape.twoThirdWidth;
            var textAreaWidth = config.columnSpanWidth[config.columnSpanWidth.length - 1][0].width;
            //calculating current group's height
            floatBlockHt = (tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0]);
            if (floatBlockHt + wrapBottom> config.columnDetails[0].height){
                var htDiff = (parseFloat(floatBlockHt) + parseFloat(wrapBottom)) - parseFloat(config.columnDetails[0].height);
                floatBlockHt = parseFloat(floatBlockHt) + parseFloat(htDiff);
                }//end of IF
            else {
                floatBlockHt = floatBlockHt + wrapBottom;
                }//end of ELSE IF
            //then the height of the float would be in possible three variant 1) span to full page, 2) span to column single column (if style allows) and 3) two-third width of the page (if style allows)
            //to do so we need to calculate the current height (will be changed as width after rotated)
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
            if (config.landscape.singleColumnStyle && (wdAfterRotate <= singleClmMaxWidth)){//if this condition is true then the float could be placed in single colmn
                floatSpnTo = floatSpnTo -1;
                wdDiff = singleClmMaxWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of IF
            else if (config.landscape.twoThirdColumnStyle && (wdAfterRotate <= (twoThirdClmMaxWidth - wrapBottom)) && (wdAfterRotate > singleClmMaxWidth)){//if this condition is true then the float could be place as two-third width table
                wdSplitEqually = 0;
                tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, config.columnDetails[floatSpnTo].gutter, wrapRight];//resetting wrap values for left and right after rotating;
                }//end of ELSE
            else {
                wdDiff = textAreaWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of ESLE
            }//end of IF
        if(defaultFloatContCt != 0)
            {
            currPageCitationCont = currPageCitation + "_" + defaultFloatContCt;
            }
        else {
            currPageCitationCont = currPageCitation;
            }
        config.placingInline = '';
        config.placingSequence = '';
        config.preferredOnColumn = '';
        config.preferredOnCurrentPage = '';
        config.continuedFloatSpan = floatSpnTo;
        config.docFloatIDsArray[currPageCitationCont] = {"citationOnColumn":hzc,"citationBlockHeight":currCitBlkHt,"citationBlockArea":currCitBlkArea,"floatBlockHeight":floatBlockHt, "floatBlockWidth":floatBlockWd, "floatBlockArea":floatBlockArea,"floatSpanTo":floatSpnTo,"frameID":tempFigureFrmID, "floatPlaceFrom":'', "onPage":currPageName, "currCitBaseline":currCitBaseline, "floatRotated":config.rotateFloat, "landscapeAdditionalOffset":parseInt(wdSplitEqually*100)/100, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":config.placingSequence, "preferredOnColumn":config.preferredOnColumn, "preferredOnCurrentPage":config.preferredOnCurrentPage, "placingInline":config.placingInline, "currFloatClassName":config.currFloatClassName};//pushing collected citations into an array, "frameName":respectiveFloat
        if(config.continuedFloatSpan == 0 && config.stopPlacementForContinuedFloats == true){
            config.pageFloatIDsArray = config.pageFloatIDsArray.concat([currPageCitationCont]);
            }
        else {
            config.notPlacedFloatsIDs =config.notPlacedFloatsIDs.concat([currPageCitationCont]);//assuming that the continued float could not be placed on the same where it is cited and so storing the data in 'notPlacedFloatsIDs'
            config.stopPlacementForContinuedFloats = false;
            }
        defaultFloatContCt++;
        }//end of IF
    else{
        tableFrameCurrGroup = new Array(); //Add the items to the array
        tableFrameCurrGroup.push(continueCapAdd);
        tableFrameCurrGroup.push(tableFrameCurr);
        tableFrameCurrGroup.push(continueTextAdd);
        tblNContGroup = curDoc.groups.add(tableFrameCurrGroup) // Group text frame here
        tempFigureFrmID = tblNContGroup.id;
        if (config.rotateFloat){
           currFloatWd = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
           currFloatHt = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];           
           tblNContGroup.rotationAngle = 90;
           //after rotating the float width and height of the float will be trasposed
           var tempWd = currFloatHt;
           var tempHt = currFloatWd
            currFloatWd = tempHt;
            currFloatHt = tempWd;
            tblNContGroup.fit(FitOptions.FRAME_TO_CONTENT);                                
            htAfterRotate = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
            wdAfterRotate = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
            var singleClmMaxWidth = config.columnSpanWidth[0][0].width;
            var twoThirdClmMaxWidth = config.landscape.twoThirdWidth;
            var textAreaWidth = config.columnSpanWidth[config.columnSpanWidth.length - 1][0].width;
            //calculating current group's height
            floatBlockHt = (tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0]);
            if (floatBlockHt + wrapBottom> config.columnDetails[0].height){
                var htDiff = (parseFloat(floatBlockHt) + parseFloat(wrapBottom)) - parseFloat(config.columnDetails[0].height);
                floatBlockHt = parseFloat(floatBlockHt) + parseFloat(htDiff);
                }//end of IF
            else {
                floatBlockHt = floatBlockHt + wrapBottom;
                }//end of ELSE IF
            //then the height of the float would be in possible three variant 1) span to full page, 2) span to column single column (if style allows) and 3) two-third width of the page (if style allows)
            //to do so we need to calculate the current height (will be changed as width after rotated)
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
            if (config.landscape.singleColumnStyle && (wdAfterRotate <= singleClmMaxWidth)){//if this condition is true then the float could be placed in single colmn
                floatSpnTo = floatSpnTo -1;
                wdDiff = singleClmMaxWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of IF
            else if (config.landscape.twoThirdColumnStyle && (wdAfterRotate <= (twoThirdClmMaxWidth - wrapBottom)) && (wdAfterRotate > singleClmMaxWidth)){//if this condition is true then the float could be place as two-third width table
                wdSplitEqually = 0;
                tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, config.columnDetails[floatSpnTo].gutter, wrapRight];//resetting wrap values for left and right after rotating;
                }//end of ELSE
            else {
                wdDiff = textAreaWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of ESLE
            }//end of IF
        else {
            var tblNContGroupBounds = tblNContGroup.geometricBounds;
            floatBlockHt = tblNContGroupBounds[2] - tblNContGroupBounds[0];
            floatBlockWd = tblNContGroupBounds[3] - tblNContGroupBounds[1];
            floatBlockArea = floatBlockHt * floatBlockWd;
            tempFigureFrmID = tblNContGroup.id;
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
            //bottom wrap of the float will be extended upto full page height, to do that getting the page text area height and then reducing that to float height 
            var pageMaxHt = config.columnDetails[0].height;
            var bottomWrap = pageMaxHt - floatBlockHt;
            tblNContGroup.textWrapPreferences.textWrapOffset = [config.wrapAroundFloat.top, config.wrapAroundFloat.left, bottomWrap, config.wrapAroundFloat.right];
        }
        if(defaultFloatContCt != 0)
            {
            currPageCitationCont = currPageCitation + "_" + defaultFloatContCt;
            }
        else {
            currPageCitationCont = currPageCitation;
            }
        config.placingInline = '';
        config.placingSequence = '';
        config.preferredOnColumn = '';
        config.preferredOnCurrentPage = '';
        config.docFloatIDsArray[currPageCitationCont] = {"citationOnColumn":hzc,"citationBlockHeight":currCitBlkHt,"citationBlockArea":currCitBlkArea,"floatBlockHeight":floatBlockHt, "floatBlockWidth":floatBlockWd, "floatBlockArea":floatBlockArea,"floatSpanTo":floatSpnTo,"frameID":tempFigureFrmID, "floatPlaceFrom":'', "onPage":currPageName, "currCitBaseline":currCitBaseline, "floatRotated":config.rotateFloat, "landscapeAdditionalOffset":parseInt(wdSplitEqually*100)/100, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":config.placingSequence, "preferredOnColumn":config.preferredOnColumn, "preferredOnCurrentPage":config.preferredOnCurrentPage, "placingInline":config.placingInline, "currFloatClassName":config.currFloatClassName};//pushing collected citations into an array, "frameName":respectiveFloat
        if(config.continuedFloatSpan == 0 && config.stopPlacementForContinuedFloats == true){
            config.pageFloatIDsArray = config.pageFloatIDsArray.concat([currPageCitationCont]);
            }
        else {
            config.notPlacedFloatsIDs =config.notPlacedFloatsIDs.concat([currPageCitationCont]);//assuming that the continued float could not be placed on the same where it is cited and so storing the data in 'notPlacedFloatsIDs'
            config.stopPlacementForContinuedFloats = false;
            config.lastFloatMovedToFloatNotOnCurrPage = true;
            }
        defaultFloatContCt++;
        }//end of ELSE
//******************* End Group *********************                                
    var repeatheader = config.continuedStyle.table.header['repeat-header'];
    if(repeatheader == true){
        var tableTittleText = config.continuedStyle.table.header['continuedText']; //Get config header continued text here.
        var tableTittleRepLabCapPatt = new RegExp(/(^\w+ \[ID\]. \[CAPTION\])/g); //Read config file and get RegExp pattent here. (Table  Label and Caption text)
        var tableTittleRepLabPatt = new RegExp(/(^\w+ \[ID\].)/g); //Read config file and get RegExp pattent here. (Table Label text)
        var tableTittleRepContPatt = new RegExp(/(\(<[a-z]+>\w+<\/[a-z]+>\))/g); //Read config file and get RegExp pattent here. (Continued text)
        var tableTittleRepEnspPatt = new RegExp(/\[(\w\w)(\w\w)]/g); //Read config file and get RegExp pattent here. (Spacing value text)
        var matchedpatt, contText, continueCapAddBoundValueY1, continueCapAddBoundValueX1, continueCapAddBoundValueY2, continueCapAddBoundValueX2, addLabelGroupTextFrame;
        if(tableTittleRepLabCapPatt.test(tableTittleText)){
        matchedpatt = tableTittleRepLabCapPatt;
        contText = tableTittleText.replace(matchedpatt, '') //Here with get continued text only.
            var fullContent, symbol;
                fullContent = contText.split("]")[1];
                    var headOpenBracket = fullContent.split("<i>")[0];
                    var headSplitText = fullContent.split("</i>")[0];
                    var headContText = fullContent.split("<i>")[1];
                    var headContText = headContText.split("</i>")[0];
                    var headCloseBracket = fullContent.split("</i>")[1]; //Split continued text here
                        var findSymbol = contText.split("(")[0]; 
                            if(findSymbol == "[ensp]"){
                                symbol = SpecialCharacters.EN_SPACE; //Here with read config file space value and replace with symbol
                            }
                            else if(findSymbol == "[emsp]"){
                                symbol = SpecialCharacters.EM_SPACE; //Here with read config file space value and replace with symbol
                            }
                            else if(findSymbol == "[sp]"){
                                symbol = findSymbol.replace(findSymbol, ' ') //Here with read config file space value and replace with symbol
                            }
        app.findTextPreferences = NothingEnum.nothing;
        app.findTextPreferences.appliedParagraphStyle = floatCapPstyle;
        var results = tableFrameNameCurr.findText(); //Find content based on the paragraphs syle (Caption style)
            for(var i=0; i<results.length; i++) {
                var tableFrameNameCurrCap = results[i];//.contents; //Get content based on the paragraphs syle (Caption Text)
                    var tableFrameNextBoundValueY1 = tableFrameNext.geometricBounds[0]; //Get Next Frame page zise Y1 value.
                    var tableFrameNextBoundValueX1 = tableFrameNext.geometricBounds[1]; //Get Next Frame page zise X1 value.
                    var tableFrameNextBoundValueY2 = tableFrameNext.geometricBounds[2]; //Get Next Frame page zise Y2 value.
                    var tableFrameNextBoundValueX2 = tableFrameNext.geometricBounds[3]; //Get Next Frame page zise X2 value.
                        continueCapAdd =  curDoc.pages.itemByName(currPageName).textFrames.add({geometricBounds: [tableFrameNextBoundValueY1-tableFrameNextBoundValueY2, tableFrameNextBoundValueX1, tableFrameNextBoundValueY2+tableFrameNextBoundValueY1, tableFrameNextBoundValueX1]}); //Create continued text text frame here.
                        continueCapAdd.move([tableFrameNextBoundValueX1, tableFrameNextBoundValueY1-tableFrameNextBoundValueY2]);
                        tableFrameNameCurrCap.duplicate(LocationOptions.AT_END, continueCapAdd.insertionPoints[0])
                        continueCapAdd.paragraphs[0].characters.lastItem().insertionPoints[0].contents = symbol;
                        continueCapAdd.paragraphs[0].characters.lastItem().insertionPoints[0].contents = headContText;
                        app.findGrepPreferences = NothingEnum.nothing; app.changeGrepPreferences = NothingEnum.nothing;
                        app.findGrepPreferences.findWhat = "\\r";
                        app.changeGrepPreferences.changeTo = ""
                        continueCapAdd.changeGrep(); //Remove unwanted enter mark here.
                        continueCapAdd.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN; //Continue style top align here.
                        continueCapAdd.textFramePreferences.firstBaselineOffset=FirstBaseline.ASCENT_OFFSET; //Continue style offset Asvent here.
                        continueCapAdd.parentStory.justification=Justification.LEFT_ALIGN; //Continue style left align here.
                        continueCapAdd.textFramePreferences.ignoreWrap = true;
                        continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
                        continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
                        groupTableFrameNext = new Array(); //Add the items to the array - Align spacing.
                        groupTableFrameNext.push(tableFrameNext);
                        groupTableFrameNext.push(continueCapAdd);
                        curDoc.distribute(groupTableFrameNext, DistributeOptions.VERTICAL_SPACE, AlignDistributeBounds.MARGIN_BOUNDS, true); //Fixed for Distribute spacing top of table text frame here.
                        continueCapAddBoundValueY1 = continueCapAdd.geometricBounds[0];
                        continueCapAddBoundValueX1 = continueCapAdd.geometricBounds[1];
                        continueCapAddBoundValueY2 = continueCapAdd.geometricBounds[2]+tableHeaderBelowSp-continueCapAddBoundValueY1;
                        continueCapAddBoundValueX2 = continueCapAdd.geometricBounds[3];
                        var tableFrameNextHeight = tableFrameNext;  
                            if(tableFrameNextHeight instanceof TextFrame) {
                                var tableFrameNextBound = tableFrameNextHeight.geometricBounds;  
                                    tableFrameNextHeight.geometricBounds = [tableFrameNextBound[0], tableFrameNextBound[1], tableFrameNextBound[2]-continueCapAddBoundValueY2, tableFrameNextBound[3]];
                               }//end IF
                }//end FOR
        }//end IF
        else if(tableTittleRepLabPatt.test(tableTittleText)){
            matchedpatt = tableTittleRepLabPatt;
            contText = tableTittleText.replace(matchedpatt, '') //Here with get label text only.
            var fullContent, symbol;
            fullContent = contText.split("]")[1];
            var headOpenBracket = fullContent.split("<i>")[0];
            var headSplitText = fullContent.split("</i>")[0];
            var headContText = fullContent.split("<i>")[1];
            var headContText = headContText.split("</i>")[0];
            var headCloseBracket = fullContent.split("</i>")[1];
            fullContent = contText.split("(")[0]; //Split continued text here
            var findSymbol = contText.split("(")[0];
                if(findSymbol == "[ensp]"){
                    symbol = SpecialCharacters.EN_SPACE; //Here with read config file space value and replace with symbol
                }
                else if(findSymbol == "[emsp]"){
                    symbol = SpecialCharacters.EM_SPACE; //Here with read config file space value and replace with symbol
                }
                else if(findSymbol == "[sp]"){
                    symbol = findSymbol.replace(findSymbol, ' ') //Here with read config file space value and replace with symbol
                }
            var tableLabelStyle = config.continuedStyle.table.header['tableLabelStyle']; //Table Header Below Space
            app.findTextPreferences = NothingEnum.nothing;
            app.findTextPreferences.appliedCharacterStyle = tableLabelStyle;
            var results = tableFrameNameCurr.findText(); //Find content based on the character syle (Label style)
            for(var i=0; i<results.length; i++) {
                var tableFrameNameCurrCap = results[i]; //Get content based on the character syle (Label Text)
                var tableFrameNextBoundValueY1 = tableFrameNext.geometricBounds[0]; //Get Next Frame page zise Y1 value.
                var tableFrameNextBoundValueX1 = tableFrameNext.geometricBounds[1]; //Get Next Frame page zise X1 value.
                var tableFrameNextBoundValueY2 = tableFrameNext.geometricBounds[2]; //Get Next Frame page zise Y2 value.
                var tableFrameNextBoundValueX2 = tableFrameNext.geometricBounds[3]; //Get Next Frame page zise X2 value.
                continueCapAdd =  curDoc.pages.itemByName(currPageName).textFrames.add({geometricBounds: [tableFrameNextBoundValueY1-tableFrameNextBoundValueY2, tableFrameNextBoundValueX1, tableFrameNextBoundValueY2+tableFrameNextBoundValueY1, tableFrameNextBoundValueX2]}); //Create continued text text frame here.
                continueCapAdd.move([tableFrameNextBoundValueX1, tableFrameNextBoundValueY1-tableFrameNextBoundValueY2])
                tableFrameNameCurrCap.duplicate(LocationOptions.AT_END, continueCapAdd.insertionPoints[0])
                continueCapAdd.paragraphs[0].characters.lastItem().insertionPoints[0].contents = symbol;
                try{
                    continueCapAdd.appliedObjectStyle = curDoc.objectStyles.itemByName(floatCapObjStyle);
                }catch(e){};
                var contStyle = continueCapAdd.paragraphs[0].characters.lastItem().insertionPoints[0].contents = headContText;
                app.findTextPreferences = NothingEnum.nothing; app.changeTextPreferences = NothingEnum.nothing;
                var tableContinuedStyle = config.continuedStyle.table.header['tableContinuedStyle']; //Table Header Below Space
                app.findTextPreferences.findWhat = contStyle;
                app.changeTextPreferences.appliedCharacterStyle = tableContinuedStyle;
                continueCapAdd.changeText(); //Remove unwanted enter mark here
                continueCapAdd.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN; //Continue style top align here.
                continueCapAdd.textFramePreferences.firstBaselineOffset=FirstBaseline.ASCENT_OFFSET; //Continue style offset Asvent here.
                continueCapAdd.parentStory.justification=Justification.LEFT_ALIGN; //Continue style left align here.
                continueCapAdd.textFramePreferences.ignoreWrap = true;
                continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
                continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
                groupTableFrameNext = new Array(); //Add the items to the array.
                groupTableFrameNext.push(tableFrameNext);
                groupTableFrameNext.push(continueCapAdd);
                curDoc.distribute(groupTableFrameNext, DistributeOptions.VERTICAL_SPACE, AlignDistributeBounds.MARGIN_BOUNDS, true); //Fixed for Distribute spacing top of table text frame here.
                continueCapAddBoundValueY1 = continueCapAdd.geometricBounds[0];
                continueCapAddBoundValueX1 = continueCapAdd.geometricBounds[1];
                continueCapAddBoundValueY2 = continueCapAdd.geometricBounds[2]+tableHeaderBelowSp-continueCapAddBoundValueY1;
                continueCapAddBoundValueX2 = continueCapAdd.geometricBounds[3];
                var tableFrameNextHeight = tableFrameNext;  
                if(tableFrameNextHeight instanceof TextFrame) {
                    var tableFrameNextBound = tableFrameNextHeight.geometricBounds;  
                    tableFrameNextHeight.geometricBounds = [tableFrameNextBound[0], tableFrameNextBound[1], tableFrameNextBound[2]-continueCapAddBoundValueY2, tableFrameNextBound[3]];
                } //end IF
            }// end FOR
          }//end Else if
        else if(tableTittleRepContPatt.test(tableTittleText)){
            matchedpatt = tableTittleRepContPatt;
            contText = tableTittleText.match(tableTittleRepContPatt); //Only for match Continued Text here.
            var getCountText = contText[0]; //Only for get Continued Text here.
            var headOpenBracket = getCountText.split("<i>")[0];
            var contText = getCountText.split("<i>")[1];
            var headContText = contText.split("</i>")[0];
            var headCloseBracket = contText.split("</i>")[1]; //Split continued text here
            var tableFrameNextBoundValueY1 = tableFrameNext.geometricBounds[0]; //Get Next Frame page zise Y1 value.
            var tableFrameNextBoundValueX1 = tableFrameNext.geometricBounds[1]; //Get Next Frame page zise X1 value.
            var tableFrameNextBoundValueY2 = tableFrameNext.geometricBounds[2]; //Get Next Frame page zise Y2 value.
            var tableFrameNextBoundValueX2 = tableFrameNext.geometricBounds[3]; //Get Next Frame page zise X2 value.
            continueCapAdd =  curDoc.pages.itemByName(currPageName).textFrames.add({geometricBounds: [tableFrameNextBoundValueY1-tableFrameNextBoundValueY2, tableFrameNextBoundValueX1, tableFrameNextBoundValueY2+tableFrameNextBoundValueY1, tableFrameNextBoundValueX1]}); //Create continued text text frame here.
            continueCapAdd.move([tableFrameNextBoundValueX1, tableFrameNextBoundValueY1-tableFrameNextBoundValueY2]);
            continueCapAdd.contents = headOpenBracket+headContText+headCloseBracket; //Place continued text.
            continueCapAdd.paragraphs[0].appliedCharacterStyle = continuedTextStyle;  //Applied for character syle.
            continueCapAdd.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN; //Continue style top align here.
            continueCapAdd.textFramePreferences.firstBaselineOffset=FirstBaseline.ASCENT_OFFSET; //Continue style offset Asvent here.
            continueCapAdd.parentStory.justification=Justification.LEFT_ALIGN; //Continue style left align here.
            continueCapAdd.textFramePreferences.ignoreWrap = true;
            continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;                      
            continueCapAdd.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
            groupTableFrameNext = new Array(); //Add the items to the array.
            groupTableFrameNext.push(tableFrameNext);
            groupTableFrameNext.push(continueCapAdd);
            curDoc.distribute(groupTableFrameNext, DistributeOptions.VERTICAL_SPACE, AlignDistributeBounds.MARGIN_BOUNDS, true); //Fixed for Distribute spacing top of table text frame here.
            continueCapAddBoundValueY1 = continueCapAdd.geometricBounds[0];
            continueCapAddBoundValueX1 = continueCapAdd.geometricBounds[1];
            continueCapAddBoundValueY2 = continueCapAdd.geometricBounds[2]+tableHeaderBelowSp-continueCapAddBoundValueY1;
            continueCapAddBoundValueX2 = continueCapAdd.geometricBounds[3];
            var tableFrameNextHeight = tableFrameNext;  
            if(tableFrameNextHeight instanceof TextFrame){
                var tableFrameNextBound = tableFrameNextHeight.geometricBounds;  
                tableFrameNextHeight.geometricBounds = [tableFrameNextBound[0], tableFrameNextBound[1], tableFrameNextBound[2]-continueCapAddBoundValueY2, tableFrameNextBound[3]];
                  }//end IF
              }//end Else IF
        tableFrameCurrBelowDistributeSp = new Array(); //Add the items to the array - Align spacing.
        tableFrameCurrBelowDistributeSp.push(tableFrameNext);
        tableFrameCurrBelowDistributeSp.push(continueCapAdd);
        app.alignDistributePreferences.distributeSpaceAbsoluteMeasurement = tableHeaderBelowSp;
    } 
  } //End If
    tableFrameCurr = tableFrameNext;
    if(tableFrameCurr.parentStory.overflows){
        app.activeDocument.recompose();
        var tblNContGroupBounds = tblNContGroup.geometricBounds;
        floatBlockHt = tblNContGroupBounds[2] - tblNContGroupBounds[0];
        floatBlockWd = tblNContGroupBounds[3] - tblNContGroupBounds[1];
        floatBlockArea = floatBlockHt * floatBlockWd;
        tempFigureFrmID = tblNContGroup.id;
        //bottom wrap of the float will be extended upto full page height, to do that getting the page text area height and then reducing that to float height 
        var pageMaxHt = config.columnDetails[0].height;
        var bottomWrap = pageMaxHt - floatBlockHt;
        if (!config.rotateFloat){
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
            tblNContGroup.textWrapPreferences.textWrapOffset = [config.wrapAroundFloat.top, config.wrapAroundFloat.left, bottomWrap, config.wrapAroundFloat.right];
            }
        currCitBlkHt = 0;
        currCitBlkArea = 0;
        floatContinuedBlock(tableFrameNameCurr, currPageName, tblObjStyle, floatCapPstyle, floatCapObjStyle, tableFrameCurr, false, currPageCitationCont, hzc, floatSpnTo, currCitBaseline, rotateFloat, wdSplitEqually, defaultFloatContCt, currCitBlkHt, boundsForContFrms, continueCapAdd);        }
    else{
        var tblObjBottomInset = config.currDoc.objectStyles.itemByName('TBL').textFramePreferences.insetSpacing[2];
        tableFrameNext.textFramePreferences.insetSpacing = [tableFrameNext.textFramePreferences.insetSpacing[0], tableFrameNext.textFramePreferences.insetSpacing[1], tblObjBottomInset, tableFrameNext.textFramePreferences.insetSpacing[3]];
        tableFrameNext.fit(FitOptions.FRAME_TO_CONTENT);
        tableFrameCurrGroup = new Array(); //Add the items to the array
        tableFrameCurrGroup.push(continueCapAdd);
        tableFrameCurrGroup.push(tableFrameCurr);
        var tblNContGroup = curDoc.groups.add(tableFrameCurrGroup) // Group text frame here            
        var tblNContGroupBounds = tblNContGroup.geometricBounds;
        floatBlockHt = tblNContGroupBounds[2] - tblNContGroupBounds[0];
        floatBlockWd = tblNContGroupBounds[3] - tblNContGroupBounds[1];
        floatBlockArea = floatBlockHt * floatBlockWd;
        tempFigureFrmID = tblNContGroup.id;
        //bottom wrap of the float will be extended upto full page height, to do that getting the page text area height and then reducing that to float height 
        tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
        var pageMaxHt = config.columnDetails[0].height;
        var bottomWrap = pageMaxHt - floatBlockHt;
        if (!config.rotateFloat){
            tblNContGroup.textWrapPreferences.textWrapOffset = [config.wrapAroundFloat.top, config.wrapAroundFloat.left, config.wrapAroundFloat.bottom, config.wrapAroundFloat.right];
            }
        currCitBlkHt = 0;
        currCitBlkArea = 0;
        if (config.rotateFloat && !firstItteration){
           currFloatWd = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
           currFloatHt = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
           tblNContGroup.rotationAngle = 90;
           //after rotating the float width and height of the float will be trasposed
           var tempWd = currFloatHt;
           var tempHt = currFloatWd
            currFloatWd = tempHt;
            currFloatHt = tempWd;
            tblNContGroup.fit(FitOptions.FRAME_TO_CONTENT);                                
            htAfterRotate = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
            wdAfterRotate = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
            var singleClmMaxWidth = config.columnSpanWidth[0][0].width;
            var twoThirdClmMaxWidth = config.landscape.twoThirdWidth;
            var textAreaWidth = config.columnSpanWidth[config.columnSpanWidth.length - 1][0].width;
            //calculating current group's height
            floatBlockHt = (tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0]);
            if (floatBlockHt + wrapBottom> config.columnDetails[0].height){
                var htDiff = (parseFloat(floatBlockHt) + parseFloat(wrapBottom)) - parseFloat(config.columnDetails[0].height);
                floatBlockHt = parseFloat(floatBlockHt) + parseFloat(htDiff);
                }//end of IF
            else {
                floatBlockHt = floatBlockHt + wrapBottom;
                }//end of ELSE IF
            //then the height of the float would be in possible three variant 1) span to full page, 2) span to column single column (if style allows) and 3) two-third width of the page (if style allows)
            //to do so we need to calculate the current height (will be changed as width after rotated)
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
            if (config.landscape.singleColumnStyle && (wdAfterRotate <= singleClmMaxWidth)){//if this condition is true then the float could be placed in single colmn
                floatSpnTo = floatSpnTo -1;
                wdDiff = singleClmMaxWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of IF
            else if (config.landscape.twoThirdColumnStyle && (wdAfterRotate <= (twoThirdClmMaxWidth - wrapBottom)) && (wdAfterRotate > singleClmMaxWidth)){//if this condition is true then the float could be place as two-third width table
                wdSplitEqually = 0;
                tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, config.columnDetails[floatSpnTo].gutter, wrapRight];//resetting wrap values for left and right after rotating;
                }//end of ELSE
            else {
                wdDiff = textAreaWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of ESLE
            }//end of IF
        else if (config.rotateFloat){
           currFloatWd = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
           currFloatHt = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
           tblNContGroup.rotationAngle = 90;
           //after rotating the float width and height of the float will be trasposed
           var tempWd = currFloatHt;
           var tempHt = currFloatWd;
            currFloatWd = tempHt;
            currFloatHt = tempWd;
            tblNContGroup.fit(FitOptions.FRAME_TO_CONTENT);                                
            htAfterRotate = tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0];
            wdAfterRotate = tblNContGroup.geometricBounds[3] - tblNContGroup.geometricBounds[1];
            var singleClmMaxWidth = config.columnSpanWidth[0][0].width;
            var twoThirdClmMaxWidth = config.landscape.twoThirdWidth;
            var textAreaWidth = config.columnSpanWidth[config.columnSpanWidth.length - 1][0].width;
            //calculating current group's height
            floatBlockHt = (tblNContGroup.geometricBounds[2] - tblNContGroup.geometricBounds[0]);
            if (floatBlockHt + wrapBottom> config.columnDetails[0].height){
                var htDiff = (parseFloat(floatBlockHt) + parseFloat(wrapBottom)) - parseFloat(config.columnDetails[0].height);
                floatBlockHt = parseFloat(floatBlockHt) + parseFloat(htDiff);
                }//end of IF
            else {
                floatBlockHt = floatBlockHt + wrapBottom;
                }//end of ELSE IF
            //then the height of the float would be in possible three variant 1) span to full page, 2) span to column single column (if style allows) and 3) two-third width of the page (if style allows)
            //to do so we need to calculate the current height (will be changed as width after rotated)
            tblNContGroup.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
            if (config.landscape.singleColumnStyle && (wdAfterRotate <= singleClmMaxWidth)){//if this condition is true then the float could be placed in single colmn
                floatSpnTo = floatSpnTo -1;
                wdDiff = singleClmMaxWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of IF
            else if (config.landscape.twoThirdColumnStyle && (wdAfterRotate <= (twoThirdClmMaxWidth - wrapBottom)) && (wdAfterRotate > singleClmMaxWidth)){//if this condition is true then the float could be place as two-third width table
                wdSplitEqually = 0;
                tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, config.columnDetails[floatSpnTo].gutter, wrapRight];//resetting wrap values for left and right after rotating;
                }//end of ELSE
            else {
                wdDiff = textAreaWidth - wdAfterRotate; 
                wdSplitEqually = wdDiff/2;//this is the amount of wrap value required to add if the landscape float should be placed to the center of the page
                if (config.landscape.horizontalCenter){
                    tblNContGroup.textWrapPreferences.textWrapOffset = [wdSplitEqually, wrapLeft, wdSplitEqually, wrapRight];//resetting wrap values for left and right after rotating;
                    }//end of IF
                else {
                    tblNContGroup.textWrapPreferences.textWrapOffset = [0, wrapLeft, wdDiff, wrapRight];//resetting wrap values for left and right after rotating;
                    wdSplitEqually = 0;
                    }//end of ELSE
                }//end of ESLE
            }//end of ELSE IF
        if(defaultFloatContCt != 0)
            {
            currPageCitationCont = currPageCitation + "_" + defaultFloatContCt;
            }
        else {
            currPageCitationCont = currPageCitation;
            }
        config.placingInline = '';
        config.placingSequence = '';
        config.preferredOnColumn = '';
        config.preferredOnCurrentPage = '';
        config.docFloatIDsArray[currPageCitationCont] = {"citationOnColumn":hzc,"citationBlockHeight":currCitBlkHt,"citationBlockArea":currCitBlkArea,"floatBlockHeight":floatBlockHt, "floatBlockWidth":floatBlockWd, "floatBlockArea":floatBlockArea,"floatSpanTo":floatSpnTo,"frameID":tempFigureFrmID, "floatPlaceFrom":'', "onPage":currPageName, "currCitBaseline":currCitBaseline, "floatRotated":config.rotateFloat, "landscapeAdditionalOffset":parseInt(wdSplitEqually*100)/100, "wrapTop":wrapTop, "wrapBottom":wrapBottom, "placingSequence":config.placingSequence, "preferredOnColumn":config.preferredOnColumn, "preferredOnCurrentPage":config.preferredOnCurrentPage, "placingInline":config.placingInline, "currFloatClassName":config.currFloatClassName};//pushing collected citations into an array, "frameName":respectiveFloat
        if(config.continuedFloatSpan == 0 && config.stopPlacementForContinuedFloats == true){
            config.pageFloatIDsArray = config.pageFloatIDsArray.concat([currPageCitationCont]);
            }
        else {
            config.notPlacedFloatsIDs =config.notPlacedFloatsIDs.concat([currPageCitationCont]);//assuming that the continued float could not be placed on the same where it is cited and so storing the data in 'notPlacedFloatsIDs'
            config.stopPlacementForContinuedFloats = false;
            config.lastFloatMovedToFloatNotOnCurrPage = true;
            }
        defaultFloatContCt++;
        }
} //end function 1
//==============================================
//Function for removing overset - to be deleted later
function ResolveOverset(currDoc)
{
    var tFrames = currDoc.pageItems;
    var tFramesLen = tFrames.length;
    for (var f = 0; f < tFramesLen; f ++){
        var fLabel = tFrames[f].label;
        if (fLabel == 'FIRST_FRAME'){
            firstFrame = tFrames[f];
            f = tFramesLen;
            }
        }
    newFilexmlDOM = currDoc.xmlElements[0];
    var currFrameParaLen;
	currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
	currDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
	currDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
	currDoc.zeroPoint = new Array (0,0);
//~ 	var myNoOfColumn=currDoc.pages[1].marginPreferences.columnCount;	
//~ 	currDoc.layoutWindows[0].zoom(ZoomOptions.fitSpread);
//~      app.activeWindow.zoomPercentage = 100;
     var addedPageCt = 0;//To avoid pages flowing contionously, we have updated the script so that proofing will stop saying "Proofing stopped! Float element is keep on flowing-Please do appropriate changes"
     var mycurrentFrameCont = 'Unassinged';
     if (firstFrame.isValid == false){
         firstFrame = currDoc.pages[0].textFrames[0];
         }
        var preTxtFrm, currFrame = '';
        var testPreFrm;
        var trigger = 0;
         while ((firstFrame.endTextFrame.overflows) && trigger < 2)
         {
            preTxtFrm = currFrame;
            var pg = currDoc.pages.add();
            pg.appliedMaster = currDoc.masterSpreads.item("A-TXT")
            var mypage = currDoc.pages[-1];
            var mycurrentFrame;
            var myMasterPage = mypage.appliedMaster;
               if (pg.side == PageSideOptions.leftHand)
              {
                    var tFrames = myMasterPage.pages[0].pageItems;
                    var tFramesLen = tFrames.length;
                        for (var f = 0; f < tFramesLen; f ++){
                        var fLabel = tFrames[f].label;
                            if (fLabel == 'VERSO'){
                            var currFrame = tFrames[f];
                            f = tFramesLen;
                            }
                        }    
                currFrame.override(pg);
                }
            else{
                    var tFrames = myMasterPage.pages[1].pageItems;
                    var tFramesLen = tFrames.length;
                        for (var f = 0; f < tFramesLen; f ++){
                        var fLabel = tFrames[f].label;
                            if (fLabel == 'RECTO'){
                            var currFrame = tFrames[f];
                            f = tFramesLen;
                            }
                        }    
                //myMasterPage.pages[1].pageItems.item("RECTO").override(pg);
                currFrame.override(pg);
                }
            myPage = currDoc.pages[-1];
               if (myPage.side == PageSideOptions.leftHand){
                    var tFrames = myPage.pageItems;
                    var tFramesLen = tFrames.length;
                        for (var f = 0; f < tFramesLen; f ++){
                        var fLabel = tFrames[f].label;
                            if (fLabel == 'VERSO'){
                            var currFrame = tFrames[f];
                            f = tFramesLen;
                            }
                        }    
                   
                mycurrentFrame = currFrame;
                mycurrentFrame.previousTextFrame = firstFrame.endTextFrame;
                mycurrentFrameCont = mycurrentFrame.contents;
                if (mycurrentFrameCont >= ''){
                    addedPageCt = 0;
                    }
                }
            else{
                    var tFrames = myPage.pageItems;
                    var tFramesLen = tFrames.length;
                        for (var f = 0; f < tFramesLen; f ++){
                        var fLabel = tFrames[f].label;
                            if (fLabel == 'RECTO'){
                            var currFrame = tFrames[f];
                            f = tFramesLen;
                            }
                        }                   
                mycurrentFrame = currFrame;
                mycurrentFrame.previousTextFrame = firstFrame.endTextFrame;
                mycurrentFrameCont = mycurrentFrame.contents;
                if (mycurrentFrameCont >= ''){
                    addedPageCt = 0;
                    }
                }
            try{
            currFrameParaLen= currFrame.paragraphs.length } catch(e) {currFrameParaLen = 0}
            
            //======================================//to stop process if pages keep on adding for resolving overset
            if ((preTxtFrm.isValid) && (currFrameParaLen > 0)){
                var maxRowHt = preTxtFrm.geometricBounds[2] - preTxtFrm.geometricBounds[0];
                var currFrmParas = preTxtFrm.paragraphs;
                var currFrmParasLen = currFrmParas.length;
                if (currFrmParasLen == 1){
                    if (currFrmParas[0].tables.length > 0){
                        var currFrmParasTblRw = currFrmParas[0].tables[0].rows;
                        var currFrmParasTblRwLen = currFrmParasTblRw.length;
                        for (var rw = 0; rw < currFrmParasTblRwLen - 1; rw ++){
                            var currRwHt = currFrmParasTblRw[rw].height;
                            if (currRwHt > maxRowHt){
                                logTimer("Proofing failed - Tables overflows");
                                app.activeDocument.close(SaveOptions.YES);
                                writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                exit();
                                }//end of IF
                            }//end of for
                        }//end of IF
                    else if (currFrmParas[0].allGraphics.length > 0){
                        try{
                            var currFrmParasGr = currFrmParas[0].allGraphics[0].geometricBounds;}
                        catch (e) {
                                logTimer("Proofing failed - Graphic size more than text area");
                                app.activeDocument.close(SaveOptions.YES);
                                writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                exit();
                                }
                        }//end of ELSE IF 
                    else if (currFrmParas[0].lines.length > 0){
                        var currFrmFirstParaStyle = currFrmParas[0].paragraphs[0].appliedParagraphStyle.name;
                        if (currFrmParas[0].lines.lastItem().parentTextFrames.isValid || (currFrmFirstParaStyle == 'TOC_TTL' || currFrmFirstParaStyle == 'FM_TTL')){
                            }
                        else{
                                logTimer("Proofing failed - String length (line) exceeds text area or can't fit inside text frame");
                                writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                app.activeDocument.close(SaveOptions.YES);
                                exit();
                                }
                        }//end of ELSE IF 
                    }//end of IF
            }
            //======================================             
        }//end of while 
    	currDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
}
//==============================================
var currPage = app.activeDocument.pages[1];
floatPlacer.events.collectCitation();//parameter given here is the page number- 
/*
    Function developed by: Kannan R
    Description: This function will resize the figure if it greater than 20% of the column width, say one column or two or three...
    */
function _image_resize(column_arr,text_frame,resizeToColumn)
{
            doc = app.activeDocument;
            
            if( (text_frame) && (text_frame.isValid) )
            {
                    var text_frame_width = text_frame.geometricBounds[3] - text_frame.geometricBounds[1];
                    
                       var graphic = text_frame.allGraphics[0];
                       if((graphic) && (graphic.isValid) )
                       {
                                    var graphic_frame = graphic.parent;
                                    var graphic_width = graphic.geometricBounds[3] - graphic.geometricBounds[1];
                                 
                                    var c = 0;
                                    var column_value = 0;
                                    var flag = 0;
                                    for(c=0;c<column_arr.length;c++)
                                    {
                                                column_value = Number(column_arr[c]) - 1;
                                                var graphic_checking_value = Number(Number(column_value) + Number(column_value*20/100));
                                    
                                                    if( (graphic_width > column_value) && (graphic_width <= graphic_checking_value) )
                                                    {
                                                                var graphic_scaling = graphic.horizontalScale;
                                                                var graphic_fitting_value = Number(column_value) / Number(graphic_width) * Number(graphic_scaling);
                                                                
                                                                graphic.verticalScale = graphic.horizontalScale = graphic_fitting_value;
                                                                graphic_frame.fit(FitOptions.FRAME_TO_CONTENT);
                                                                flag = 1;
                                                                break;
                                                    }
                                                    else if (resizeToColumn){
                                                                var graphic_scaling = graphic.horizontalScale;
                                                                var graphic_fitting_value = Number(column_value) / Number(graphic_width) * Number(graphic_scaling);
                                                                
                                                                graphic.verticalScale = graphic.horizontalScale = graphic_fitting_value;
                                                                graphic_frame.fit(FitOptions.FRAME_TO_CONTENT);
                                                                flag = 1;
                                                                break;
                                                        }
                                    }
                                    if(flag == 1)
                                        return true;
                                    else
                                        return false;
                       }
                        else
                        {
                                return "Graphic is not found";
                        }
            }
            else
            {
                    return "Given textframe is not valid";
            }  
}
//==============================================
/*
            Movie frame is resized into width specified
            Developer: Kannan R
            Dt: 06-May-2017
*/

function _media_resize(text_frame, column_value)
{
                doc = app.activeDocument;
                if( (text_frame) && (text_frame.toString().match("TextFrame","i")) )
                {
                        if(text_frame.rectangles.length > 0)
                        {
                                       var rectangle = text_frame.rectangles[0];
                                       if((rectangle) && (rectangle.isValid) && (rectangle.movies.length > 0) )
                                       {
                                                    var text_frame_width = text_frame.geometricBounds[3] - text_frame.geometricBounds[1];
                                           
                                                    var rectangle_width = rectangle.geometricBounds[3] - rectangle.geometricBounds[1];
                                                    var movie = rectangle.movies[0];
                                                    var movie_width = movie.geometricBounds[3] - movie.geometricBounds[1];
                                                    
                                                    try
                                                    {
                                                            // Getting poster filepath and apply it into movie
                                                                var poster_name = File(movie.associatedXMLElement.xmlAttributes.item("poster-path").value).name;
                                                                var poster_path = Folder(Folder(movie.filePath).parent).fsName + "/" + poster_name;
                                                                movie.posterFile = File(poster_path);
                                                    }
                                                    catch(e)
                                                    {}

                                                   if(movie_width > column_value)   // Resize movie frame
                                                   {
                                                                var movie_scaling = movie.horizontalScale;
                                                                var movie_fitting_value = (Number(column_value) / Number(movie_width)) * Number(movie_scaling); // resize movie frmae to single column width
                                                                movie.verticalScale = movie.horizontalScale = movie_fitting_value;
                                                                rectangle.fit(FitOptions.FRAME_TO_CONTENT);
                                                   }
                                               
                                                    if(movie.allGraphics.length > 0) // Resize poster frame
                                                    {
                                                            var image = movie.allGraphics[0];
                                                            var image_width = image.geometricBounds[3] - image.geometricBounds[1];
                                                            if(image_width > column_value)
                                                            {
                                                                        var image_scaling = image.horizontalScale;
                                                                        var image_fitting_value = (Number(column_value) / Number(image_width)) * Number(image_scaling); // resize poster frmae to single column width
                                                                        image .verticalScale = image .horizontalScale = image_fitting_value;
                                                            }
                                                    }
                                       }
                                        else
                                        {
                                                return "Movie is not found";
                                        }
                        }
                }
                else
                {
                        return "Given textframe is not valid";
                }  
}
//=====================================================================================
                 function _remove_math_overlap_in_table(curr_frame)
                {
                            var doc = app.activeDocument;
                        
                            if((curr_frame) && (curr_frame.toString().match("object TextFrame","i")) )
                            {
                                            try
                                            {
                                                    var graphics = curr_frame.tables.everyItem().cells.everyItem().lines.everyItem().allGraphics;;  // fetch all the graphics in the tables
                                            }
                                            catch(e){return false;}
                                            
                                            for(ep in graphics) 
                                            {
                                                        if(graphics[ep].toString().match("object PDF","i"))
                                                        {
                                                                    if(graphics[ep].length > 0)
                                                                    {
                                                                            try
                                                                            {
                                                                                    // Fetch lowest  y1
                                                                                        var curr_eps = graphics[ep][0].parent;
                                                                                        var curr_eps_min_y1 = curr_eps.geometricBounds[0];
                                                                                        var e=1;
                                                                                        for(e=1;e<graphics[ep].length;e++)
                                                                                        {
                                                                                                    try
                                                                                                    {
                                                                                                                var line_eps = graphics[ep][e].parent;
                                                                                                                 //doc.select(line_eps);
                                                                                                                var eps_min_y1 = line_eps.geometricBounds[0];
                                                                                                                if(eps_min_y1 <= curr_eps_min_y1)
                                                                                                                {
                                                                                                                            curr_eps = line_eps;
                                                                                                                            curr_eps_min_y1 = eps_min_y1;
                                                                                                                }
                                                                                                    }
                                                                                                    catch(e){}
                                                                                        }
                                                                                }
                                                                                catch(e){}
                                                                        
                                                                            try
                                                                            {
                                                                                        var curr_eps_tag_name = curr_eps.associatedXMLElement.markupTag.name;
                                                                            }
                                                                            catch(e){}
                                                                            
                                                                            if((curr_eps_tag_name) && (curr_eps_tag_name.toString().match("^inline-equation$","i")) ) // Here checking with graphics's associated tag name is "inline-equation"
                                                                            {
                                                                                        try
                                                                                        {
                                                                                                  var curr_eps_y1 = curr_eps.geometricBounds[0];
                                                                                                  var curr_line = curr_eps.parent.lines[0];
                                                                                                  if(curr_line.isValid)
                                                                                                  {
                                                                                                            // checking with previous line
                                                                                                                 var pre_line = curr_line.parent.lines.previousItem(curr_line);
                                                                                                                 if( (pre_line.isValid))
                                                                                                                 {
                                                                                                                                    var pre_line_baseline = (pre_line.baseline + pre_line.descent) ;
                                                                                                                                    if(curr_eps_y1 <= pre_line_baseline)
                                                                                                                                    {
                                                                                                                                                //app.select(curr_line)
                                                                                                                                                if(curr_line.leading.toString().match("AUTO","i")) // if curr_line leading is auto the calc point size + 2
                                                                                                                                                {
                                                                                                                                                            var change_leading = ((curr_line.pointSize + Number(2)) + (pre_line_baseline - curr_eps_y1) + Number(1));
                                                                                                                                                }
                                                                                                                                                else
                                                                                                                                                {
                                                                                                                                                            var change_leading = (curr_line.leading +(pre_line_baseline - curr_eps_y1) + Number(1));
                                                                                                                                                }
                                                                                                                                                curr_line.leading = change_leading;
                                                                                                                                                //doc.select(curr_eps);
                                                                                                                                    }
                                                                                                                                
                                                                                                                                // Here checking to eps frame to eps frame overlap in a line.
                                                                                                                                    var pre_line_all_eps = pre_line.allGraphics;
                                                                                                                                    if(pre_line_all_eps.length > 0)
                                                                                                                                    {
                                                                                                                                                  for(pg=0;pg<pre_line_all_eps.length;pg++)
                                                                                                                                                  {
                                                                                                                                                                var pre_line_eps_max_y2 = pre_line_all_eps[pg].parent;
                                                                                                                                                                
                                                                                                                                                                flag_overlap = false;
                                                                                                                                                                //var bounds1, bounds2 = [];
                                                                                                                                                                flag_overlap = touches(curr_eps.geometricBounds,pre_line_eps_max_y2.geometricBounds)
                                                                                                                                                                function touches(bounds1, bounds2)  
                                                                                                                                                                {  
                                                                                                                                                                            if (bounds1[2] < bounds2[0]) return false;  
                                                                                                                                                                            if (bounds1[0] > bounds2[2]) return false;  
                                                                                                                                                                            if (bounds1[1] > bounds2[3]) return false;  
                                                                                                                                                                            if (bounds1[3] < bounds2[1]) return false;  
                                                                                                                                                                              return true;  
                                                                                                                                                                } 
                                                                                                                                                                
                                                                                                                                                                if(flag_overlap == true)
                                                                                                                                                                {
                                                                                                                                                                                 if(curr_line.leading.toString().match("AUTO","i"))
                                                                                                                                                                                {
                                                                                                                                                                                            var change_leading = ((curr_line.pointSize + Number(2)) + (pre_line_eps_max_y2.geometricBounds[2] - curr_eps.geometricBounds[0]) + Number(1));
                                                                                                                                                                                }
                                                                                                                                                                                else
                                                                                                                                                                                {
                                                                                                                                                                                            var change_leading = (curr_line.leading +(pre_line_eps_max_y2.geometricBounds[2] - curr_eps.geometricBounds[0]) + Number(1));
                                                                                                                                                                                }
                                                                                                                                                                                curr_line.leading = change_leading;
                                                                                                                                                                }
                                                                                                                                                  }
                                                                                                                                    }
                                                                                                                                
                                                                                                                 }
                                                                                                                // fetch highest y2 
                                                                                                                    var curr_eps = graphics[ep][0].parent;
                                                                                                                    var curr_eps_max_y2 = curr_eps.geometricBounds[2];
                                                                                                                    var e=1;
                                                                                                                    for(e=1;e<graphics[ep].length;e++)
                                                                                                                    {
                                                                                                                                    var line_eps = graphics[ep][e].parent;
                                                                                                                                    // doc.select(line_eps);
                                                                                                                                    var eps_max_y2 = line_eps.geometricBounds[2];
                                                                                                                                    if(eps_max_y2 >= curr_eps_max_y2)
                                                                                                                                    {
                                                                                                                                                curr_eps = line_eps;
                                                                                                                                                curr_eps_max_y2 = eps_max_y2;
                                                                                                                                    }
                                                                                                                    }
                                                                                                            
                                                                                                                 // checking with next line
                                                                                                                    var curr_eps_y2 = curr_eps.geometricBounds[2];
                                                                                                                    var next_line = curr_line.parent.lines.nextItem(curr_line);
                                                                                                                    if( (next_line.isValid) )
                                                                                                                    {
                                                                                                                                    //doc.select(next_line);
                                                                                                                                    var next_line_topline = (next_line.baseline - next_line.ascent) ;
                                                                                                                                    if(curr_eps_y2 >= next_line_topline)
                                                                                                                                    {
                                                                                                                                                
                                                                                                                                                //app.select(curr_line)
                                                                                                                                                if(next_line.leading.toString().match("AUTO","i"))
                                                                                                                                                {
                                                                                                                                                            var change_leading = ((next_line.pointSize + Number(2)) + (curr_eps_y2 - next_line_topline) + Number(1));
                                                                                                                                                }
                                                                                                                                                else
                                                                                                                                                {
                                                                                                                                                            var change_leading = (next_line.leading +(curr_eps_y2 - next_line_topline) + Number(1));
                                                                                                                                                }
                                                                                                                                                next_line.leading = change_leading;
                                                                                                                                                //doc.select(curr_eps);
                                                                                                                                    }
                                                                                                                    }
                                                                                                                
                                                                                                                 // Here checking to eps frame to eps frame overlap in a line.
                                                                                                                                    var next_line_all_eps = next_line.allGraphics;
                                                                                                                                    if(next_line_all_eps.length > 0)
                                                                                                                                    {
                                                                                                                                            pg = 0;
                                                                                                                                                  for(pg=0;pg<next_line_all_eps.length;pg++)
                                                                                                                                                  {
                                                                                                                                                                var next_line_eps_min_y1 = next_line_all_eps[pg].parent;
                                                                                                                                                                
                                                                                                                                                                flag_overlap = false;
                                                                                                                                                                //var bounds1, bounds2 = [];
                                                                                                                                                                flag_overlap = touches(curr_eps.geometricBounds,next_line_eps_min_y1.geometricBounds)
                                                                                                                                                                function touches(bounds1, bounds2)  
                                                                                                                                                                {  
                                                                                                                                                                            if (bounds1[2] < bounds2[0]) return false;  
                                                                                                                                                                            if (bounds1[0] > bounds2[2]) return false;  
                                                                                                                                                                            if (bounds1[1] > bounds2[3]) return false;  
                                                                                                                                                                            if (bounds1[3] < bounds2[1]) return false;  
                                                                                                                                                                              return true;  
                                                                                                                                                                } 
                                                                                                                                                                
                                                                                                                                                                if(flag_overlap == true)
                                                                                                                                                                {
                                                                                                                                                                                 if(next_line.leading.toString().match("AUTO","i"))
                                                                                                                                                                                {
                                                                                                                                                                                            var change_leading = ((next_line.pointSize + Number(2)) + (curr_eps.geometricBounds[2] - next_line_eps_min_y1.geometricBounds[0]) + Number(1));
                                                                                                                                                                                }
                                                                                                                                                                                else
                                                                                                                                                                                {
                                                                                                                                                                                            var change_leading = (next_line.leading +(curr_eps.geometricBounds[2] - next_line_eps_min_y1.geometricBounds[0]) + Number(1));
                                                                                                                                                                                }
                                                                                                                                                                                next_line.leading = change_leading;
                                                                                                                                                                }
                                                                                                                                                  }
                                                                                                                                    }
                                                                                                  }
                                                                                        }
                                                                                        catch(e){}
                                                                           }

                                                                   }
                                                        }
                                            }
                                        app.select(null);
                             }
                }
            
//=========================================================================
function _math_cstyle_apply_and_remove_overlap()
{
                math_node = "";
                _math_cstyle_apply();
                if(math_node.length > 0)
                {
                        _math_remove_overlap();
                }
            
                function _math_cstyle_apply()
                {
                            // Applying cstyle for math - start
                            doc = app.activeDocument;
                            var root_node = doc.xmlElements[0];
                            app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
                            math_node = root_node.evaluateXPathExpression("//matchEqn[@cstyle]");
                            var m=0;
                            for(m=0;m<math_node.length;m++)
                            {
                                       try
                                       {
                                                math_node[m].texts[0].appliedCharacterStyle = math_node[m].xmlAttributes.item("cstyle").value.toString();  // Apply cstyle for matchEqn tag's contents
                                       }
                                       catch(e)
                                       {
                                           
                                       }
                            }
                }
                
              
                 function _math_remove_overlap()
                {
                            var doc = app.activeDocument;
                            var graphics = doc.pages.everyItem().textFrames.everyItem().lines.everyItem().allGraphics;  // fetch all the graphics in the documents
                            for(ep in graphics) 
                            {
                                        if(graphics[ep].toString().match("object PDF","i"))
                                        {
                                                    if(graphics[ep].length > 0)
                                                    {
                                                        try
                                                        {
                                                                // Fetch lowest  y1
                                                                    var curr_eps = graphics[ep][0].parent;
                                                                    var curr_eps_min_y1 = curr_eps.geometricBounds[0];
                                                                    var e=1;
                                                                    for(e=1;e<graphics[ep].length;e++)
                                                                    {
                                                                                try
                                                                                {
                                                                                            var line_eps = graphics[ep][e].parent;
                                                                                             //doc.select(line_eps);
                                                                                            var eps_min_y1 = line_eps.geometricBounds[0];
                                                                                            if(eps_min_y1 <= curr_eps_min_y1)
                                                                                            {
                                                                                                        curr_eps = line_eps;
                                                                                                        curr_eps_min_y1 = eps_min_y1;
                                                                                            }
                                                                                }
                                                                                catch(e){}
                                                                    }
                                                            }
                                                            catch(e){}
                                                        
                                                            try
                                                            {
                                                                        var curr_eps_tag_name = curr_eps.associatedXMLElement.markupTag.name;
                                                            }
                                                            catch(e){}
                                                            
                                                            if((curr_eps_tag_name) && (curr_eps_tag_name.toString().match("^inline-equation$","i")) ) // Here checking with graphics's associated tag name is "inline-equation"
                                                            {
                                                                        try
                                                                        {
                                                                                  var curr_eps_y1 = curr_eps.geometricBounds[0];
                                                                                  var curr_line = curr_eps.parent.lines[0];
                                                                                  if(curr_line.isValid)
                                                                                  {
                                                                                            // checking with previous line
                                                                                                 var pre_line = curr_line.parent.lines.previousItem(curr_line);
                                                                                                 if( (pre_line.isValid) && ( (curr_line.textColumns[0] == pre_line.textColumns[0])) )
                                                                                                 {
                                                                                                                    //doc.select(pre_line);
                                                                                                                    var pre_line_baseline = (pre_line.baseline + pre_line.descent) ;
                                                                                                                    if(curr_eps_y1 <= pre_line_baseline)
                                                                                                                    {
                                                                                                                                //app.select(curr_line)
                                                                                                                                if(curr_line.leading.toString().match("AUTO","i")) // if curr_line leading is auto the calc point size + 2
                                                                                                                                {
                                                                                                                                            var change_leading = ((curr_line.pointSize + Number(2)) + (pre_line_baseline - curr_eps_y1) + Number(1));
                                                                                                                                }
                                                                                                                                else
                                                                                                                                {
                                                                                                                                            var change_leading = (curr_line.leading +(pre_line_baseline - curr_eps_y1) + Number(1));
                                                                                                                                }
                                                                                                                                curr_line.leading = change_leading;
                                                                                                                                //doc.select(curr_eps);
                                                                                                                    }
                                                                                                                
                                                                                                                // Here checking to eps frame to eps frame overlap in a line.
                                                                                                                    var pre_line_all_eps = pre_line.allGraphics;
                                                                                                                    if(pre_line_all_eps.length > 0)
                                                                                                                    {
                                                                                                                                  for(pg=0;pg<pre_line_all_eps.length;pg++)
                                                                                                                                  {
                                                                                                                                                var pre_line_eps_max_y2 = pre_line_all_eps[pg].parent;
                                                                                                                                                
                                                                                                                                                flag_overlap = false;
                                                                                                                                                //var bounds1, bounds2 = [];
                                                                                                                                                flag_overlap = touches(curr_eps.geometricBounds,pre_line_eps_max_y2.geometricBounds)
                                                                                                                                                function touches(bounds1, bounds2)  
                                                                                                                                                {  
                                                                                                                                                            if (bounds1[2] < bounds2[0]) return false;  
                                                                                                                                                            if (bounds1[0] > bounds2[2]) return false;  
                                                                                                                                                            if (bounds1[1] > bounds2[3]) return false;  
                                                                                                                                                            if (bounds1[3] < bounds2[1]) return false;  
                                                                                                                                                              return true;  
                                                                                                                                                } 
                                                                                                                                                
                                                                                                                                                if(flag_overlap == true)
                                                                                                                                                {
                                                                                                                                                                 if(curr_line.leading.toString().match("AUTO","i"))
                                                                                                                                                                {
                                                                                                                                                                            var change_leading = ((curr_line.pointSize + Number(2)) + (pre_line_eps_max_y2.geometricBounds[2] - curr_eps.geometricBounds[0]) + Number(1));
                                                                                                                                                                }
                                                                                                                                                                else
                                                                                                                                                                {
                                                                                                                                                                            var change_leading = (curr_line.leading +(pre_line_eps_max_y2.geometricBounds[2] - curr_eps.geometricBounds[0]) + Number(1));
                                                                                                                                                                }
                                                                                                                                                                curr_line.leading = change_leading;
                                                                                                                                                }
                                                                                                                                  }
                                                                                                                    }
                                                                                                                
                                                                                                 }
                                                                                                // fetch highest y2 
                                                                                                    var curr_eps = graphics[ep][0].parent;
                                                                                                    var curr_eps_max_y2 = curr_eps.geometricBounds[2];
                                                                                                    var e=1;
                                                                                                    for(e=1;e<graphics[ep].length;e++)
                                                                                                    {
                                                                                                                    var line_eps = graphics[ep][e].parent;
                                                                                                                    // doc.select(line_eps);
                                                                                                                    var eps_max_y2 = line_eps.geometricBounds[2];
                                                                                                                    if(eps_max_y2 >= curr_eps_max_y2)
                                                                                                                    {
                                                                                                                                curr_eps = line_eps;
                                                                                                                                curr_eps_max_y2 = eps_max_y2;
                                                                                                                    }
                                                                                                    }
                                                                                            
                                                                                                 // checking with next line
                                                                                                    var curr_eps_y2 = curr_eps.geometricBounds[2];
                                                                                                    var next_line = curr_line.parent.lines.nextItem(curr_line);
                                                                                                    if( (next_line.isValid) && ( (curr_line.textColumns[0] == next_line.textColumns[0])) )
                                                                                                    {
                                                                                                                    //doc.select(next_line);
                                                                                                                    var next_line_topline = (next_line.baseline - next_line.ascent) ;
                                                                                                                    if(curr_eps_y2 >= next_line_topline)
                                                                                                                    {
                                                                                                                                //app.select(curr_line)
                                                                                                                                if(next_line.leading.toString().match("AUTO","i"))
                                                                                                                                {
                                                                                                                                            var change_leading = ((next_line.pointSize + Number(2)) + (curr_eps_y2 - next_line_topline) + Number(1));
                                                                                                                                }
                                                                                                                                else
                                                                                                                                {
                                                                                                                                            var change_leading = (next_line.leading +(curr_eps_y2 - next_line_topline) + Number(1));
                                                                                                                                }
                                                                                                                                next_line.leading = change_leading;
                                                                                                                                //doc.select(curr_eps);
                                                                                                                    }
                                                                                                    }
                                                                                                
                                                                                                 // Here checking to eps frame to eps frame overlap in a line.
                                                                                                        var next_line_all_eps = next_line.allGraphics;
                                                                                                        if(next_line_all_eps.length > 0)
                                                                                                        {
                                                                                                                pg = 0;
                                                                                                                      for(pg=0;pg<next_line_all_eps.length;pg++)
                                                                                                                      {
                                                                                                                                    var next_line_eps_min_y1 = next_line_all_eps[pg].parent;
                                                                                                                                    
                                                                                                                                    flag_overlap = false;
                                                                                                                                    //var bounds1, bounds2 = [];
                                                                                                                                    flag_overlap = touches(curr_eps.geometricBounds,next_line_eps_min_y1.geometricBounds)
                                                                                                                                    function touches(bounds1, bounds2)  
                                                                                                                                    {  
                                                                                                                                                if (bounds1[2] < bounds2[0]) return false;  
                                                                                                                                                if (bounds1[0] > bounds2[2]) return false;  
                                                                                                                                                if (bounds1[1] > bounds2[3]) return false;  
                                                                                                                                                if (bounds1[3] < bounds2[1]) return false;  
                                                                                                                                                  return true;  
                                                                                                                                    } 
                                                                                                                                    
                                                                                                                                    if(flag_overlap == true)
                                                                                                                                    {
                                                                                                                                                     if(next_line.leading.toString().match("AUTO","i"))
                                                                                                                                                    {
                                                                                                                                                                var change_leading = ((next_line.pointSize + Number(2)) + (curr_eps.geometricBounds[2] - next_line_eps_min_y1.geometricBounds[0]) + Number(1));
                                                                                                                                                    }
                                                                                                                                                    else
                                                                                                                                                    {
                                                                                                                                                                var change_leading = (next_line.leading +(curr_eps.geometricBounds[2] - next_line_eps_min_y1.geometricBounds[0]) + Number(1));
                                                                                                                                                    }
                                                                                                                                                    next_line.leading = change_leading;
                                                                                                                                    }
                                                                                                                      }
                                                                                                        }
                                                                                  }
                                                                        }
                                                                        catch(e){}
                                                           }

                                                   }
                                        }
                            }
                            app.select(null);
                }
}
//=========================================================================
/*
    Functionality: Will reduce the image size to fit for column width
    */
function imageSizer(frmObj, imageData) {
    // check if we have a frame to work with, if not return false
    if (!frmObj || ! frmObj.isValid) {
        //$.writeln('please select figure frame');
        return false;
    }
    var frmObjOriginalBounds = frmObj.geometricBounds;
    // check if we have an graphic frame to work with within the given frame, if not return false
    var graphic = frmObj.allGraphics[0];
    if (!graphic || !graphic.isValid) {
        //$.writeln('no graphic found in the given frame');
        return false;
    }
    var parentRect= graphic.parent;
    // if image object is too large and the frame has a overset then reset the frame's height and width to max of 7500 pt
    // a simple check to see if the image is too large to fit in the given dimension.
    // try to get the geometric bounds, if it fails, then its too large and hidden
    graphic.verticalScale = 5;
    graphic.horizontalScale = 5;
    parentRect.fit(FitOptions.FRAME_TO_CONTENT);
    frmObj.recompose();
    var gb = graphic.geometricBounds;
    var gWidth = (gb[3] - gb[1]) * 100 / 5;
    var gHeight = (gb[2] - gb[0]) * 100 / 5;
    // if user defined size is not available then it would be the actual width of figure
    if (imageData.forceWidthTo == 0) {
        imageData.forceWidthTo = Math.min(gWidth, imageData.maxWidth);
    }
    
    // if the width is greather than double column then newWidth = double column width
    var newWidth = 0; var frmObjWidth = imageData.maxWidth;
    // if graphic width is greater than or equal text area width
    if (gWidth >= imageData.maxWidth) {
        // the new width will be the minimum of graphic width, text area width and what the user has asked for say, single or double column
        newWidth = Math.min(gWidth, imageData.maxWidth, imageData.forceWidthTo);
        frmObjWidth = Math.min(imageData.maxWidth, imageData.forceWidthTo);
    }
    // if the graphic width is between single and text area width
    else if ((gWidth < imageData.maxWidth) && (gWidth > imageData.maxSingleColWidth)){
        // the new width will be minimum of graphic width and what the user has asked for say, single or double column
        newWidth = Math.min(gWidth, imageData.forceWidthTo);
        frmObjWidth = imageData.maxWidth;
        // if 80% of the graphic width is less than or equals the single column width, reduce the image to single column
        if (gWidth*0.8 <= imageData.maxSingleColWidth) {
            newWidth = imageData.maxSingleColWidth;
            frmObjWidth = imageData.maxSingleColWidth;
        }
    }
    else {
        newWidth = Math.min(gWidth, imageData.forceWidthTo);
        frmObjWidth = imageData.maxSingleColWidth;
    }
    var horizontalScaleValue = (gWidth - newWidth)/gWidth;
    
    if (imageData.orientation === 'portrait') {
        var frmObjGB = frmObj.geometricBounds;
        frmObj.geometricBounds = [frmObjGB[0], frmObjGB[1], frmObjGB[2], (frmObjGB[1] + frmObjWidth)];
    }

    var spaceUsedByText = 0;
    var frameParas = frmObj.paragraphs;
    var paraCount = frameParas.length;
    // if the first para has object and contents is uFFFC and uFEFF, assume its the image
    if ((typeof(frameParas[0]) == 'object') && (/^[\uFFFC\uFEFF]+[\r\n]*$/.test(frameParas[0].contents))) {
        var imageOnTop = true;
        var currParaIndex = 1; 
        spaceUsedByText = spaceUsedByText + frameParas[0].lines[0].descent;
    }
    else {
        var currParaIndex = 0; 
    }
    for (currParaIndex; currParaIndex < paraCount; currParaIndex++){
        var currPara = frameParas[currParaIndex];
        //$.writeln(currPara.contents);
        // if you do not have an image on top and you come across an image then do not proceed
        if (/^[\uFFFC\uFEFF]+[\r\n]*$/.test(currPara.contents) && !imageOnTop) {
            currParaIndex = paraCount;
        }
        else {
            if (imageOnTop){
                var linesCount = imageData.captionMinLines ? imageData.captionMinLines : currPara.lines.length;
            }
            else{
                var linesCount = currPara.lines.length;
            }
            var currParaStyle = currPara.appliedParagraphStyle;
            var spaceUsedByText = spaceUsedByText + currParaStyle.spaceBefore + currParaStyle.spaceAfter + (currParaStyle.leading * linesCount);
        }
    }
    var newHeight = Math.min(gHeight, (imageData.maxHeight - spaceUsedByText));
    var verticalScaleValue = (gHeight - newHeight)/gHeight;
    var scaleFactor = 100 - (Math.max(horizontalScaleValue, verticalScaleValue) * 100);
    graphic.verticalScale = scaleFactor;
    graphic.horizontalScale = scaleFactor;
    parentRect.fit(FitOptions.FRAME_TO_CONTENT);
    // adjust the frame width only in portrait orientation
    frmObj.geometricBounds = frmObjOriginalBounds;
    frmObj.recompose();
}
//=========================================================================//=====================================================================================
// *********************************************************************************************************
/*Developer: Augustine. K
   Functionallity: This function will break the text frames into parts before paragraph of the xPath set as parameter and also would do the below. If the config allows span attribe for the para which the textframe is being splilt would be removed   
   Date created: 26-Jun-2017
   Date deployed: 26-Jun-2017
    */
function splitBackmatterTextframe(xPathsInfo, changeParaSpanAttrib, currPage, clmGutter){
    var myDoc = app.activeDocument;
    var myDocDom = myDoc.xmlElements[0];
    var xPaths = xPathsInfo.split('|');
    var xPathsLen = xPaths.length;
    for (var xp = 0; xp < xPathsLen; xp ++){
        xPath = xPaths[xp];
        var processingNode = app.xmlRuleProcessors.add([xPath]);
        var nodeToBeMoved = processingNode.startProcessingRuleSet(myDocDom);
        if (nodeToBeMoved){
            break;
            }
        }//end of FOR loop
    if(nodeToBeMoved){//if the xpath is valid
        var node = nodeToBeMoved.element;  
        var currxPathPara = node.paragraphs[0];
        var currxPathParaSplitClmCt = currxPathPara.spanSplitColumnCount;
        var currxPathParaFirstLineBase = currxPathPara.lines.firstItem().baseline;
        var currxPathParaFirstLineAscent = currxPathPara.lines.firstItem().ascent;
        var splitFrmY1Bound = currxPathParaFirstLineBase - currxPathParaFirstLineAscent;
        var mainFrm = currxPathPara.parentTextFrames[0];
        //collecting main frame's properties
        var mainFrmClmCt = mainFrm.properties.textFramePreferences.textColumnCount;
        var mainFrmGutterWd = mainFrm.properties.textFramePreferences.textColumnGutter;
        var mainFrmFirstBaselineOffset= mainFrm.properties.textFramePreferences.firstBaselineOffset;//.LEADING_OFFSET
        var mainFrmBounds = mainFrm.geometricBounds;
        var mainFrmHt = mainFrmBounds[2] - mainFrmBounds[0];
        var mainFrmName = mainFrm.name;
        //creating new frame after after space of the xPath's respective para and resetting the actual main frames bounds
        var splitFrm = currPage.textFrames.add({geometricBounds: [splitFrmY1Bound, mainFrmBounds[1], config.pageColumns[0].bounds[2], mainFrmBounds[3]]}); //Creating Next Text Frame here
        splitFrm.textFramePreferences.textColumnCount = currxPathParaSplitClmCt;
        splitFrm.textFramePreferences.textColumnGutter = clmGutter;
        splitFrm.textFramePreferences.firstBaselineOffset = FirstBaseline.ASCENT_OFFSET;
        mainFrm.textFramePreferences.verticalBalanceColumns = true;//changing the vertical align property of main frame to true to apply InDesign vertical align property
        splitFrm.name = mainFrmName;
        mainFrm.name = mainFrmName + "_CHANGED";
        if (changeParaSpanAttrib){//if the config says could remove the span property of the para at where the frame has been split, then split property of the para will be changed to null
            currxPathPara.spanSplitColumnCount = SpanColumnCountOptions.ALL;
            currxPathPara.spanColumnType = SpanColumnTypeOptions.SINGLE_COLUMN;
            }
        //changing bounds for the main frame
        mainFrm.geometricBounds = [mainFrmBounds[0], mainFrmBounds[1], splitFrmY1Bound, mainFrmBounds[3]];
        var mainFrmsNextFrame = mainFrm.nextTextFrame;
        mainFrm.nextTextFrame = splitFrm;
        currxPathPara.startParagraph = 1313235563;
        splitFrm.textFramePreferences.verticalBalanceColumns = true;//changing the vertical align property of main frame to true to apply InDesign vertical align property
        }
}
// *********************************************************************************************************
/*Developer: Augustine. K
Date: 02-Jun-2017
Functionality: This will write a txt file with statement passsed as parameter as file name in the log folder
*/
function writeTxtFile(logStmt){
    var statusLogFilePath = layerTemplateScript.replace(/scripts/, 'log') + "\\" + scriptName + "." + logStmt;
    var statusLogFile = new File(statusLogFilePath);
    statusLogFile.encoding = "UTF-8";
    statusLogFile.open("w");
    statusLogFile.close();
    }

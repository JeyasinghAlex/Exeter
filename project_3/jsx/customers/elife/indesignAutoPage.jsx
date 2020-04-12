#target "InDesign-8.0"
//=====removing temp files from the Indesign recovery path===============
var envName = $.getenv("USERNAME");
var glyphObject = {};
var runOnArticleObj = [];
var logosPlacerError = '';
var floatPlacerLastProcessedPage = '';
var retriggeringFloatPlacer = false;
var floatPlacerLastProcessedFrame = '';
var floatPlacerLastProcessedFrameBounds = [];
var currTxtFrm;
var currProgressPercent = 0;
var percentSplit = 0;
//closing all open documents=============
if(!(envName == 'augustine')){
    var allOpenDocs = app.documents;
    var allOpenDocsLen = allOpenDocs.length;
    for (var od = allOpenDocsLen - 1; od >= 0; od --){
        allOpenDocs[od].close(SaveOptions.NO);    
        }
    }
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.imageIOPreferences.applyPhotoshopClippingPath = false;
//============================================================
var scriptName = $.fileName;
scriptName = scriptName.replace(/.*\/(.+.jsx)/, "$1");
scriptName = scriptName.replace('.jsx', '');
layerTemplateScript = File($.fileName).parent.fsName//File(getActiveScriptPath()).parent.fsName;
//exportPageCountDetails(layerTemplateScript);
var filePath = layerTemplateScript.replace(/scripts/, 'log') + "\\" + scriptName + ".log";
var logFile = new File(filePath);//the log file records code progress
logFile.encoding = "UTF-8";
logFile.open("w");
var today = new Date();
var myDates = today.toLocaleTimeString()
//logFile.write(String(today));
startDate =new Date();
filePath = filePath.replace('.log','.debug')
var debugLogFile = new File(filePath);//the log file records erros for debugger
debugLogFile.encoding = "UTF-8";
debugLogFile.open("w");
var today = new Date();
var myDates = today.toLocaleTimeString()
//debugLogFile.write(String(today));
startDate =new Date();
//To show the in-progress percent calculating the number of functions 
displayMSG("Proofing starts...\tin-progress\t0");
debuggerMSG("Proofing starts...\tin-progress");
//=======json file for logging placed floats info==============
var jsonfilePath = filePath.replace('.debug','.json')
var floatsPlacementjson = new File(jsonfilePath);//the log file records erros for debugger
floatsPlacementjson.encoding = "UTF-8";
floatsPlacementjson.open("w");
floatsPlacementjson.write("{");
floatsPlacementjson.close();
//=============================================
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
app.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
app.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
var appPDFcropPref = app.pdfPlacePreferences.pdfCrop;//saving application default figure import option
app.pdfPlacePreferences.pdfCrop = PDFCrop.CROP_ART;//changing figure import options

//---------------------varaibles used starts----------------
var myDoc, myBaseScriptFolderPath, myBooks, mapStyleArray, currDoc, firstFrame, tempFrame, xmlDOM, DOMElements, inputHTMLFile, myTag2StyleFile, mapList, mapListArray, template, bookTitle, bookTitleValue, bookEditors, bookEditorsValue, 
xmlSubElements, xmlGroup, xmlFrame, individualFiles, nextFrame, dupFrame, copyRightYear, variableCopyYear, copyRightYearValue, RRHNode, VRHNode, variableRRH, variableVRH, newDocDOM, variablebookTitle, docPageLen, myPage,
figCaptions, myStory, startPara, lastPara, currSelection, tempFigureFrm, checkFigure, checkFigureHt, figPageNumber,  figPrevPara, figPrevPageNumber, movedFigure, addedPage, currProgress, progresLength, newFilexmlDOM, newFileDOMElements, thisDoc, currPage, tabStyle, getTable, tabLen, headCount, tableRow, rowCount, cellCount, tableStyle, tableBody, tableBodyFirst, tableBodyLast, startPage;
var newFilePgLen, newFilePg, PgFrmLine, PgFrmLineLen, lastLineBase, PgFrmParas, PgFrmParasLen, paraLineLenArr, paraStyleName, distributeBy, distributeIn, distributeVa, paraArrLen, twoLineShortBase, currFrmBounds, saveFileName;
var marginBaseLine, pageWidth, pageHeight;
var myInoutPath, myInoutPathFSName, myLogReport, quitExcelBat, myInputFile, xmlString, graphicsLog, FPOArray, fpoCount, xmlDom, xmlRoot, imgTag, imgCount, imgFileName;
var floatPara, paraStyleName, floatNumRegObj, myFindCStyle;
var txtFrmBounds, txtFrmPgMrLeft, txtFrmPgMrRight, txtFrmPgMrTop, txtFrmPgMrBottom, txtArea, txtAreaWd, pgBaseLine, txtFrmTbls, currTbl, txtFrmTblsLen;
var capText, currTblHt, currTblWd, currTblPg, currTblStory, nextPara, currTblContPg, floatNumRegObj, floatNum, myFind, myFindLen, myFindCStyle, citationPgName, foundTextBaseLn, findCont, currParas, currParaLines, currParaLinesLen, lineContent, linePosition, startPara, lastPara, currSelection, newFrm, movedObject, tempFind, tempFindLen, newFrmBounds, newFrmHt, nextPara2Tbl, tblFirstFrm, prevPara, tblCaption, layoutStyleLandscape, continueTopFrm, continueTopFrm;
var clientArray, configListArray, bookBaseLeading, startDate, endDate, templateFile, geoBoundsVerso, geoBoundsRecto
var PgFrm, PgFrmParas, bs, thisTable;
var tempbs = 1;
var forceMove = false;
var style = 'P';
var continueTopFrmInset = [0, 0, 6.6, 0];//Need to set in config
var continueBottomFrmInset = [6.6, 0, 0, 0];//Need to set in config
//---------------------varaibles used ends----------------
myInoutPath = layerTemplateScript.replace(/scripts/,'template')
    var htmlFile = File(layerTemplateScript.replace(/scripts/, 'sgml') + "\\" + scriptName + ".htm");
    if (htmlFile.exists){
    inputHTMLFile = htmlFile;
    saveFileName = inputHTMLFile.name;
    saveFileName = saveFileName.replace(".htm", ".indd");
    debuggerMSG("Picking HTM file for processing ...\tin-progress\t0");
    displayMSG("Picking HTM file for processing ...\tin-progress\t0");
    initialBasicFunction(inputHTMLFile);
    //including project specific functions
    debuggerMSG("Including 'projectSpecificFunctions.jsx' ...\tin-progress");
    var scriptFile = (File(layerTemplateScript + "\\"+ "projectSpecificFunctions.jsx"))
    var script = '#include' + scriptFile.fullName;
    eval(script);
    //Placing floats
    var geoBoundsVerso = myDoc.pages.item("2").textFrames[0].geometricBounds;
    var geoBoundsRecto = myDoc.pages.item("3").textFrames[0].geometricBounds;
    var textFrmColWidth = myDoc.pages.item("3").textFrames[0].textFramePreferences.textColumnFixedWidth;
    var textColGutter = myDoc.pages.item("3").textFrames[0].textFramePreferences.textColumnGutter;
    ResolveOverset(app.activeDocument);
  //  figurePlacement(myDoc);
  //===========clean up code===============
    //==========user overriding paragraph attributes================
    debuggerMSG("Adjusting word space starts...\tin-progress");
    var styleList = myDoc.textVariables.item("ADJUST_WORD_SPACE").variableOptions.contents;//adjusting word spacing 
    if (!(styleList == '')){
    forceAdjustWordSpace(styleList,newFilexmlDOM);}
    debuggerMSG("Adjusting word space ends...\tin-progress");
   //=============exter scripts======================
    debuggerMSG("Moving XML nodes to frames starts...\tin-progress");  
    app.doScript(File(layerTemplateScript + "\\"+ "moveNodeToFrames.jsx"), ScriptLanguage.javascript, [layerTemplateScript]);
    myDoc.save();//saving document
    debuggerMSG("Updating glyphs - excluding floats  starts...\tin-progress");
    glyphsConfig = layerTemplateScript + "\\" + "GLYPHS.jsx";
    debuggerMSG("Including GLYPHS config...");       
    eval('#include ' + glyphsConfig); // load the glyph config
    debuggerMSG("Applying GLYPHS for main document ...\tin-progress");  
    var currTextFrameObjectForGlyphSearch = app.documents[0];
    app.doScript(File(layerTemplateScript + "\\"+ "missingGlyph.jsx"), ScriptLanguage.javascript, [layerTemplateScript, glyphsConfig, currTextFrameObjectForGlyphSearch]);
    _math_cstyle_apply_and_remove_overlap();
    debuggerMSG("Running project specific functions...\tin-progress");               
    app.doScript(File(layerTemplateScript + "\\"+ jrnlName + "_callProjectSpecificFunctions.jsx"));
    debuggerMSG("Placing footnotes...\tin-progress");  
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Placing footnotes...\tin-progress\t" + Math.round(currProgressPercent));  
    footNotePlacer();
    forceAdjustAboveSpace("//h1");
    forceAdjustAboveSpace("//h2");
    forceAdjustAboveSpace("//h3");
    forceAdjustAboveSpace("//h4");
    forceAdjustAboveSpace("//h5");
    forceAdjustAboveSpace("//h6");
    forceAdjustAboveSpace("//p[@pstyle='jrnlBoxTitle']");
    myDoc.save();//saving document
    //reducing font size of table paras as per user inputs==================================
    debuggerMSG("Reducing font size of tables as per user inputs...\tin-progress");               
    var myDocTables = app.activeDocument.xmlElements[0].evaluateXPathExpression("//Table");
    var myDocTablesLen = myDocTables.length;
    for (var tbl = 0; tbl < myDocTablesLen; tbl ++){
        var currTable = myDocTables[tbl].tables[0];
        //updated by Karthik Aug 2017 -- Start
        if(myDocTables[tbl].xmlAttributes.itemByName("data-padding-left").isValid){
            var tablesCellPaddingLeftSp = myDocTables[tbl].xmlAttributes.itemByName("data-padding-left").value;
            tablesCellPaddingLeftSpValue = tablesCellPaddingLeftSp.replace('px', '');
            currTable.cells.everyItem().leftInset = tablesCellPaddingLeftSpValue;
            };
        if(myDocTables[tbl].xmlAttributes.itemByName("data-padding-right").isValid){
            var tablesCellPaddingRightSp = myDocTables[tbl].xmlAttributes.itemByName("data-padding-right").value;
            tablesCellPaddingRightSpValue = tablesCellPaddingRightSp.replace('px', '');
            currTable.cells.everyItem().rightInset = tablesCellPaddingRightSpValue;
            };
        //updated by Karthik Aug 2017 -- End
        //if (!(myDocTables[tbl].xmlAttributes.itemByName("reduceTheadFontSize") == undefined)){
        // updated by PM, June 29, 2017 - check for undefined and valid attribute
        if ((typeof(myDocTables[tbl].xmlAttributes.itemByName("reduceTheadFontSize")) != 'undefined')  && (myDocTables[tbl].xmlAttributes.itemByName("reduceTheadFontSize").isValid)){
            var reduceFontSizeTo = myDocTables[tbl].xmlAttributes.itemByName("reduceTheadFontSize").value;
            reduceFontSizeTo = reduceFontSizeTo.replace('px', '');
            if(!(reduceFontSizeTo == '' | reduceFontSizeTo == 0)){
                currTable.cells.everyItem().paragraphs.everyItem().pointSize = reduceFontSizeTo;
                currTable.cells.everyItem().paragraphs.everyItem().leading = Leading.AUTO;
                }//end of IF
            }//end of IF        
        }//end of FOR LOOP
    inlineTablePstyleSpanChange("//Table[@data-p-span]");
    debuggerMSG("Applying table border based on user inputs ...\tin-progress");
    applyTableBorderStyle('Solid', 0.5);
    myDoc.save();//saving document
    //===========================================================
    //reducing font sizes based on user inputs
    reduceFontSizes("//bl[@reduceFont],//nl[@reduceFont],//dl[@reduceFont],//p[@reduceFont]")
    myDoc.save();//saving document
    //===========================================================
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Doing hyperlinks...\tin-progress\t" + Math.round(currProgressPercent));               
    debuggerMSG("Hyperlink for URL's in progress...\tin-progress");               
    app.doScript(File(layerTemplateScript + "\\"+ "hyperlink.jsx"), ScriptLanguage.javascript, [layerTemplateScript]);
    myDoc.save();//saving document
    debuggerMSG("Placing floats and base aligning...\tin-progress");
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Placing floats and base aligning...\tin-progress\t" + Math.round(currProgressPercent));
	// updated by PM, June 29, 2017 - introduced floatPlacerError variable to store error inside floatPlacer
	var floatPlacerError = '';
    var domXpath = "//div[@type='main']";
    var currBlockXMLItem = myDoc.xmlElements[0].evaluateXPathExpression(domXpath)[0];
    app.doScript(File(layerTemplateScript + "\\"+ "floatPlacer.jsx"), ScriptLanguage.javascript, [layerTemplateScript,currProgressPercent,percentSplit,floatPlacerError,scriptName,floatPlacerLastProcessedFrameBounds, floatPlacerLastProcessedPage, retriggeringFloatPlacer,domXpath,floatsPlacementjson,currBlockXMLItem]);
    var runOnArticleObjLen = runOnArticleObj.length;
    for (var ro = 0; ro < runOnArticleObjLen; ro ++){
        var currRunOnArticleObj = runOnArticleObj[ro];
        var currRunOnArticleObjTxtFrm = currRunOnArticleObj.actualObj;
        //getting current page margin details from config
        var currRunOnArticleObjMargin;
        if (floatPlacerLastProcessedPage.name == 1 || currPage.name == 1){
            currRunOnArticleObjMargin = currRunOnArticleObj.layoutDetails.columnDetails.openerPageMargin;
            }//end of IF
        else {
            currRunOnArticleObjMargin = currRunOnArticleObj.layoutDetails.columnDetails.otherPageMargin;
            }//end of ELSE
        //=================================
        /*Now doing the below steps
            1. Modifying the master pages to match current layout 
            2.  Calculating the space available on last processed page
                  i. If the available space is greater than the above space then resizing the frame
                  ii. If no enough space available then triggering resolveOverset function and removing current text frame
           */ 
       //case 1: changing master page textgrame property=====================================================
       //changing CO master page property
       var currRunOnArticleObjClmDetails = currRunOnArticleObj.layoutDetails.columnDetails.openerPageColumnDetails;
       var currRunOnArticleObjClmDetailsLen = currRunOnArticleObjClmDetails.length;
       var bCOmasterPage = myDoc.masterSpreads.item("B-CO");
       var oldCOMstVersoFrm = bCOmasterPage.pages[0].textFrames.itemByName('FIRST_FRAME');
       var oldCOMstRectoFrm = bCOmasterPage.pages[1].textFrames.itemByName('FIRST_FRAME');
       var newCOMstVersoFrm = oldCOMstVersoFrm.duplicate([oldCOMstVersoFrm.geometricBounds[1],oldCOMstVersoFrm.geometricBounds[0]]);
       var newCOMstRectoFrm = oldCOMstRectoFrm.duplicate([oldCOMstRectoFrm.geometricBounds[1],oldCOMstRectoFrm.geometricBounds[0]]);
       //assigning frame property as in config
       newCOMstVersoFrm.properties.textFramePreferences.textColumnCount = currRunOnArticleObjClmDetailsLen;
       newCOMstVersoFrm.properties.textFramePreferences.textColumnGutter = currRunOnArticleObj.layoutDetails.columnDetails.openerPageColumnDetails[currRunOnArticleObjClmDetailsLen - 1].gutter;
       newCOMstRectoFrm.properties.textFramePreferences.textColumnCount = currRunOnArticleObjClmDetailsLen;
       newCOMstRectoFrm.properties.textFramePreferences.textColumnGutter = currRunOnArticleObj.layoutDetails.columnDetails.openerPageColumnDetails[currRunOnArticleObjClmDetailsLen - 1].gutter;
       oldCOMstVersoFrm.remove();//removing the old frame 
       oldCOMstRectoFrm.remove();//removing the old frame 
       //changing TXT master page property
       var currRunOnArticleObjClmDetails = currRunOnArticleObj.layoutDetails.columnDetails.columnDetails;
       var currRunOnArticleObjClmDetailsLen = currRunOnArticleObjClmDetails.length;
       var aTXTmasterPage = myDoc.masterSpreads.item("A-TXT");
       var oldTXTMstVersoFrm = aTXTmasterPage.pages[0].textFrames.itemByName('VERSO');
       var oldTXTMstRectoFrm = aTXTmasterPage.pages[1].textFrames.itemByName('RECTO');
       var newTXTMstVersoFrm = oldTXTMstVersoFrm.duplicate([oldTXTMstVersoFrm.geometricBounds[1],oldTXTMstVersoFrm.geometricBounds[0]]);
       var newTXTMstRectoFrm = oldTXTMstRectoFrm.duplicate([oldTXTMstRectoFrm.geometricBounds[1],oldTXTMstRectoFrm.geometricBounds[0]]);
       //assigning frame property as in config
       newTXTMstVersoFrm.properties.textFramePreferences.textColumnCount = currRunOnArticleObjClmDetailsLen;
       newTXTMstVersoFrm.properties.textFramePreferences.textColumnGutter = currRunOnArticleObj.layoutDetails.columnDetails.columnDetails[currRunOnArticleObjClmDetailsLen - 1].gutter;
       newTXTMstRectoFrm.properties.textFramePreferences.textColumnCount = currRunOnArticleObjClmDetailsLen;
       newTXTMstRectoFrm.properties.textFramePreferences.textColumnGutter = currRunOnArticleObj.layoutDetails.columnDetails.columnDetails[currRunOnArticleObjClmDetailsLen - 1].gutter;
       oldTXTMstVersoFrm.remove();//removing the old frame 
       oldTXTMstRectoFrm.remove();//removing the old frame 
       //==============================================================================================
       //and then resizing the frame if the page has required space
       if (floatPlacerLastProcessedPage.name == 1){
            var spaceAvblOnPage = (currRunOnArticleObjMargin.top + currRunOnArticleObj.layoutDetails.columnDetails.openerPageColumnDetails[currRunOnArticleObjClmDetailsLen - 1].height) - floatPlacerLastProcessedFrameBounds[2];
           }//end of IF
       else {
            var spaceAvblOnPage = (currRunOnArticleObjMargin.top + currRunOnArticleObj.layoutDetails.columnDetails.columnDetails[currRunOnArticleObjClmDetailsLen - 1].height) - floatPlacerLastProcessedFrameBounds[2];
           }//end of ELSE
        var minSpaceRequired = currRunOnArticleObj.layoutDetails.spaceAbove;
       //detaching newly added text  frame to current document frame
       if (parseInt(floatPlacerLastProcessedPage.name) %2 ==1){
           if (floatPlacerLastProcessedPage.name == 1){
                currTxtFrm = newCOMstRectoFrm.override(floatPlacerLastProcessedPage);
               }//end of IF
           else {
                currTxtFrm = newTXTMstRectoFrm.override(floatPlacerLastProcessedPage);
               }//end of ELSE 
            currTxtFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
           }//end of IF
       else {
            currTxtFrm = newTXTMstVersoFrm.override(floatPlacerLastProcessedPage);
            currTxtFrm.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
           }//end of ELSE
       currTxtFrm.previousTextFrame = currRunOnArticleObjTxtFrm;
       currTxtFrm.textFramePreferences.firstBaselineOffset = currRunOnArticleObj.layoutDetails.firstbaselineOffset;
       currRunOnArticleObjTxtFrm.remove();//removing the frm where initially text were placed
       var forceRemoveCurrTxtFrm = false;
       if (spaceAvblOnPage > minSpaceRequired){
           currTxtFrm.geometricBounds = [floatPlacerLastProcessedFrameBounds[2] + minSpaceRequired, currTxtFrm.geometricBounds[1],currTxtFrm.geometricBounds[2],currTxtFrm.geometricBounds[3]];
           }
       else {
           forceRemoveCurrTxtFrm = true;
           currTxtFrm.geometricBounds = [floatPlacerLastProcessedFrameBounds[2], currTxtFrm.geometricBounds[1],currTxtFrm.geometricBounds[2] + 10,currTxtFrm.geometricBounds[3]];
           }
       retriggeringFloatPlacer = true;
       floatPlacerLastProcessedFrame.name  = '';//removing the frame name from 'floatPlacerLastProcessedFrame' 
       ResolveOverset(app.activeDocument,retriggeringFloatPlacer,currTxtFrm);
       app.doScript(File(layerTemplateScript + "\\"+ "missingGlyph.jsx"), ScriptLanguage.javascript, [layerTemplateScript, glyphsConfig, currTxtFrm]);       
       if (forceRemoveCurrTxtFrm){
           var nxtFrm = currTxtFrm.nextTextFrame;
           currTxtFrm.remove();
           currTxtFrm = nxtFrm;
           floatPlacerLastProcessedPage = myDoc.pages[floatPlacerLastProcessedPage.name];
           }
       domXpath = currRunOnArticleObj.currentXpath;
       var currBlockXMLItem = currRunOnArticleObj.currentXMLItem;
       app.doScript(File(layerTemplateScript + "\\"+ "floatPlacer.jsx"), ScriptLanguage.javascript, [layerTemplateScript,currProgressPercent,percentSplit,floatPlacerError,scriptName,floatPlacerLastProcessedFrameBounds, currRunOnArticleObj, floatPlacerLastProcessedPage, retriggeringFloatPlacer,domXpath,floatsPlacementjson,currBlockXMLItem]);
        }//end of FOR loop
        floatsPlacementjson.open('a');
        floatsPlacementjson.write("}");
        floatsPlacementjson.close();
    //removing aid5:tablestyle attributes
    var rootNode = myDoc.xmlElements[0];
    var allTableTags = rootNode.evaluateXPathExpression('//Table');
    var allTableTagsLen = allTableTags.length;
    for (var rps = 0; rps < allTableTagsLen; rps ++){
        tabAlign(allTableTags[rps]);
       }
    //removing font atble frame
    if(app.activeDocument.textFrames.itemByName("REPLACE_FONT_TABLE").isValid){
        app.activeDocument.textFrames.itemByName("REPLACE_FONT_TABLE").remove();
        }
    //running project specific function after placing all floats
    var proof_typeNode = myDoc.xmlElements[0].evaluateXPathExpression("//div[@class='front']");
    if (proof_typeNode[0].xmlAttributes.itemByName("proof-type").isValid){
        proof_type = proof_typeNode[0].xmlAttributes.itemByName("proof-type").value;//this has to be changed when proof option is tuned on for web and print
        }
    else {
        proof_type = 'online';
        }
    if(File(layerTemplateScript + "\\"+ jrnlName + "_callProjectSpecificFunctionsAfterPlacingFloats.jsx").exists){
        app.doScript(File(layerTemplateScript + "\\"+ jrnlName + "_callProjectSpecificFunctionsAfterPlacingFloats.jsx"), ScriptLanguage.javascript, [proof_type]);
        }
    applyingTableCellandTextColor("//styled-content[@data-text-color]", "//Cell[@data-table-background-color]", proof_type);//for text coloring refer annrheumdis-2017-211300
	// if we have floatPlacerError then something went wrong inside floatPlacer
    if (floatPlacerError != ''){
        myDoc.close(SaveOptions.NO);
        debuggerMSG(floatPlacerError);
        displayMSG(floatPlacerError);
        writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
        exit();
    } 
    myDoc.save();//saving document
    debuggerMSG("Hyperlink for floats in progress...\tin-progress");               
    app.doScript(File(layerTemplateScript + "\\"+ "linkFloats.jsx"), ScriptLanguage.javascript, [layerTemplateScript]);
    myDoc.save();//saving document
    //=================highlighting cell overflows==================
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Highlighting cell overflows...\tin-progress\t" + Math.round(currProgressPercent));               
    var myDocTables = app.activeDocument.xmlElements[0].evaluateXPathExpression("//Table");
    var myDocTablesLen = myDocTables.length;
    for (var tbl = 0; tbl < myDocTablesLen; tbl ++){
        var currTable = myDocTables[tbl].tables[0];
        _table_cells_overflows(currTable);
        }
    //========================================================
    myDoc.save();//saving document
    myResetFindChangePref();
    //====Applying Part Opener master===
    debuggerMSG("Applying master for CO ...\tin-progress");               
    var partTitle = xmlDOM.evaluateXPathExpression("//p[@class='jrnlPartTitle']");
    if (partTitle.length == 1){
        app.activeDocument.pages[0].appliedMaster = app.activeDocument.masterSpreads.item("C-PO");
        }
    //========================================
    //checking whether the artcle is a prelims, if so changing all TXT page to FM_TXT page
    myResetFindChangePref();
    app.findGrepPreferences.findWhat = ".+";
    app.findGrepPreferences.appliedParagraphStyle = 'BK_TTL';
    var currFind = myDoc.findGrep();
    if (currFind.length != 0){
        var docPages = myDoc.pages;    
        var docPagesLen = docPages.length;
        for (var pg = 0; pg < docPagesLen; pg ++){
            if (docPages[pg].appliedMaster.name == 'A-TXT'){
                    docPages[pg].appliedMaster = app.activeDocument.masterSpreads.item("I-FM_TXT")
                }
            }
        }
    //=========Applying master pages starts=========
    debuggerMSG("Applying master ...\tin-progress");       
    applyMasterPage('HALF_TTL', 'H-HALF_TTL');
    applyMasterPage('SR_PAGE_TXT_FIRST', 'D-SR_PAGE');
    applyMasterPage('BK_TTL', 'G-TTL');
    applyMasterPage('CY_PG_TXT_FIRST', 'E-CYP_PAGE');
    applyMasterPage('DED_PG_TXT_FIRST', 'J-DED_PAGE');
    applyMasterPage('TOC_TTL', 'K-TOC_TTL');
    applyMasterPage('FM_TTL', 'L-FM_TTL');
    myResetFindChangePref();
    _links_update()

    function _links_update()
    {
            var link_modified = app.activeDocument.links.everyItem().edited;
            var links = app.activeDocument.links;
            var l=0;
            for(l=0;l<link_modified.length;l++)
            {
                    if(link_modified[l] == false)
                    {
                            try{
                                links[l].update();
                                } catch(e){}
                    }
            }
    }
    //=========Applying master pages ends=========
    //=========Removing unwanted pages starts==============
    debuggerMSG("Removing unused doc pages ...\tin-progress");
    removeUnsedTempltPages(myDoc);
    myDoc.save();//saving document
    //=========Removing unwanted pages ends==============    
    debuggerMSG("Updating template variables ...\tin-progress");
    var returnPercent = updatingVariables(currProgressPercent, percentSplit);
    //running project specific function after updating varibles
    if(File(layerTemplateScript + "\\"+ jrnlName + "_callProjectSpecificFunctionsAfterUpdatingVariables.jsx").exists){
        app.doScript(File(layerTemplateScript + "\\"+ jrnlName + "_callProjectSpecificFunctionsAfterUpdatingVariables.jsx"));
        }
    currProgressPercent = returnPercent;
    //applying aut fit for first page "FIRST_FRAME"
    var docPageCount = myDoc.pages.length;
    if (docPageCount == 1 && myDoc.pages[0].textFrames.itemByName('FIRST_FRAME')){
           myDoc.recompose(); 
           myDoc.pages[0].textFrames.itemByName('FIRST_FRAME').textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
           myDoc.pages[0].textFrames.itemByName('FIRST_FRAME').textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
           myDoc.recompose(); 
           myDoc.pages[0].textFrames.itemByName('FIRST_FRAME').textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
        }//end of IF
    myDoc.save();//saving document
    //===============To change page number lower roman if the file is prelimns
    myResetFindChangePref();
    app.findGrepPreferences.findWhat = ".+";
    app.findGrepPreferences.appliedParagraphStyle = 'BK_TTL';
    var currFind = myDoc.findGrep();
    if (currFind.length != 0){
      app.activeDocument.pages[0].appliedSection.properties = {continueNumbering:false, pageNumberStart: 1, pageNumberStyle:PageNumberStyle.LOWER_ROMAN};        
        }
    //temp code to place online box
    //alignStubFrameBaseToFirstFrameLastLine(myDoc, 'FIRST_FRAME', 'METAINFO');
    _meta_info_tag_frame_base_align();//aligning first page to cite box to text/lib frame
    placeOnlineBox("//p[@pstyle='jrnlRefText']", 18, layerTemplateScript, 'ONLINE_STMT', 407.603, "//p[@pstyle='jrnlCopyrightStmt']");
    //checking preflight =====================================
    //app.doScript(File(layerTemplateScript + "\\"+ "Preflight_for_Proofing.jsx"), ScriptLanguage.javascript);    
    //========================
    //Exporting PDF - starts
    debuggerMSG("Creating PDF ...\tin-progress");
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Creating PDF ...\tin-progress\t" + Math.round(currProgressPercent));       
    var myDoc = app.activeDocument;
    var prntPrstVar = myDoc.textVariables.item("PDF_PRST").variableOptions.contents;
    _define_pdf_presets(proof_type, config.exportPDFpreset[proof_type].crop_marks, config.exportPDFpreset[proof_type].bleed_marks, config.exportPDFpreset[proof_type].registration_marks, config.exportPDFpreset[proof_type].colour_bars, config.exportPDFpreset[proof_type].page_information, config.exportPDFpreset[proof_type].offset);
    var myPDFExportPreset = app.pdfExportPresets.item("PDF_PRESET");
    var pdfFolder = Folder(layerTemplateScript.replace(/scripts/,'pdf'));
    if (!(pdfFolder.exists)){
    pdfFolder.create();
    }
    if(app.activeDocument.xmlElements[0].evaluateXPathExpression("//div[@class='jrnlVidBlock']").length == 0){
        app.activeDocument.exportFile(ExportFormat.pdfType, File(pdfFolder + "/" +saveFileName.replace(".indd", ".pdf")), false, myPDFExportPreset);    
        }
    else{
        app.activeDocument.exportFile(ExportFormat.INTERACTIVE_PDF, File(pdfFolder + "/" +saveFileName.replace(".indd", ".pdf")), false);
        }
    //Exporting PDF - ends
    myDoc.save();//saving document before running export TOC xml function   
    exportPageCountDetails(layerTemplateScript);
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Closing active document\tin-progress\t" + Math.round(currProgressPercent));
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    }
//
function initialBasicFunction(inputHTMLFile){
    myInoutPathFSName = myInoutPath.fsName;
    var XMLfile = inputHTMLFile.fsName.replace(".htm", ".xml");
    myBaseScriptFolderPath = layerTemplateScript.replace(/scripts/, 'template')
    startDate, endDate;
    templateFile = File(layerTemplateScript.replace(/scripts/, "template") + "\\" + scriptName +".indt");//Need to update with centralised location
    debuggerMSG("Opening template...\tin-progress\t0");
    displayMSG("Opening template...\tin-progress\t0");
    myDoc = app.open(templateFile);
    debuggerMSG("Saving file...\tin-progress\t0")
    displayMSG("Saving file...\tin-progress\t0")
    myDoc = myDoc.save(File(layerTemplateScript.replace(/scripts/, "Application")  + "\\" + saveFileName));
    jrnlName = app.activeDocument.textVariables.itemByName("jrnlName").variableOptions.contents;
    //Converting HTML file to XML file
    if (!(File(XMLfile).exists)){//here we are checking if the xml file is already exists, if not, running xsl transformation
        debuggerMSG("Running transformation...\tin-progress\t0");
        displayMSG("Running transformation...\tin-progress\t0");
        var today = new Date();
        var timeStamp = today.getTime();
        var xslPath = layerTemplateScript + "\\" + "classValueToInddStyle.xsl";//major update in the code to auto download xsl from kriya website
        var jarPath = layerTemplateScript + "\\" +"saxon9.jar";
        var dosCmd = 'java -jar '+"\""+jarPath+"\""+' -s:'+"\""+inputHTMLFile.fsName+"\""+' -xsl:'+"\""+xslPath+"\""+' -o:'+"\""+XMLfile+"\"";
        var myBATfile = new File(inputHTMLFile.fsName.replace(".htm", ".bat"));
        myBATfile.open ('w');
        myBATfile.write(dosCmd);
        myBATfile.close();
            if (myBATfile.exists){
                myBATfile.execute();
                var sleepCounter = 10;
                while(!(File(XMLfile).exists) && (sleepCounter > 0)) {
                    sleepCounter--;
                    $.sleep(2000);
                    }
                if(!(File(XMLfile).exists)){
                    //alert("Transformation failed");
                    myDoc.close(SaveOptions.NO);
                    debuggerMSG("Error: Transformation failed\tfailed");
                    displayMSG("Error: Transformation failed\tfailed\t0");
                    writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                    exit();
                    } 
                } 
        }//end of IF (checking XML file exists)
    //----------------------------------------
    var sleepCounter = 10;
    while(!(File(XMLfile).rename(XMLfile))) {
                sleepCounter--;
        }
    var docPgBounds = myDoc.pages[0].bounds;
    pageWidth = docPgBounds[3] - docPgBounds[1];
    pageHeight = docPgBounds[2] - docPgBounds[0];
    var tFrames = myDoc.pages.item(1).pageItems;
    var tFramesLen = tFrames.length;
    for (var f = 0; f < tFramesLen; f ++){
        var fLabel = tFrames[f].label;
        if (fLabel == 'VERSO'){
            var currFrame = tFrames[f];
            f = tFramesLen;
            geoBoundsVerso = currFrame.geometricBounds;
            }
        }    
    var tFrames = myDoc.pages.item(2).pageItems;
    var tFramesLen = tFrames.length;
    for (var f = 0; f < tFramesLen; f ++){
        var fLabel = tFrames[f].label;
        if (fLabel == 'RECTO'){
            var currFrame = tFrames[f];
            f = tFramesLen;
            geoBoundsRecto = currFrame.geometricBounds;
            }
        }    
//~     geoBoundsVerso = myDoc.pages.item(1).pageItems.item("VERSO").geometricBounds;
//~     geoBoundsRecto = myDoc.pages.item(2).pageItems.item("RECTO").geometricBounds;
    //closing all opended book file save option yes
    myBooks = app.books;
    var bookLen = myBooks.length;
    for(var mb = 0; mb <bookLen; mb++){
        myBooks[mb].close(SaveOptions.YES);
        }
    //------------------------------------------------------------------
    //----read Inout File
    var myInputFile = File(XMLfile);//File(myInoutPath + "\\"+ inputHTMLFile);//Need to update with centralised location
    myInputFile.open('r');
    var xmlString = myInputFile.read();
    myInputFile.close();
    //----read Inout File
    //------------------------------------------------------------------
   // readNAddTags(app.activeDocument);
    debuggerMSG("Loading XML to document - starts...\tin-progress\t0");
    displayMSG("Loading XML to document - starts...\tin-progress\t0");
    myDoc.importXML(File(XMLfile));//Importing XML
    displayMSG("Loading XML to document - ends...\tin-progress\t0");
    debuggerMSG("Loading XML to document - ends...\tin-progress\t0");
    var rootNode = myDoc.xmlElements[0];
    //getting current article's proofing type from the xml
    var proof_typeNode = myDoc.xmlElements[0].evaluateXPathExpression("//div[@class='front']");
    if (proof_typeNode[0].xmlAttributes.itemByName("proof-type").isValid){
        proof_type = proof_typeNode[0].xmlAttributes.itemByName("proof-type").value;//this has to be changed when proof option is tuned on for web and print
        }
    else {
        proof_type = 'online';
        }
    //linking logos to template
    var logos_folder = layerTemplateScript.replace(/scripts/, 'logos') + "\\" + proof_type + "\\";
    var rectangleFrames= myDoc.rectangles; // getting rectangle from active template
    for (var i=0; i<rectangleFrames.length;i++)
    {
      rectanglelabel= rectangleFrames[i].label;
      rectangleName= rectangleFrames[i].name;
      pattern= new RegExp("TEMPLATE_LOGO_");
      var  rectangleFrameslabel  = '';
      rectanglelabelValidation =pattern.test(rectanglelabel); //validating rectangle label
      if(rectanglelabelValidation)
      {
          rectangleFrameslabel = rectanglelabel.replace(pattern,""); // Removing prefix from rectangles from label       
      }
      var path =new File(logos_folder + "/" + rectangleFrameslabel);
       if (path.exists && (rectangleFrameslabel != '')) // Checking wether logo exists in the path
       { 
           myDoc.rectangles[i].place(path); // Placing logo to rectangles                              
       }
       else if(!path.exists && rectanglelabelValidation)
       {
            logosPlacerError = "Error: " + rectangleFrameslabel + " logo is not available in the path ...\tfailed\t0";
            break;
           //myDoc.rectangles[i].fillColor = "ALERT"; // Alerts if logo not found on path by filling color 
       }
     }
    // placing logo to rectangles inside text frames    
    var textFrames = myDoc.textFrames;
    for (var t=0; t<textFrames.length; t++)
    {
         var  inlineRectangles=textFrames[t].rectangles; //getting rectangles in text frame of active template
         if(inlineRectangles.length > 0)
         {
             for(var r=0; r<inlineRectangles.length; r++)
             {               
                 inlineRectangleslabel = inlineRectangles[r].label; //getting label of recatangle inside text frame
                  inlinepattern= new RegExp("TEMPLATE_LOGO_");
                  var  inlineRectangles_label = '';
                  inlinerectanglelabelValidation =inlinepattern.test(inlineRectangleslabel); //validating rectangle label
                  if(inlinerectanglelabelValidation)
                  {
                      inlineRectangles_label = inlineRectangleslabel.replace(inlinepattern,""); // Removing prefix from rectangles from label        
                  }
                 var Inlinepath =new File(logos_folder + "/" + inlineRectangles_label);
                 if (Inlinepath.exists && (inlineRectangles_label != '')) // Checking wether logo exists in the path
                 {
                    myDoc.textFrames[t].rectangles[r].place(Inlinepath); // Placing logo to rectangles inside text frame                            
                 }
                else if(!Inlinepath.exists && inlinerectanglelabelValidation)
                {
                    logosPlacerError = "Error: " + inlineRectangleslabel + " logo is not available in the path ...\tfailed\t0";
                    break;
                   //myDoc.textFrames[t].rectangles[r].fillColor = "ALERT"; // Alerts if logo not found on path by filling color
                }
             }
         }
     }
 	// if we have error msg in logosPlacerError then something went wrong inside placeLinksUsingFrameLabel

    if (logosPlacerError != ''){
        myDoc.close(SaveOptions.NO);
        debuggerMSG(logosPlacerError);
        displayMSG(logosPlacerError);
        writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
        exit();
    } 
//==================================================================================
    //xmlDOM = rootNode.xmlItems.lastItem().xmlItems.lastItem();
    xmlDOM = rootNode.evaluateXPathExpression("//div[@type='main']/div[@class='doc']")[0];
    //This will check for an attribute called 'prefix' in '<div class='front'>' and will remove the unwanted layers from the file
    debuggerMSG("Removing unwanted layers ...\tin-progress\t0");
    displayMSG("Removing unwanted layers ...\tin-progress\t0");
    var scriptFile = (File(layerTemplateScript + "\\"+ jrnlName+"_indesignAutoPageConfig.jsx"));
    var script = '#include' + scriptFile.fullName;
    eval(script);
    var layerToBeUsed = 'undefined';
    var layerNameXMLNode = rootNode.evaluateXPathExpression("//div[@class='front']");
    if (layerNameXMLNode[0].xmlAttributes.itemByName("prefix").isValid){
        layerToBeUsed = layerNameXMLNode[0].xmlAttributes.itemByName("prefix").value;
        if (layerToBeUsed == ''){
            layerToBeUsed == 'undefined';
            }//end of IF
        }//end of IF
    else {
        layerToBeUsed == 'undefined';
        }
    //checking whether the journal or book id matches the template id
    var IDinXML = layerNameXMLNode[0].xmlAttributes.itemByName("journal-id").value;
    var templateID = myDoc.textVariables.item("TEMPLATE_ID").variableOptions.contents;
    if (!(IDinXML == templateID)){
        displayMSG("Error: Template mismatch ...\tfailed\t0");
        debuggerMSG("Error: Template mismatch ...\tfailed");
        writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
        myDoc.close(SaveOptions.YES);
        exit();
        }
    //==============watermark status==================
    //the default watermark status is true
    var proof_typeNode = myDoc.xmlElements[0].evaluateXPathExpression("//div[@class='front']");
    var watermarkStatus = 'false';
    if(proof_typeNode[0].xmlAttributes.itemByName("watermark").isValid){
        watermarkStatus = proof_typeNode[0].xmlAttributes.itemByName("watermark").value;
        }
    updateLayers(myDoc, rootNode, layerToBeUsed, config, watermarkStatus);
    //=======================loading color to the application file starts===================
    article_type = layerToBeUsed;
    var proof_typeNode = myDoc.xmlElements[0].evaluateXPathExpression("//div[@class='front']");
    proof_type = proof_typeNode[0].xmlAttributes.itemByName("proof-type").value;
    _color_changes(article_type,proof_type,config);
    _relinkLogos(layerTemplateScript,proof_type)
    //=========================================================================
    var tFrames = myDoc.pageItems;
    var tFramesLen = tFrames.length;
    for (var f = 0; f < tFramesLen; f ++){
        var fLabel = tFrames[f].label;
        if (fLabel == 'FIRST_FRAME'){
            firstFrame = tFrames[f];
            f = tFramesLen;
            }
        }
    //calculating the total number of floats in the current file
    var currDocDOM = myDoc.xmlElements[0];//appending document DOM object to config
    var floatBlocks = currDocDOM.evaluateXPathExpression("//floatBlock");
    var floatBlocksLen = floatBlocks.length;
    var defaultFunctionAlertCount = 12 + (floatBlocksLen * 2);//here 12 is the default msg print for each major function starts
    percentSplit = 100/defaultFunctionAlertCount;
    //firstFrame = myDoc.pageItems.item("FIRST_FRAME");
    // if the article is not configured the we will not have a frame to place the XML
    if ((typeof(firstFrame) === 'undefined') || (firstFrame.isValid == false)){
        myDoc.close(SaveOptions.NO);
        debuggerMSG("Error: Article type (" + article_type + ") not configured\tfailed");
        displayMSG("Error: Article type (" + article_type + ") not configured\tfailed\t0");
        writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
        exit();
    } 
/*
    First reading the config for 'runOnSectionsOrArticles' and moving the blocks to a separate text frame
    */
    var xmlDom = myDoc.xmlElements[0];
    var subRootNode = myDoc.xmlElements[0].evaluateXPathExpression("//root");
    var subRootNodexmlItems = subRootNode[0].xmlElements;
    var subRootNodexmlItemsLen = subRootNodexmlItems.length;
    if (!(typeof(config.runOnSectionsOrArticles) === 'undefined')){//if the config has objects for run on article then only proceeding further
    var currDocRunOnSections = config.runOnSectionsOrArticles;
    var currDocRunOnSectionsLen = currDocRunOnSections.length;
    var movedBlocksCounter = 0;
    for (var ros = 1; ros < subRootNodexmlItemsLen; ros ++){
        var currXMLItem = subRootNodexmlItems[ros];
        var currXMLItemName = currXMLItem.markupTag.name;
        var currXMLItemClassName = currXMLItem.xmlAttributes.itemByName("class").value;
        var currXMLItemXpath = "//" + currXMLItemName + "[@class=\'" + currXMLItemClassName + "\']";
        var currProofConfigObj = [];
        //checking to which config the xpath is matching
        for (var xp = 0; xp < currDocRunOnSectionsLen; xp ++){
            var configXpathName = currDocRunOnSections[xp].xpath;
            if (configXpathName == currXMLItemXpath){
                currProofConfigObj = currDocRunOnSections[xp];
                break;
                }
            }
        var currXMLBlock = currXMLItem.xmlItems.lastItem();
        //var currXMLBlock = currROSBlocks[bl];
        var textFrameToMove = myDoc.pages[0].textFrames.add({geometricBounds:[config.geoBoundsRecto[0], config.geoBoundsRecto[1] + config.pageSize.width, config.geoBoundsRecto[2], config.geoBoundsRecto[3] + config.pageSize.width]}); 
        textFrameToMove.placeXML(currXMLBlock);
        runOnArticleObj[movedBlocksCounter] = {"actualObj":textFrameToMove,"layoutDetails":currProofConfigObj,"currentXpath":currXMLItemXpath, "currentXMLItem":currXMLItem}
        movedBlocksCounter ++;
        try {
            if (currXMLBlock.xmlItems.length > 1){
                if (!currXMLBlock.xmlItems.lastItem().xmlAttributes.itemByName("aid:pstyle").isValid){
                    var lastXMLItempstyle = currXMLBlock.xmlItems.lastItem().xmlItems.lastItem().xmlAttributes.itemByName("aid:pstyle").value;
                    var lastParaAppliedStyle = currXMLBlock.xmlItems.lastItem().xmlItems.lastItem().paragraphs[0].appliedParagraphStyle.name;
                    }
                else {
                    var lastXMLItempstyle = currXMLBlock.xmlItems.lastItem().xmlAttributes.itemByName("aid:pstyle").value;
                    var lastParaAppliedStyle = currXMLBlock.xmlItems.lastItem().paragraphs[0].appliedParagraphStyle.name;
                    }
                if (lastXMLItempstyle != lastParaAppliedStyle){
                    currXMLBlock.xmlItems.lastItem().paragraphs[0].appliedParagraphStyle = lastXMLItempstyle;
                    }
                var firstXMLItempstyle = currXMLBlock.xmlItems.firstItem().xmlAttributes.itemByName("aid:pstyle").value;
                var firstParaAppliedStyle = currXMLBlock.xmlItems.firstItem().paragraphs[0].appliedParagraphStyle.name;
                if (firstXMLItempstyle != firstParaAppliedStyle){
                    currXMLBlock.xmlItems.firstItem().paragraphs[0].appliedParagraphStyle = firstXMLItempstyle;
                    }
                }
            else {
                var lastXMLItempstyle = currXMLBlock.xmlItems[0].xmlItems.lastItem().xmlAttributes.itemByName("aid:pstyle").value;
                var lastParaAppliedStyle = currXMLBlock.xmlItems[0].xmlItems.lastItem().paragraphs[0].appliedParagraphStyle.name;
                if (lastXMLItempstyle != lastParaAppliedStyle){
                    currXMLBlock.xmlItems[0].xmlItems.lastItem().paragraphs[0].appliedParagraphStyle = lastXMLItempstyle;
                    }
                var firstXMLItempstyle = currXMLBlock.xmlItems[0].xmlItems.firstItem().xmlAttributes.itemByName("aid:pstyle").value;
                var firstParaAppliedStyle = currXMLBlock.xmlItems[0].xmlItems.firstItem().paragraphs[0].appliedParagraphStyle.name;
                if (firstXMLItempstyle != firstParaAppliedStyle){
                    currXMLBlock.xmlItems[0].xmlItems.firstItem().paragraphs[0].appliedParagraphStyle = firstXMLItempstyle;
                    }
                }
            }
        catch(e){}
        }//end of FOR loop
    }//end of IF
//===============================================================
    firstFrame.placeXML(xmlDOM);
    try {
        var lastXMLItempstyle = xmlDOM.xmlItems.lastItem().xmlItems.lastItem().xmlAttributes.itemByName("aid:pstyle").value;
        var lastParaAppliedStyle = xmlDOM.xmlItems.lastItem().xmlItems.lastItem().paragraphs[0].appliedParagraphStyle.name;
        if (lastXMLItempstyle != lastParaAppliedStyle){
            xmlDOM.xmlItems.lastItem().xmlItems.lastItem().paragraphs[0].appliedParagraphStyle = lastXMLItempstyle;
            }
        }
    catch(e){}
//===============================================================
    //removing aid:pstyle attributes
    var allPstyleTags = rootNode.evaluateXPathExpression('//p|h1|h3|h4|h5|h6');
    var allPstyleTagsLen = allPstyleTags.length;
    for (var rps = 0; rps < allPstyleTagsLen; rps ++){
       allPstyleTags[rps].xmlAttributes.itemByName("aid:pstyle").remove();//===============removing aid:pstyle='jrnlFigRef|jrnlTblRef|jrnlBoxRef' attributes
       }
    //removing aid:cstyle attributes
    var allCstyleTags = rootNode.evaluateXPathExpression('//span|jrnlBibRef');
    var allCstyleTagsLen = allCstyleTags.length;
    for (var rps = 0; rps < allCstyleTagsLen; rps ++){
        if (allCstyleTags[rps].xmlAttributes.itemByName("aid:cstyle").isValid){
            allCstyleTags[rps].xmlAttributes.itemByName("aid:cstyle").remove();//===============removing aid:cstyle from all span tags
            }
       }
    //removing aid5:cellstyle attributes
    var allCellTags = rootNode.evaluateXPathExpression('//Cell');
    var allCellTagsLen = allCellTags.length;
    for (var rps = 0; rps < allCellTagsLen; rps ++){
        try{
            allCellTags[rps].xmlAttributes.itemByName("aid5:cellstyle").remove();//===============removing aid:cstyle='jrnlFigRef|jrnlTblRef|jrnlBoxRef' attributes
            }catch(e){}
       }
    //removing aid5:tablestyle attributes
    var allTableTags = rootNode.evaluateXPathExpression('//Table');
    var allTableTagsLen = allTableTags.length;
    for (var rps = 0; rps < allTableTagsLen; rps ++){
       try{
        allTableTags[rps].xmlAttributes.itemByName("aid5:tablestyle").remove();//===============removing aid:cstyle='jrnlFigRef|jrnlTblRef|jrnlBoxRef' attributes
           }catch(e){}
        //tabAlign(allTableTags[rps]);
       }
//===============================================================
    var currLastFrame = firstFrame.endTextFrame;
    if (currLastFrame.paragraphs.lastItem().isValid){
        var currLastFrameLastPara = currLastFrame.paragraphs.lastItem();
        if (currLastFrameLastPara.contents == ''){
            currLastFrameLastPara.remove();
            }//end of IF
        }//end of IF
    currProgressPercent = percentSplit;
    debuggerMSG("Character formatting is in progress ...\tin-progress\t" + Math.round(currProgressPercent));       
    displayMSG("Character formatting is in progress ...\tin-progress\t" + Math.round(currProgressPercent));       
    characterStylemapping();
    //=========adding 'br'=============== ===
//~     myResetFindChangePref()
//~     app.findTextPreferences.findWhat ="[$$S_R$$]";
//~     app.changeTextPreferences.changeTo = "^n";
//~     app.changeText();
    //=====================================
    //=========force align=============== ===
    try {
    myResetFindChangePref()
    app.findGrepPreferences.findWhat ="\\s";
    app.findGrepPreferences.appliedCharacterStyle ="forceJustify";
    app.changeGrepPreferences.changeTo = "~i";
    app.changeGrep();} catch(e){}
    //=====================================
    debuggerMSG("Handling URLs for breaking ...\tin-progress\t" + Math.round(currProgressPercent));       
    displayMSG("Handling URLs for breaking ...\tin-progress\t" + Math.round(currProgressPercent));       
    addingDiscretionaryLineBreakForURLs();
    debuggerMSG("Resolving overflows across document ...\tin-progress\t" + Math.round(currProgressPercent));       
    displayMSG("Resolving overflows across document ...\tin-progress\t" + Math.round(currProgressPercent));       
    ResolveOverset(app.activeDocument);
    debuggerMSG("Removing bat file");       
    //myBATfile.remove();
    debuggerMSG("Running cleanup file");       
    //File(XMLfile).remove();
}    

function updatingVariables(currProgressPercent, percentSplit){
    currProgressPercent = currProgressPercent + percentSplit;
    displayMSG("Updating page number...\tin-progress\t" + Math.round(currProgressPercent));           
    var  chapDOM = myDoc.xmlElements[0];
    try{
        //=======applying start page number======
        var fpageNumNode = chapDOM.evaluateXPathExpression("//div[@fpage]");
        if (fpageNumNode.length > 0){
            var fpageNum = fpageNumNode[0].xmlAttributes.itemByName("fpage").value;
            fpageNum = fpageNum.replace('F','');
            if(fpageNum != '' && parseInt(fpageNum) > 1){
                app.activeDocument.sections[0].continueNumbering = false;
                app.activeDocument.sections[0].pageNumberStart = parseInt(fpageNum);
                }//end of IF
            }//end of IF
        //==================================
        var RHElement = chapDOM.evaluateXPathExpression("//h1[@pstyle='jrnlArtTitle']")
    //==================updaing last page name starts===============
    var lastPageName;
    var lastPageVariable = myDoc.textVariables.item("LP");
    var docPages = myDoc.pages;
    var pagesLen = docPages.length;
    var lastPage = docPages[pagesLen-1];
    var lastPrevPage = docPages[pagesLen-2];
    var lastPageMaster =  lastPage.appliedMaster.name;
    if (lastPageMaster == "F-BLANK"){
        if (lastPrevPage.textFrames[0].textFramePreferences.textColumnCount > 1){
            lastPrevPage.textFrames[0].textFramePreferences.verticalBalanceColumns = true;    
            }
        lastPageName = lastPrevPage.name;
        lastPageVariable.variableOptions.contents = lastPageName;
        }//end of IF
    else{
        if (lastPage.textFrames.itemByName("VERSO").isValid){
            if (lastPage.textFrames.itemByName("VERSO").textFramePreferences.textColumnCount > 1){
                lastPage.textFrames.itemByName("VERSO").textFramePreferences.verticalBalanceColumns = true;    
                }        
            }
        else if (lastPage.textFrames.itemByName("RECTO").isValid){
            if (lastPage.textFrames.itemByName("RECTO").textFramePreferences.textColumnCount > 1){
                lastPage.textFrames.itemByName("RECTO").textFramePreferences.verticalBalanceColumns = true;    
                }        
            }
        else if (lastPage.textFrames.itemByName("FIRST_FRAME").isValid){
            if (lastPage.textFrames.itemByName("FIRST_FRAME").textFramePreferences.textColumnCount > 1){
                lastPage.textFrames.itemByName("FIRST_FRAME").textFramePreferences.verticalBalanceColumns = true;    
                }        
            }
        lastPageName = lastPage.name;
        lastPageVariable.variableOptions.contents = lastPageName;
        }//end of ELSE
    //==================updaing last page name ends===============
        RRHNode = RHElement[0].xmlAttributes.itemByName("RRH").value;
        VRHNode = RHElement[0].xmlAttributes.itemByName("VRH").value;
        volNode = RHElement[0].xmlAttributes.itemByName("vol_num").value;
        issMonNode = RHElement[0].xmlAttributes.itemByName("iss_mon").value;
        issYearNode = RHElement[0].xmlAttributes.itemByName("iss_year").value;
        jrnlAbbrNode = RHElement[0].xmlAttributes.itemByName("jrnl_Abbr").value;
        variableRRH = myDoc.textVariables.item("RRH");
        variableVRH = myDoc.textVariables.item("VRH");
        variableVol = myDoc.textVariables.item("VOL_NUM");
        variableMonth = myDoc.textVariables.item("ISS_MONTH");
        variableYear = myDoc.textVariables.item("ISS_YEAR");
        variableJrnlAbbr = myDoc.textVariables.item("jrnl_Abbr");
        variableRRH.variableOptions.contents = RRHNode;
        variableVRH.variableOptions.contents = VRHNode;
        variableVol.variableOptions.contents = volNode;
        variableMonth.variableOptions.contents = issMonNode;
        variableYear.variableOptions.contents = issYearNode;
        variableJrnlAbbr.variableOptions.contents = jrnlAbbrNode;
        variableRRH.convertToText();
        variableVRH.convertToText();
        variableVol.convertToText();
        variableMonth.convertToText();
        variableYear.convertToText();
        variableJrnlAbbr.convertToText();
        return currProgressPercent;
     }
    catch(e){debuggerMSG("Updating Variables - failed" + e); 
        return currProgressPercent;}
}



endDate= new Date();
var timeSpan=(endDate.getTime()-startDate.getTime())/1000;
timeSpan = timeSpan/60;
app.pdfPlacePreferences.pdfCrop = appPDFcropPref;//reverting application default figure import option
myDoc.close(SaveOptions.YES);    
displayMSG(scriptName +" document processed successfully\tcompleted\t100");
writeTxtFile("completed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)

//Function for removing unwanted para marks
function deleteUnwantedPara(){
        myResetFindChangePref();
        app.findGrepPreferences.findWhat = "^\\r";
        var tempFind = app.activeDocument.findGrep();
        myResetFindChangePref();
        var tempFindLen = tempFind.length;
        for (var tf = 0; tf<tempFindLen; tf++)
        {   
            if (tempFind[tf].tables.length ==  0){
                tempFind[tf].remove();
                }
            }        
   }

//Function for removing overset
function ResolveOverset(currDoc)
{
    try{
        newFilexmlDOM = currDoc.xmlElements[0];
        var currFrameParaLen;
        app.alignDistributePreferences.alignDistributeBounds=AlignDistributeBounds.MARGIN_BOUNDS;
        currDoc.viewPreferences.rulerOrigin = RulerOrigin.spreadOrigin;
        currDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
        currDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
        currDoc.zeroPoint = new Array (0,0);
//~         var myNoOfColumn=currDoc.pages[1].marginPreferences.columnCount;	
        currDoc.layoutWindows[0].zoom(ZoomOptions.fitSpread);
         app.activeWindow.zoomPercentage = 100;
         var addedPageCt = 0;//To avoid pages flowing contionously, we have updated the script so that proofing will stop saying "Proofing stopped! Float element is keep on flowing-Please do appropriate changes"
         var mycurrentFrameCont = 'Unassinged';
         if (retriggeringFloatPlacer){
             firstFrame = currTxtFrm;
             }//end of IF
         if (firstFrame.isValid == false){
             firstFrame = currDoc.pages[0].textFrames[0];
             }
            var preTxtFrm, currFrame = '';
            var testPreFrm;
            var trigger = 0;
             while (((firstFrame.endTextFrame.overflows) && trigger < 2) || (trigger < 2 && (firstFrame.overflows) && (retriggeringFloatPlacer)))
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
                    currDoc.recompose();
                    var frmOnPage = currDoc.pages[-1].textFrames.itemByName("VERSO");
                    frmOnPage.geometricBounds = currDoc.masterSpreads.item("A-TXT").pages[0].textFrames.itemByName("VERSO").geometricBounds;
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
                    currDoc.recompose();
                    var frmOnPage = currDoc.pages[-1].textFrames.itemByName("RECTO");
                    frmOnPage.geometricBounds = currDoc.masterSpreads.item("A-TXT").pages[1].textFrames.itemByName("RECTO").geometricBounds;
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
                    }//end of IF
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
                    }//end of ELSE
                //code has been modifed here to ensure whether the current frame or the first frames parent's master page name is not null to avoid text linking to master page 
                //if the below condition is true then stopping script and exiting
                if (mycurrentFrame.parentPage.appliedMaster == null || firstFrame.parentPage.appliedMaster == null ||mycurrentFrame.previousTextFrame.parentPage.appliedMaster == null){
                    debuggerMSG("Error: Resolving overset failed\tfailed");
                    displayMSG("Error: Resolving overset\tfailed\t0");
                    writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                    exit();
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
                                    displayMSG("Error: Proofing failed - Tables overflows\tfailed\t" + Math.round(currProgressPercent));
                                    app.activeDocument.close(SaveOptions.YES);
                                    writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                    exit();
                                    }//end of if
                                }//end of for
                            }//end of if
                        else if (currFrmParas[0].allGraphics.length > 0){
                            try{
                                var currFrmParasGr = currFrmParas[0].allGraphics[0].geometricBounds;}
                            catch (e) {
                                    debuggerMSG("Proofing failed - Graphic size more than text area");
                                    app.activeDocument.close(SaveOptions.YES);
                                    writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                    exit();
                                    }
                            }//end of else if 
                        else if (currFrmParas[0].lines.length > 0){
                            var currFrmFirstParaStyle = currFrmParas[0].paragraphs[0].appliedParagraphStyle.name;
                            if (currFrmParas[0].lines.lastItem().parentTextFrames.isValid || (currFrmFirstParaStyle == 'TOC_TTL' || currFrmFirstParaStyle == 'FM_TTL')){
                                }
                            else{
                                    debuggerMSG("Proofing failed - String length (line) exceeds text area or can't fit inside text frame");
                                    app.activeDocument.close(SaveOptions.YES);
                                    writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                                    exit();
                                    }
                            }//end of else if 
                        }//end of if
                }
                //======================================             
            }//end of while 
        if(retriggeringFloatPlacer){
            var docFirstFrame = currTxtFrm;
            var currLastFrame = docFirstFrame.endTextFrame;
            }//end of IF
        else {
            var docFirstFrame = currDoc.pages[0].textFrames.itemByName('FIRST_FRAME');
            //checking whether the endTextFrame has paragraphs, if not the previious frame might be the last frame
            var currLastFrame = docFirstFrame.endTextFrame;
            while(currLastFrame.paragraphs.length == 0){
                currLastFrame = currLastFrame.previousTextFrame;
                }
            }//end of ELSE 
        if (currLastFrame.paragraphs.lastItem().isValid){
            var currLastFrameParas = currLastFrame.paragraphs;
            var currLastFrameParasLen = currLastFrameParas.length;
            var currLastFrameLastPara = currLastFrame.paragraphs.lastItem();
            var currLastFrameLastParaStyle = currLastFrameLastPara.appliedParagraphStyle.name;
            var currLastFrameLastParaLastChar = currLastFrameLastPara.characters.lastItem();
            if (currLastFrameParasLen > 1){
                var penultPara = currLastFrame.paragraphs[currLastFrameParasLen - 2];
                var penultParaStyle =  penultPara.appliedParagraphStyle.name;
                var currLastFrameLastParaChars = currLastFrameLastPara.characters;
                var currLastFrameLastParaCharsLen = currLastFrameLastParaChars.length;
                //checking whether the para's all characters are empty, then all characters should be empty xml nodes
                if (/^[\uFFFC\uFEFF\t\s\r\n]*$/.test(currLastFrameLastPara.contents)){
                    //Indesign quits while removing the entermark from penultimate para if the last para empty para has span style, so removing span property from the last paragraph 
                    currLastFrameLastPara.appliedParagraphStyle = myDoc.paragraphStyles.itemByName("TXT");//sometimes application close while removing if the last para has span style, so applying TXT first and then proceeding further
                    currLastFrameLastPara.spanSplitColumnCount = SpanColumnCountOptions.ALL;
                    currLastFrameLastPara.spanColumnType = SpanColumnTypeOptions.SINGLE_COLUMN;
                    penultPara.characters.lastItem().contents = '';
                    penultPara.applyParagraphStyle = currDoc.paragraphStyles.itemByName(penultParaStyle)
                    }//end of IF
                else if(currLastFrameLastParaChars.lastItem().contents == '\r'){
                    currLastFrameLastParaChars.lastItem().contents = '';
                    //currLastFrameLastPara.appliedParagraphStyle = currDoc.paragraphStyles.itemByName(currLastFrameLastParaStyle);
                    }//end of ELSE IF
                }//end of IF
            else if (currLastFrameParasLen == 1){//some times the last frame would have only one enter mark (the last enter mark), then need to last para of previous text frame as penultimate para
                var preTextFrame = currLastFrame.previousTextFrame;
                if (preTextFrame.paragraphs.length > 0){
                    var penultPara = preTextFrame.paragraphs.lastItem();
                    var penultParaStyle =  penultPara.appliedParagraphStyle.name;
                    var currLastFrameLastParaChars = currLastFrameLastPara.characters;
                    var currLastFrameLastParaCharsLen = currLastFrameLastParaChars.length;
                    //checking whether the para's all characters are empty, then all characters should be empty xml nodes
                    if (/^[\uFFFC\uFEFF\t\s\r\n]*$/.test(currLastFrameLastPara.contents)){
                        //Indesign quits while removing the entermark from penultimate para if the last para empty para has span style, so removing span property from the last paragraph 
                        currLastFrameLastPara.appliedParagraphStyle = myDoc.paragraphStyles.itemByName("TXT");//sometimes application close while removing if the last para has span style, so applying TXT first and then proceeding further
                        currLastFrameLastPara.spanSplitColumnCount = SpanColumnCountOptions.ALL;
                        currLastFrameLastPara.spanColumnType = SpanColumnTypeOptions.SINGLE_COLUMN;
                        penultPara.characters.lastItem().contents = '';
                        penultPara.applyParagraphStyle = currDoc.paragraphStyles.itemByName(penultParaStyle);
                        }//end of IF
                    else if(currLastFrameLastParaChars.lastItem().contents == '\r'){
                        currLastFrameLastParaChars.lastItem().contents = '';
                        //currLastFrameLastPara.appliedParagraphStyle = currDoc.paragraphStyles.itemByName(currLastFrameLastParaStyle);
                        }//end of ELSE IF
                    }//end of IF
                }//end of IF
            }//end of IF
        } catch (e){debuggerMSG("Resolve overset function failed ..." + e);}
    } 


//Function to remove unused template pages 
function removeUnsedTempltPages(newFile){
    ResolveOverset(app.activeDocument);    
    var newFileTotPg = newFile.pages;
    var newFileTotPgLen = newFileTotPg.length;
    for(var nfp = newFileTotPgLen-1; nfp >=0; nfp --){
        var regPat = new RegExp (/^\s*$/);
        var docPageLen = newFile.pages.length;
        var currPageItemObject = newFileTotPg[nfp].pageItems[0];
       // newFileTotPg[nfp].pageItems[0].select();
       // var consName = app.selection[0].constructor.name;
        if (currPageItemObject == '[object TextFrame]'){
            if (currPageItemObject.name == 'FLOAT_CONT' || (newFileTotPg[nfp].pageItems.length > 1)){
                }
//~             else if(newFileTotPg[nfp].pageItems[0].contents == "" ||regPat.test(newFileTotPg[nfp].pageItems[0].contents) && !(nfp == newFileTotPgLen-1) && !(docPageLen%2 == 1)){//This has been commented!IMPORTANT!
//~                 newFileTotPg[nfp].appliedMaster = newFile.masterSpreads.item("F-BLANK");
//~                 }
            else if(newFileTotPg[nfp].pageItems[0].contents == "" ||regPat.test(newFileTotPg[nfp].pageItems[0].contents) && !(nfp == newFileTotPgLen-1) && (docPageLen%2 == 1)){
                newFileTotPg[nfp].remove();
                }
            else if(newFileTotPg[nfp].pageItems[0].contents == "" ||regPat.test(newFileTotPg[nfp].pageItems[0].contents) && (nfp == newFileTotPgLen-1)){
                newFileTotPg[nfp].remove();
                }                        
            app.activeDocument.recompose();
            newFileTotPg = newFile.pages;
            newFileTotPgLen = newFileTotPg.length;
            }
        }//end for loop
//=================================================
        var fBlankPgs = app.activeDocument.pages;//doc pages
        var fBlankPgsLen = fBlankPgs.length;
        for (var rp = fBlankPgsLen - 2; rp >=0; rp --){//removing empty pages
            var currPgName = fBlankPgs[rp].appliedMaster.name;
            if (currPgName == 'F-BLANK'){
                fBlankPgs[rp].remove();
                }
            else {
                break;
                }
            }
//=================================================
    app.activeDocument.recompose();
    docPageLen = newFile.pages.length;//commented
//~     if(docPageLen%2 == 1){
//~         myPage  = newFile.pages.item(docPageLen-1)
//~         addedPage = newFile.pages.add(LocationOptions.AT_END, myPage);
//~         addedPage.appliedMaster = newFile.masterSpreads.item("F-BLANK");        
//~     }
}

//error log function
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


//Function to reset/clear find and change values
function myResetFindChangePref(){
	app.findTextPreferences = NothingEnum.nothing;
	app.changeTextPreferences = NothingEnum.nothing;
	app.findGrepPreferences = NothingEnum.nothing;
	app.changeGrepPreferences = NothingEnum.nothing;
}
function getActiveScriptPath() {
    // This function returns the path to the active script, even when running from ESTK
    try { 
        return app.activeScript; 
    } catch(e) { 
        var test = e;
        return e.fileName; 
    }
}
//==============Character style mapping function starts=========
function characterStylemapping(){
        var myDoc = app.activeDocument;
        //==================For Creating Log Report========================
        var myPath = myDoc.fullName + "";
        myPath = myPath.replace(".indd",".txt");
        var myxml =[],  id=0, label=0, styleName=[];
        var searchNames = "bold|sup|sub|uline|sc|italic";
        try{
            ProcessMainParent ("italic");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for italic"); 
            app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit();
            }
        try{
            ProcessMainParent ("bold");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for bold"); app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit();
                }
        try{
            ProcessMainParent ("sup");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for supscript"); app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit();
                }
        try{
            ProcessMainParent ("sub");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for subscript"); app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit();
                }
        try{
            ProcessMainParent ("uline");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for underline"); app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit(); 
                }
        try{
            ProcessMainParent ("sc");} catch (e){
            displayMSG("Character formatting failed ...\tfailed\t"+ percentSplit);       
            debuggerMSG("Character style mapping - failed for smallcaps"); app.activeDocument.close(SaveOptions.NO); 
            writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
            exit();
                }
        //alert("Character Style Processing completed");
        //myFile.execute();
        //--------------------Functions
        function ProcessMainParent(parentTagName){
        myxml = []; label=0;
        passValueToMap("//"+parentTagName);
        for (var i=0; i<myxml.length; i++){
            id=0; styleName=[];
            var myParent = myxml[i].parent.markupTag.name;
            if (myParent.search(searchNames)==-1){//Retuns -1 if search fails
                myxml[i].applyCharacterStyle("EXP-"+parentTagName);
                var childElements = myxml[i].xmlElements;
                styleName[id++] = parentTagName;
                if (childElements.length>0){
                        processChildNodes(childElements);
                        }//End of if childElements.length>0        styleName[id++] = parentTagName;
                }//End of if myParent.search
            }//End of For i
        }
        function processChildNodes(xmlObj){
            
            for (var j=0; j<xmlObj.length; j++){
                if (xmlObj[j].markupTag.name.search(searchNames)!=-1){//Retuns postive values it search is true
                    styleName[id++] = xmlObj[j].markupTag.name;
                    }
                var CurrentTagName = xmlObj[j].markupTag.name;
                if (CurrentTagName.search(searchNames)!=-1){//Retuns postive values it search is true
                    var tempName = styleName.slice();
                    tempName.sort()
                    var myCharStyleName = "EXP-"+tempName.join("-");
                    try{
                    xmlObj[j].applyCharacterStyle(myCharStyleName);
                    }
                    catch (err){
                        debuggerMSG(xmlObj[j].texts[0].words[0].contents)
                        debuggerMSG(xmlObj[j].texts[0].paragraphs[0].contents)
                        //app.select(xmlObj[j].texts[0].contents);
                        }
                        if (xmlObj[j].xmlElements.length>0){
                        processChildNodes(xmlObj[j].xmlElements);//Recursive call of this function 
                        }
                      styleName.pop();
                        id--;
                    }//End of if CurrentTagName.search
                }//End j for loop
            }//End of Function Process chile Nodes
        //--------------
        function MapCharStyle(myXPath){
            this.name = "MapCharStyle";
            this.xpath = myXPath;
            this.apply = function(myElement, myRuleProcessor){
                var myText = myElement.texts[0]
                myxml[label++] = myElement;
                }
            return true;
        }

        function passValueToMap(XPATH){
            var myRuleSet = new Array (new MapCharStyle(XPATH));
            with(myDoc)
                {
                var elements = xmlElements;
                __processRuleSet(elements.item(0), myRuleSet);
                }//end with
            }//End of function

        function ruleProcessorObject(ruleSet, ruleProcessor) {
           this.ruleSet = ruleSet;
           this.ruleProcessor = ruleProcessor;
        }

        function __makeRuleProcessor(ruleSet, prefixMappingTable){
            // Get the condition paths of all the rules.
            var pathArray = new Array();
            for (i=0; i<ruleSet.length; i++)
            {
                 pathArray.push(ruleSet[i].xpath);
            }

            // the following call can throw an exception, in which case 
            // no rules are processed  
            try{
                var ruleProcessor = app.xmlRuleProcessors.add(pathArray, prefixMappingTable);
            }
            catch(e){
                throw e;
            }
            var rProcessor =  new ruleProcessorObject(ruleSet, ruleProcessor);
            return rProcessor;
        }

        function __deleteRuleProcessor(rProcessor) {
            // remove the XMLRuleProcessor object
            rProcessor.ruleProcessor.remove();
            
            // delete the object properties
            delete rProcessor.ruleProcessor;
            delete rProcessor.ruleSet;
            
            // delete the object itself
            delete	rProcessor;
        }

        function __processRuleSet (root, ruleSet, prefixMappingTable)
        {
                var mainRProcessor = __makeRuleProcessor(ruleSet, prefixMappingTable);

                // if __processTree() fails with an exception, 
                // delete ruleProcessor and throw e
                try {
                    __processTree(root, mainRProcessor);
                    __deleteRuleProcessor(mainRProcessor);
                } catch (e) {
                    __deleteRuleProcessor(mainRProcessor);
                    throw e;
                }
        }

        function __processTree (root, rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            try
            {
                var matchData = ruleProcessor.startProcessingRuleSet(root);
                __processMatchData(matchData, rProcessor);
                         
                ruleProcessor.endProcessingRuleSet();
            }
            catch (e)
            {
                // no longer deleting ruleProcessor within __processTree
                // deletion occurs either in __processRuleSet, or external
                // to glue code.
                ruleProcessor.endProcessingRuleSet();
                throw e;
            }
         }

        function __processChildren(rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            try
            {
                var matchData = ruleProcessor.startProcessingSubtree();
                __processMatchData(matchData, rProcessor);
            }
            catch (e)
            {
                ruleProcessor.halt();
                throw e;
            }
        }

        function __processMatchData(matchData, rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            var ruleSet = rProcessor.ruleSet;
            while (matchData != undefined)
            {
                var element = matchData.element;
                var matchRules = matchData.matchRules;
                var applyMatchedRules = true;

                // apply the action of the rule. 
                // Continue applying rules as long as the apply function returns false.
                for (var i=0; i<matchRules.length && applyMatchedRules && !ruleProcessor.halted; i++)
                {
                    applyMatchedRules = (false == ruleSet[matchRules[i]].apply(element, rProcessor));
                }
                matchData = ruleProcessor.findNextMatch();
            }
        }

        function __skipChildren(rProcessor)
        {
            rProcessor.ruleProcessor.skipChildren();
        }
            
    }
//==============Character styling function ends=========

//==============Table magic fit function starts=========
function magicFit(){
        var LATENCE = 2; 		// in seconds (default:2)
        var PRECISION = 3;	// in pts (default:0.5)//Modified on 28-Jan-2014 to leave cell width if it is less than 3pt, previous value (0.5), made by Augustine 
        var APP_INT_VERSION = parseInt(app.version);


        //----------------------------------------------------------
        //			TOOLBOX FUNCTIONS
        //----------------------------------------------------------


        /*void*/	function exitMessage(/*exception*/ ex)
        //----------------------------------------------------------
        {
        //alert("Error:\n" + ex.toString());
        exit();
        }


        //----------------------------------------------------------
        //			DOCUMENT METHODS
        //----------------------------------------------------------


        /*void*/ Document.prototype.setUnitsTo = function(/*units*/ newUnits)
        //----------------------------------------------------------
        // units can be single value (horiz=vert) or array(horizUnits, vertUnits)
        {
        var arrUnits = (newUnits.length) ? newUnits : new Array(newUnits,newUnits);
        this.viewPreferences.horizontalMeasurementUnits = arrUnits[0];
        this.viewPreferences.verticalMeasurementUnits = arrUnits[1];
        }

        /*arr2*/ Document.prototype.getUnits = function()
        //----------------------------------------------------------
        {
        return(Array(
            this.viewPreferences.horizontalMeasurementUnits,
            this.viewPreferences.verticalMeasurementUnits));
        }

        /*bool*/ Document.prototype.withinDelay = function()
        //----------------------------------------------------------
        {
        if (this.label)
            return( (Date.parse(Date())-this.label) <= LATENCE*1000 );
        return(false);
        }

        /*void*/ Document.prototype.storeTimeStamp = function()
        //----------------------------------------------------------
        {
        this.label = Date.parse(Date()).toString();
        }


        //----------------------------------------------------------
        //			GENERIC METHODS (OBJECT LEVEL)
        //----------------------------------------------------------


        /*arr*/ Object.prototype.asObjsToFit = function()
        //----------------------------------------------------------
        // Returns the "fittable-container" corresponding to THIS
        // Return array or collection HorizFit-compliant
        // NULL if failure
        {
        switch(this.constructor.name)
            {
            case "TextFrame" :			// textframe -> singleton this
                return(Array(this));

            case "Cell" :				// cells -> parent columns
                var r = new Array();
                // !! [CS1] Cell::parentColumn === Cell !!
                // !! [CS2] Cell::parentColumn === Column !!
                // !! [CS2] Cells::lastItem().parentColumn BUG !!
                var c0 = this.cells.firstItem().name.split(":")[0];
                var c1 = this.cells.lastItem().name.split(":")[0];
                for (var i=c0 ; i<=c1; i++)
                    r.push(this.parent.columns[i]);
                return(r);

            case "Table" /*CS2*/ :		// table -> columns
                return(this.columns);

            case "Group" :				// group -> textFrames
                return((this.pageItems.length>0) ? this.pageItems : null);

            case "Text" :				// selection is Text or InsertionPoint
            case "InsertionPoint" :		// -> run on container
                var textContainer = this.getTextContainer();
                return((textContainer) ? textContainer.asObjsToFit() : null);
            
            default:
                return(null);
            }
        }

        /*obj*/ Object.prototype.getTextContainer = function()
        //----------------------------------------------------------
        // Returns Text's or InsertionPoint's container :
        // Type returned: TextFrame or Cell - NULL if failure
        {
        try	{ // try...catch because of CS2 behaviour
            if (this.parent.constructor.name == "Cell")
                return(this.parent);
            if (this.parentTextFrames)	// plural in CS2
                return(this.parentTextFrames[0]);
            if (this.parentTextFrame)	// single in CS1
                return(this.parentTextFrame);
            return(null);
            }
        catch(ex) {return(null);}
        }

        /*int*/ Object.prototype.computeIncludedObjectsWidth = function()
        //----------------------------------------------------------
        // Parse embedded "objects": tables, pageitems [including graphics]
        // and returns the max width
        // !! All parsed objects have to provide a computeWidth method !!
        {
        var objsNames = new Array("pageItems","tables"); // could be extended
        var objsWidth = 0;
        var w = 0;

        for (var j=objsNames.length-1 ; j>=0 ; j--)
            {
            for (var i=this[objsNames[j]].length-1 ; i>=0 ; i--)
                {
                try
                    {w = this[objsNames[j]][i].computeWidth({VISIBLE:true});}
                catch(ex)
                    {w=0;}
                if (w > objsWidth) objsWidth=w;
                }
            }
        return(objsWidth);
        }

        /*int*/ Object.prototype.computeWidth = function(/*bool*/ VISIBLE)
        //----------------------------------------------------------
        // Generic computeWidth method for bounded objects
        // VISIBLE true -> external width
        // VISIBLE false -> internal width
        {
        if (VISIBLE)
            {
            if (this.visibleBounds)
                return(this.visibleBounds[3]-this.visibleBounds[1]);
            }
        else
            {
            if (this.geometricBounds)
                return(this.geometricBounds[3]-this.geometricBounds[1]);
            }
        return(0);
        }

        /*int*/ Table.prototype.computeWidth = function()
        //----------------------------------------------------------
        // Override Object::computeWidth for Table : returns simply the width
        {
        return(this.width);
        }

        /*arr*/ Object.prototype.createLinesSizesArray = function()
        //----------------------------------------------------------
        // Returns chars count for each LINE of this (-> array)
        // empty array  IF  this.lines==NULL  OR  this.lines.length==0
        {
        r = new Array();
        if (this.lines)
            for (var i=this.lines.length-1; i>=0 ; i--)
                r.unshift(this.lines[i].characters.length);
        return(r);
        }

        /*bool*/ Object.prototype.isoceleLines = function(/*arr*/ arrSizes)
        //----------------------------------------------------------
        // Compare chars count beetween THIS and arrSizes argument
        // (generic method just presuming that THIS have lines prop.)
        // -> TRUE if isoceles, FALSE if not
        {
        if (this.lines.length != arrSizes.length) return(false);
        for (var i=arrSizes.length-1 ; i>=0 ; i--)
            if (arrSizes[i] != this.lines[i].characters.length)
                return(false);
        return(true);
        }


        //----------------------------------------------------------
        //			TEXTFRAME METHODS
        // intanciate the part of the abstract process for TextFrames
        //----------------------------------------------------------


        /*bool*/ TextFrame.prototype.isEmpty = function()
        //----------------------------------------------------------
        {
        return(this.characters.length==0);
        }

        /*bool*/ TextFrame.prototype.isOverflowed = function()
        //----------------------------------------------------------
        {
        return(this.overflows);
        }

        /*int*/ TextFrame.prototype.getWidth = function()
        //----------------------------------------------------------
        {
        return(this.computeWidth({VISIBLE:false}));
        }

        /*void*/ TextFrame.prototype.resizeWidthBy = function(/*int*/ widthOffset)
        //----------------------------------------------------------
        // Redim the frame in width by widthOffset
        {
        this.geometricBounds = Array(
            this.geometricBounds[0],
            this.geometricBounds[1],
            this.geometricBounds[2],
            this.geometricBounds[3] + widthOffset);
        }

        /*int*/ TextFrame.prototype.computeMinWidth = function()
        //----------------------------------------------------------
        // Returns the minWidth of the frame according to embedded content
        // and inner space
        {
        // inner width space
        var inSpace = this.textFramePreferences.insetSpacing;
        var inWidth = (inSpace.length) ?
            inSpace[1] + inSpace[3] :	// distinct left & right inspace
            2*inSpace;					// global inspace

        return(this.computeIncludedObjectsWidth() + inWidth);
        }

        /*int*/ TextFrame.prototype.getCharsCount = function()
        //----------------------------------------------------------
        {
        return(this.characters.length);
        }

        /*int*/ TextFrame.prototype.getLinesCount = function()
        //----------------------------------------------------------
        {
        return(this.lines.length);
        }

        /*arr*/ TextFrame.prototype.getLinesSizes = function()
        //----------------------------------------------------------
        // Return chars count BY LINE (-> array)
        {
        return(this.createLinesSizesArray());
        }

        /*int*/ TextFrame.prototype.preserveCharsCount = function(/*int*/ charsCount)
        //----------------------------------------------------------
        // YES -> -1  , NOT -> 1
        {
        return( (this.characters.length != charsCount) ? 1 : -1 );
        }

        /*int*/ TextFrame.prototype.preserveLinesCount = function(/*int*/ linesCount)
        //----------------------------------------------------------
        // Indicates whether:
        // - chars count equals linesCount
        // - frame DOES NOT overflow
        // YES -> -1  , NOT -> 1
        {
        return( ((this.overflows) || (this.lines.length != linesCount)) ? 1 : -1 );
        }

        /*int*/ TextFrame.prototype.preserveLinesSizes = function(/*arr*/ linesSizes)
        //----------------------------------------------------------
        // Indicates whether:
        // each x line isoceles linesSizes[x]
        // YES -> -1  , NOT -> 1
        {
        return( (this.isoceleLines(linesSizes)) ? -1 : 1 );
        }


        //----------------------------------------------------------
        //			COLUMN METHODS
        // intanciate the part of the abstract process for Columns
        //----------------------------------------------------------


        /*bool*/ Column.prototype.isEmpty = function()
        //----------------------------------------------------------
        {
        for (var i=this.cells.length-1; i>=0 ; i--)
            if (this.cells[i].characters.length>0) return(false);
        return(true);
        }

        /*bool*/ Column.prototype.isOverflowed = function()
        //----------------------------------------------------------
        // Indicates whether AT LEAST a cell overflows
        // !! We can't trust Column::overflows !!
        {
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            if (this.cells[i].overflows) return(true);
        return(false);
        }

        /*int*/	Column.prototype.getWidth = function()
        //----------------------------------------------------------
        {
        return(this.width);
        }

        /*void*/ Column.prototype.resizeWidthBy = function(/*int*/ widthOffset)
        //----------------------------------------------------------
        // Redim the column width by widthOffset
        // !! we HAVE TO update the display after resizing !!
        {
        this.width += widthOffset;

        // updates the display
        if (APP_INT_VERSION > 3)
            // CS2+
            this.recompose();
        else
            {
            // CS -- thx to Tilo for this hack --
            for(var i = this.cells.length - 1 ; i >= 0 ; i-- )
                {
                // Comparing the cell contents against null
                // seems to internally recompose the cell!
                if (this.cells[i].contents == null) {}
                }
            }
        }

        /*int*/ Column.prototype.computeMinWidth = function()
        //----------------------------------------------------------
        // Returns the minWidth of the column according to embedded content
        // and inner space
        {
        var iCell = null;
        var w = 0;
        var r = 0;

        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            {
            iCell = this.cells[i];
            w = iCell.computeIncludedObjectsWidth() +
                iCell.leftInset + iCell.rightInset;
            if (w > r) r = w;
            }
        return(r);
        }

        /*arr*/ Column.prototype.getCharsCount = function()
        //----------------------------------------------------------
        // Returns SIGNED chars count BY CELL (negatif if overflows)
        {
        var r = new Array();
        var sgn = 0;
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            {
            sgn = (this.cells[i].overflows) ? -1 : 1;
            r.unshift(sgn * this.cells[i].characters.length);
            }
        return(r);
        }

        /*arr*/ Column.prototype.getLinesCount = function()
        //----------------------------------------------------------
        // Returns lines count BY CELL
        {
        var r = new Array();
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            r.unshift(this.cells[i].lines.length);
        return(r);
        }

        /*bi-arr*/ Column.prototype.getLinesSizes = function()
        //----------------------------------------------------------
        // Matrix: returns the chars count BY LINE / BY CELL
        {
        var r = new Array();
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
                r.unshift(this.cells[i].createLinesSizesArray());
        return(r);
        }

        /*int*/ Column.prototype.preserveCharsCount = function(/*arr*/ charsCount)
        //----------------------------------------------------------
        // Indicates whether:
        // overflow sign BY CELL x equals sgn(charsCount[x])
        // YES -> -1  , NO -> 1
        {
        var sgn = 0;
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            {
            sgn = (this.cells[i].overflows) ? -1 : 1;
            if (sgn * charsCount[i] < 0) return(1);
            }
        return(-1);
        }

        /*int*/ Column.prototype.preserveLinesCount = function(/*arr*/ linesCount)
        //----------------------------------------------------------
        // Indicates whether:
        // - lines count BY CELL x equals linesCount[x]
        // - no cell overflows
        // YES -> -1  , NO -> 1
        {
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            {
            if (this.cells[i].overflows) return(1);
            if (this.cells[i].lines.length != linesCount[i]) return(1);
            }
        return(-1);
        }

        /*int*/ Column.prototype.preserveLinesSizes = function(/*bi-arr*/ linesSizes)
        //----------------------------------------------------------
        // Indicates whether:
        // - in each CELL x, each LIGNE y isoceles linesSizes[x][y]
        // (if a cell overflows, returns 1)
        // YES -> -1  , NO -> 1
        {
        for (var i=this.cells.length-1 ; i>= 0 ; i--)
            {
            if (this.cells[i].overflows) return(1);
            if (this.cells[i].isoceleLines(linesSizes[i]) == false) return(1);
            }
        return(-1);
        }


        //----------------------------------------------------------
        //			METHODES CENTRALES
        //----------------------------------------------------------


        /*void*/ Object.prototype.manageFit = function(/*bool*/ FLUIDFITTING)
        //----------------------------------------------------------
        {
        // !! [CS2 only] Prevents a strange crash on wide table columns selection !!
        // !! Thx to Tilo for this hack --
        if (APP_INT_VERSION>=4)
            {
            $.gc();
            }
                

        // NOP if empty object
        if (this.isEmpty()) return;

        // min width to preserve
        var minWidth = this.computeMinWidth();

        // let's go!
        this.processFit(FLUIDFITTING, minWidth);
        }


        /*void*/ Object.prototype.processFit = function(/*bool*/ FLUIDFITTING, /*int*/ minWidth)
        //----------------------------------------------------------
        // Fits this object
        // if FLUIDFITTING -> fluid fitting, else: strict fitting
        // minWidth sets the threshold
        {
        if (FLUIDFITTING)
            { // FLUID FITTING
            if (this.isOverflowed())
                { // NB : overflowed CELLS are "transparent"
                    
                var charsCount = this.getCharsCount();
                var evalFlag = function(thisObj)
                    {return(thisObj.preserveCharsCount(charsCount));}
                }
            else
                {
                var linesCount = this.getLinesCount();
                evalFlag = function(thisObj)
                    {return(thisObj.preserveLinesCount(linesCount));}
                }
            }
        else
            { // STRICT FITTING
              // NB : overflowed columns are "intouchable"
            
            if ((this.constructor.name=="Column") && (this.isOverflowed()))
                return;

            var linesSizes = this.getLinesSizes();
            var evalFlag = function(thisObj)
                {return(thisObj.preserveLinesSizes(linesSizes));}
            }

        // DICHOTOMIC LOOP

        var sgnFLAG = -1;
        var w = ( this.getWidth() - minWidth ) / 2;

        while (w >= PRECISION)
            {
            // resize width by +/- w
            this.resizeWidthBy(sgnFLAG*w);
            
            // +1 = increase | -1 = reduce
            sgnFLAG = evalFlag(this);
            
            // divide
            w = w/2;
            }

        // exit with sgnFLAG==+1 -> undo last reduction -> +2w
        if (sgnFLAG>0) this.resizeWidthBy(2*w);
        }




        //----------------------------------------------------------
        // MAIN PROGRAM
        //----------------------------------------------------------

        if ( app.documents.length > 0 )
            {
            if ( app.activeWindow.selection.length > 0 )
                {
                try	{
                    var thisDoc = app.activeDocument;
                    var FLUIDFLAG = thisDoc.withinDelay();
                    
                    var memUnits = thisDoc.getUnits();
                    thisDoc.setUnitsTo([MeasurementUnits.POINTS, MeasurementUnits.POINTS]);
                    
                    var selObjs = app.activeWindow.selection;
                    var objsToFit = null;
                    for (var i=selObjs.length-1 ; i>=0 ; i--)
                        {
                        objsToFit = selObjs[i].asObjsToFit();
                        if (objsToFit)
                            {
                            for (var j=objsToFit.length-1 ; j>=0 ; j--)
                                objsToFit[j].manageFit(FLUIDFLAG);
                            }
                        }
                    
                    thisDoc.setUnitsTo(memUnits);
                    thisDoc.storeTimeStamp();
                    }
                catch(ex)
                    {
                    thisDoc.setUnitsTo(memUnits);
                    exitMessage(ex);
                    }
                }
                
            else
                //alert("No object selected!");
            }
        else
            //alert("No document opened!");    
    }
//==============Table magic fit function ends=========
//=========Adding author query-starts===================
function placeQueries(newFile,queryTblFrm){  
            var xmlDocDOM = newFile.xmlElements[0];
            var authorQueryTable = xmlDocDOM.evaluateXPathExpression("//div[@id='queryDivNode']//Table");
            var authorQueryTableDiv = xmlDocDOM.evaluateXPathExpression("//div[@id='queryDivNode']");
            var authorQueryTableLen = authorQueryTable.length;
            if (authorQueryTableLen == 1){
                displayMSG("Placing queries ...")
                var inTextQueryCitation = xmlDocDOM.evaluateXPathExpression ("//query");
                var inTextQueryCitationLen = inTextQueryCitation.length;
                var queryTblTempRowIntt = 1;
                var tempQueryIDarray = new Array();
                var tempCt = 0;
                try {
                    for (var q = inTextQueryCitationLen -1; q >= 0; q--){
                    var queryFlag = true;
                       var currQuery = inTextQueryCitation[q];
                        var currQueryID = parseInt(currQuery.xmlAttributes.itemByName("id").value);
                        tempQueryIDarray[tempCt] = [currQueryID];
                        //var para = currQuery.paragraphs[0].lines[0].select();
                        var hz = app.selection[0].insertionPoints[0].baseline;    
                        var pageName = currQuery.characters[0].parentTextFrames[0].parentPage.name;
                            app.layoutWindows[0].activePage = currQuery.paragraphs[0].parentTextFrames[0].parentPage;
                            app.layoutWindows[0].zoom(ZoomOptions.FIT_PAGE);    
                        var txtFrmSel = currQuery.paragraphs[0].parentTextFrames[0].select();
                        var txtFrmBound = currQuery.paragraphs[0].parentTextFrames[0].geometricBounds;
                        app.activeDocument.recompose();
                        var tempQueryIDarrayLen = tempQueryIDarray.length;
                        for (var qf = 0; qf < tempQueryIDarrayLen - 1; qf ++){//checking whether the query is already flagged
                            if (currQueryID == tempQueryIDarray[qf]){
                                queryFlag = false;
                                break;
                                }//end of if
                            }//end of for
                        if (queryFlag){// if 'queryFlag' is true then only query will be placed                       
                            if (parseInt(pageName)%2 == 0){//verso pages
                                var myAssetItem = newFile.pages.itemByName(pageName).textFrames.add({geometricBounds: geoBoundsVerso});
                                myAssetItem.appliedObjectStyle = newFile.objectStyles.itemByName("AU");
                                var myAssetItemBounds = myAssetItem.geometricBounds;
                                myAssetItem.geometricBounds = [myAssetItemBounds[0], myAssetItemBounds[1], myAssetItemBounds[2], myAssetItemBounds[1]+37.2];
                                }
                            else{//recto pages
                                var myAssetItem = newFile.pages.itemByName(pageName).textFrames.add({geometricBounds: geoBoundsRecto});
                                myAssetItem.appliedObjectStyle = newFile.objectStyles.itemByName("AU");
                                var myAssetItemBounds = myAssetItem.geometricBounds;
                                myAssetItem.geometricBounds = [myAssetItemBounds[0], myAssetItemBounds[1], myAssetItemBounds[2], myAssetItemBounds[1]+37.2];
                                }
                                var currQueryInsrPtPsn = currQuery.characters[0].insertionPoints[0].horizontalOffset;
                                var currQueryFrmClmCt = currQuery.characters[0].insertionPoints[0].parentTextFrames[0].textFramePreferences.textColumnCount;
                                if (currQueryFrmClmCt > 1){//for double column - AU object style need to be modified to place inside/outside margins
                                    var currQueryFrmFxdWd = currQuery.characters[0].insertionPoints[0].parentTextFrames[0].textFramePreferences.textColumnFixedWidth;
                                    var currQueryFrmLeftPosition = currQuery.characters[0].insertionPoints[0].parentTextFrames[0].geometricBounds[1];
                                    var currQueryFrmGutterWd = currQuery.characters[0].insertionPoints[0].parentTextFrames[0].textFramePreferences.textColumnGutter;
                                    var maxLimit = currQueryFrmLeftPosition + currQueryFrmFxdWd + currQueryFrmGutterWd;
                                    if (parseInt(pageName)%2 == 0){//verso pages
                                        if (currQueryInsrPtPsn >= parseInt(maxLimit)){
                                            myAssetItem.appliedObjectStyle = newFile.objectStyles.itemByName("AU_2");                                   
                                            }
                                        }
                                    else {
                                        if (currQueryInsrPtPsn < parseInt(maxLimit)){
                                            myAssetItem.appliedObjectStyle = newFile.objectStyles.itemByName("AU_2");                                   
                                            }                                    
                                        }    
                                    }
                                myAssetItem.contents = authorQueryTable[0].tables[0].rows[currQueryID].cells[2].paragraphs[0].contents;
                                newFile.recompose();
                                try {
                                var queryLastLineBase = myAssetItem.paragraphs.lastItem().lines.lastItem().baseline; } catch (e){displayMSG("Placing queries - failed for query no: " + currQueryID); }
                                var myAssetItemCurrBounds = myAssetItem.geometricBounds;
                               // myAssetItem.geometricBounds = [myAssetItemCurrBounds[0], myAssetItemCurrBounds[1], parseInt(queryLastLineBase) + myAssetItem.textFramePreferences.insetSpacing[1] + 1, myAssetItemCurrBounds[3]]
                                myAssetItem.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
                                var queryFrm = myAssetItem.select();
                                app.cut();
                                currQuery.characters[0].insertionPoints[0].select();
                                app.paste();
                            }
                        tempCt++;
                        }//end of for
                    } catch (e) {displayMSG("Placing queries -  - failed for query no: " + currQueryID);}
                authorQueryTable[0].tables[0].remove();
                queryTblFrm.remove();
                myResetFindChangePref()
                app.findGrepPreferences.findWhat = ".+\\r";
                app.findGrepPreferences.appliedParagraphStyle = 'QUERY_TABLE';
                myDoc.changeGrep();                
            }
        }
//=========Adding author query-ends===================

//==============Cleanup function starts=========
function cleanUp(){
    var myDoc = app.activeDocument;
    var styleName;
    addSpaceBeforeHeadLabel('H1_TTL')
    addSpaceBeforeHeadLabel('H1')
    addSpaceBeforeHeadLabel('H2')
    addSpaceBeforeHeadLabel('H2_H1')
    addSpaceBeforeHeadLabel('H3')
    addSpaceBeforeHeadLabel('H3_H2')
    addSpaceBeforeHeadLabel('H4')
    removePeriodBeforeRefText('REF')
    removePeriodBeforeRefText('REF-B')
    removePeriodBeforeRefText('REF-B2')
    removePeriodBeforeRefText('REF-B3')
    removePeriodBeforeRefText('REF-T')
    removePeriodBeforeRefText('REF-T2')
    removePeriodBeforeRefText('REF-T3')
    removePeriodBeforeRefText('REF2-0')
    removePeriodBeforeRefText('REF2-1')
    removePeriodBeforeRefText('REF3-0')
    removePeriodBeforeRefText('REF3-1')
    removePeriodBeforeRefText('REF3-2')
    removeEmptySpaceRefText('REF')
    removeEmptySpaceRefText('REF-B')
    removeEmptySpaceRefText('REF-B2')
    removeEmptySpaceRefText('REF-B3')
    removeEmptySpaceRefText('REF-T')
    removeEmptySpaceRefText('REF-T2')
    removeEmptySpaceRefText('REF-T3')
    removeEmptySpaceRefText('REF2-0')
    removeEmptySpaceRefText('REF2-1')
    removeEmptySpaceRefText('REF3-0')
    removeEmptySpaceRefText('REF3-1')
    removeEmptySpaceRefText('REF3-2')
    function addSpaceBeforeHeadLabel(styleName){
        if (app.activeDocument.paragraphStyles.itemByName(styleName).isValid){
        myResetFindChangePref()
        app.findGrepPreferences.findWhat = "^([\\d+\\.]+)(\\s)";
        app.findGrepPreferences.appliedParagraphStyle = styleName;
        app.changeGrepPreferences.changeTo = "$1~m~i";
        myDoc.changeGrep();
        }
    }

    function removePeriodBeforeRefText(styleName){
        if (app.activeDocument.paragraphStyles.itemByName(styleName).isValid){
        myResetFindChangePref()
        app.findGrepPreferences.findWhat = "^\\d+\\s*";
        app.findGrepPreferences.appliedParagraphStyle = styleName;
        app.changeGrepPreferences.changeTo = "";
        myDoc.changeGrep();
        }
    }

    function removeEmptySpaceRefText(styleName){
        if (app.activeDocument.paragraphStyles.itemByName(styleName).isValid){
        myResetFindChangePref()
        app.findGrepPreferences.findWhat = "^\\s*";
        app.findGrepPreferences.appliedParagraphStyle = styleName;
        app.changeGrepPreferences.changeTo = "";
        myDoc.changeGrep();
        }
    }


    function myResetFindChangePref(){
        app.findTextPreferences = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;
        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
    }    
}
//==============Cleanup function ends=========
function forceAdjustWordSpace(styleList,newFilexmlDOM){
    //Reduce word spacing
    var wordSpacedParas = newFilexmlDOM.evaluateXPathExpression(styleList);
    var wordSpacedParasLen = wordSpacedParas.length;
    for (var x = 0; x < wordSpacedParasLen; x++){
        var trackValue = wordSpacedParas[x].xmlAttributes.itemByName("data-word-spacing").value;
        trackValue = trackValue.replace('w', '');
        if (!(trackValue == '')){            
            if (parseFloat(trackValue) > 0.33){
                var diff = (parseFloat(trackValue) - 0.33) * 100;
                trackValue = diff * 1.5;
                try{
                    wordSpacedParas[x].paragraphs[0].tracking = trackValue;} catch(e){
                    //displayMSG("Track value not applied for the paragraphs: " + wordSpacedParas[x].paragraphs[0].contents + "\r");
                    }
                }
            else {
                var diff = (parseFloat(trackValue) - 0.33) * 100;
                trackValue = diff * 1.5;
                try{
                wordSpacedParas[x].paragraphs[0].tracking = trackValue;} catch(e){
                    //displayMSG("Track value not applied for the paragraphs: " + wordSpacedParas[x].paragraphs[0].contents + "\r");
                    }
                }
        }
        }
    }
    //
function changeAlignment(styleList,newFilexmlDOM){    
    //Changing paragraphs above space
    var alignParas = myDoc.xmlElements[0].evaluateXPathExpression(styleList);
    var alignParasLen = alignParas.length;
    for (var x = 0; x < alignParasLen; x++){
        var currAlignPara = alignParas[x].xmlAttributes.itemByName("align").value;
        if (currAlignPara == 'center'){
                try{
                alignParas[x].paragraphs[0].justification = Justification.CENTER_ALIGN;} catch (e){}
                }
        else if (currAlignPara == 'right'){
                try{
                alignParas[x].paragraphs[0].justification = Justification.RIGHT_ALIGN;} catch (e){}
                }
            }
    }
//applying table border style
function applyTableBorderStyle(styleList, newFilexmlDOM){    
    //Changing paragraphs above space
    var borderCells = currDoc.xmlElements[0].evaluateXPathExpression(styleList);
    var borderCellsLen = borderCells.length;
    for (var x = borderCellsLen - 1; x >= 0; x--){
//        var currCell = borderCells[x].cells.lastItem();
        var currCell = borderCells[x].cells.lastItem();
        var currCellRowSpan = currCell.rowSpan;
        var currCellStyle = borderCells[x].xmlAttributes.itemByName("borderStyle").value;
        if ((/_DB/).test(currCellStyle)){
            if (currCellRowSpan > 1){
                currCell.select();
                var unMergeCell = borderCells[x].cells.lastItem().unmerge();
                var selectCells = app.selection[0];
                var myStartCell = selectCells.cells.firstItem(); // cell in the 1st column and 1st row
                var myEndCell = selectCells.cells.lastItem();  // cell in the 1st column and 4th row
                selectCells.cells.lastItem().bottomEdgeStrokeType = 'Dashed (4 and 4)';
                selectCells.cells.lastItem().bottomEdgeStrokeWeight = 0.5;        
                myStartCell.merge(myEndCell);                        
                }
            else {
                currCell.bottomEdgeStrokeType = 'Dashed (4 and 4)';
                currCell.bottomEdgeStrokeWeight = 0.5;                
                }
            }
        else if ((/_NB/).test(currCellStyle)){
                    if (currCellRowSpan > 1){
                        currCell.select();
                        var unMergeCell = borderCells[x].cells.lastItem().unmerge();
                        var selectCells = app.selection[0];
                        var myStartCell = selectCells.cells.firstItem(); // cell in the 1st column and 1st row
                        var myEndCell = selectCells.cells.lastItem();  // cell in the 1st column and 4th row
                        selectCells.cells.lastItem().bottomEdgeStrokeWeight = 0;        
                        myStartCell.merge(myEndCell);                                                
                    }
                else {
                            currCell.bottomEdgeStrokeWeight = 0;
                            }
            }
        }
    }
function forceAdjustAboveSpace(styleName){    
    //Changing paragraphs above space
    var spaceAboveParas = myDoc.xmlElements[0].evaluateXPathExpression(styleName);
    var spaceAboveParasLen = spaceAboveParas.length;
    for (var x = 0; x < spaceAboveParasLen; x++){
        var spaceForHeads = spaceAboveParas[x].xmlAttributes.itemByName("data-top-gap").value;
        spaceForHeads = spaceForHeads.replace('pt', '');
        if (!(spaceForHeads == '')){
                try{
                spaceAboveParas[x].paragraphs[0].spaceBefore = spaceAboveParas[x].paragraphs[0].spaceBefore + parseFloat (spaceForHeads);} catch (e){}
                }
            }
    }
function forceAdjustBelowSpace(styleList,newFilexmlDOM){    
    //Changing paragraphs above space
    var spaceAboveParas = myDoc.xmlElements[0].evaluateXPathExpression(styleList);
    var spaceAboveParasLen = spaceAboveParas.length;
    for (var x = 0; x < spaceAboveParasLen; x++){
        var spaceForHeads = spaceAboveParas[x].xmlAttributes.itemByName("data-bottom-gap").value;
        spaceForHeads = spaceForHeads.replace('pt', '');
        if (!(spaceForHeads == '')){
                try{
                spaceAboveParas[x].paragraphs[0].spaceAfter = spaceAboveParas[x].paragraphs[0].spaceAfter + parseFloat (spaceForHeads);} catch (e){}
                }
            }
    }
    //
//============================End export page count details xml======================================
function exportPageCountDetails(layerTemplateScript){
    var myDoc = app.activeDocument;
    var rootNode = myDoc.xmlElements[0];
    var docNode = rootNode.evaluateXPathExpression("//div[@class='front']");
    var idValue = docNode[0].xmlAttributes.itemByName("cmsID").value;
    if (idValue != ''){
        var apiPostExePath = layerTemplateScript+ "\\" + "apiPost.exe";
        var firstPageName = myDoc.pages.firstItem().name;
        var lastPageName = myDoc.pages.lastItem().name;
        var totalDocPagesLen = myDoc.pages.length;
        var lastPage = myDoc.pages.lastItem();
        var lastPageHt = lastPage.bounds[2] - (lastPage.bounds[0]);
        var lastPageMarginPref = lastPage.marginPreferences;
        var lastPageTypeAreaHt = lastPageHt - (lastPageMarginPref.top + lastPageMarginPref.bottom);
        var splitTypeAreaHtInPartsOfTen = lastPageTypeAreaHt/10;
        //checking whether the last page items is avbl, if so the item with highest btm bound will be considered as the last item for the page
        var lastPageItems = lastPage.pageItems;
        var lastPageItemsLen = lastPageItems.length;
        var btmBndAry = []; 
        if (lastPageItemsLen > 0){
            for (var pi = 0; pi < lastPageItemsLen; pi ++){
                var currPgItm = lastPageItems[pi];
                btmBndAry[pi] = currPgItm.geometricBounds[2];
                }//end of FOR 
            btmBndAry.sort(function(a, b){return b-a});
            var maxBtmBnd = btmBndAry[0];
            }//end of IF
        else {//if the page doesn't has any page items then the max btm bnd would be btm margin of the page
            maxBtmBnd = lastPageMarginPref.top + lastPageTypeAreaHt;
            }//end of IF
        var spaceLeftBlank = lastPageMarginPref.top + lastPageTypeAreaHt - (maxBtmBnd);
        var spaceAccomadated = lastPageTypeAreaHt - spaceLeftBlank;
        var finalParts = (spaceAccomadated/splitTypeAreaHtInPartsOfTen);
        finalParts = Math.ceil(finalParts)/10;
        totalPages = (totalDocPagesLen - 1) + finalParts;
        var exportFileName = myDoc.name;
        var myFilePath=myDoc.filePath.fsName.toString();
        var apiPostKriyaURL = myDoc.textVariables.item("apiPostURL").variableOptions.contents
        exportFileName = exportFileName.replace(".indd", ".bat");
        var batchFilePageDetails = File(myDoc.filePath.fsName+ "\\" + "pageDetails"+ exportFileName);
        var batchFilePageCountDetails = File(myDoc.filePath.fsName+ "\\" + "pageCountDetails"+ exportFileName);
        var pageDetails = "<content><id>"+idValue+"</id><node><data><div class='front'><article-meta><fpage>"+firstPageName+"</fpage><lpage>"+lastPageName+"</lpage></article-meta></div></data></node></content>"
        firstPostValue = apiPostExePath +" \"" +apiPostKriyaURL+"job.api/updateMetaDataTest?apiKey=6c8e740baa82f222c5e63b39ffac2613&accountKey=1\" \""+  pageDetails + "\"";
//~         var pageCountDetails = "<workflow><article><id>"+idValue+"</id><attributes><page-count>"+totalPages+"</page-count></attributes></article></workflow>"
        var pageCountDetails = "<workflow><article><id>"+idValue+"</id><attributes><pagenumber>"+totalPages+"</pagenumber></attributes></article></workflow>"
        secondPostValue = apiPostExePath +" \"" +apiPostKriyaURL+"job.api/setStatus?apiKey=6c8e740baa82f222c5e63b39ffac2613&accountKey=1\" \""+  pageCountDetails + "\"";
        batchFilePageDetails.open('w');
        batchFilePageDetails.write(firstPostValue);
        batchFilePageDetails.close();
        batchFilePageDetails.execute();
        batchFilePageCountDetails.open('w');
        batchFilePageCountDetails.write(secondPostValue);
        batchFilePageCountDetails.close();
        batchFilePageCountDetails.execute();        
        }//end of IF
}
//============================End export TOC xml======================================
function applyMasterPage(styleName, masterName){
    myResetFindChangePref();
    app.findGrepPreferences.appliedParagraphStyle = styleName;
    var currFind = myDoc.findGrep();
    var currFindLen = currFind.length;
    if (currFindLen !=0){
        for (var mp = 0; mp < currFindLen; mp ++){
            currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.appliedMaster = app.activeDocument.masterSpreads.item(masterName);//applying master
            //Linking to the master page text frame
            var currPg = currFind[mp].paragraphs[0].parentTextFrames[0].parentPage;
            var nextPage = app.activeDocument.pages.itemByName(String(parseInt(currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.name) + 1));
            if (nextPage.isValid){
                var nextPageFrm = nextPage.textFrames[0];                
                }
            else {
                var nextPageFrm = false;                
                }
            try{
            var prevPage = app.activeDocument.pages.itemByName(String(parseInt(currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.name) - 1));
            var prevPageFrm = prevPage.textFrames[0];    
            }catch (e){}
            var currPageName = parseInt(currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.name);
                if ((currPageName%2) == 0){
                    var masterPgFrm = currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.appliedMaster.pages[0].pageItems.itemByName(masterName);
                }
                else{
                    var masterPgFrm = currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.appliedMaster.pages[1].pageItems.itemByName(masterName);            
                    }
                currFind[mp].paragraphs[0].parentTextFrames[0].parentPage.pageItems.everyItem().remove();
                masterPgFrm.override(currPg);
        //~         var currXMLBlock = xmlDOM.evaluateXPathExpression("//"+blockName);
        //~         currPg.textFrames.itemByName(masterName).placeXML(currXMLBlock[0])
                if (nextPageFrm.isValid){
                    if (!(currPageName == 1)){
                        prevPageFrm.nextTextFrame = NothingEnum.NOTHING;
                        prevPageFrm.nextTextFrame = currPg.textFrames[0].startTextFrame;
                        currPg.textFrames[0].nextTextFrame = nextPageFrm.startTextFrame;
                        ResolveOverset(app.activeDocument);
                        }
                    else {
                        nextPageFrm.previousTextFrame = currPg.textFrames[0].endTextFrame;
                        ResolveOverset(app.activeDocument);
                        }
                    }
                else if (nextPageFrm == false){
                    prevPageFrm.nextTextFrame = currPg.textFrames[0].endTextFrame;    
                    ResolveOverset(app.activeDocument);
                    }
                }
    }
}

//====================Placing inline libraries start=============================
function placeInlineLibs(){
    //displayMSG("Placing libraries - starts");
 try {   
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
            var libFile = app.open(libFilePath);
            var libVarInserts = myDoc.textVariables.item("LIB_INSERTS");
            var libVarInsertsConts = libVarInserts.variableOptions.contents;//library name
            libVarInsertsConts = libVarInsertsConts.split('|');
            var libVarInsertsContsLen = libVarInsertsConts.length;
            for (var li = 0; li < libVarInsertsContsLen; li ++){
                var currLibInsert = libVarInsertsConts[li].split(',');
                var currAssestName = currLibInsert[0];
                var currPstyle = currLibInsert[1];
                insertingLibs(libFile, currAssestName, currPstyle);
                }//end of for
            }//end of if
        }//end of if 
        var allLib = app.libraries;
        var allLibLen = allLib.length;
        for (var lb = allLibLen - 1; lb >= 0; lb --){
            var closeLib = allLib[lb].close();//closing all opened libraries
            }//end of for
    } catch(e){    
        //displayMSG("Placing libraries - failed"); app.activeDocument.close(SaveOptions.YES); exit();
        }    
    //displayMSG("Placing libraries - ends");
}
function insertingLibs(libFile, currAssestName, currPstyle){
        myResetFindChangePref();
        app.findTextPreferences.appliedParagraphStyle = currPstyle;
        var currFind = myDoc.findText();
        var currFindLen = currFind.length;
        for (var l = currFindLen - 1; l >= 0; l--){
            var currParaInserPt = currFind[l].paragraphs[0].insertionPoints[0];
            libFile.assets.item(currAssestName).placeAsset(currParaInserPt);//inserting library in text 
            }    
    } 
//====================Placing inline libraries end============================
//====================Handling multiline head level style start======================
function multiLinePstyle(myDoc){
    //displayMSG("Applying multiline styles (for head levels with rule/Bg color etc.,) - starts");
try{    
    var styListVar = myDoc.textVariables.item("MULTI_LINE_PSTYLE").variableOptions.contents;
    var styList = styListVar.split('|');
    var styListLen = styList.length;
    for (var st = 0; st < styListLen; st ++){
        if(myDoc.paragraphStyles.itemByName(styList[st]).isValid){
            myResetFindChangePref();
            app.findGrepPreferences.appliedParagraphStyle = styList[st];
            var myParaStyle = myDoc.findGrep();
            var myParaStyleLen = myParaStyle.length;
            myResetFindChangePref(); 
                for(var p = 0; p <= myParaStyleLen - 1; p ++){
                var currentPara = myParaStyle[p];
                var paraLinesLen = currentPara.lines.length;
                if (parseInt (paraLinesLen) > 1 && (myDoc.paragraphStyles.itemByName(styList[st] + "_" + paraLinesLen + "_lines")).isValid){
                    currentPara.appliedParagraphStyle = myDoc.paragraphStyles.itemByName(styList[st] + "_" + paraLinesLen + "_lines")
                    }//end of if
                }//end of for         
            }//end of if
        }//end of for
    } catch(e) {    
        //displayMSG("Applying multiline styles - failed" + e); app.activeDocument.close(SaveOptions.YES);exit();
        }
    //displayMSG("Applying multiline styles (for head levels with rule/Bg color etc.,) - ends");
}
//====================Handling multiline head level style start======================
//================= query overlap==================
function fixQueryOverlap(){
    var myDoc = app.activeDocument;
    var myDocPages = myDoc.pages; 
    var myDocPagesLen = myDocPages.length;
    var ancrPgHt;
    var ancrPgWd;
    var ancrPgInMrgn;
    var ancrPgOutMrgn;
    var pagePattern;
    for (var p = 0; p < myDocPagesLen; p ++){
        var ancrPg = myDocPages[p];
        var pageName = parseInt(ancrPg.name);
        var ancrPgBounds = ancrPg.bounds;
        ancrPgHt = ancrPgBounds[2] - ancrPgBounds[0];
        ancrPgWd = ancrPgBounds[3] - ancrPgBounds[1];
        ancrPgInMrgn = ancrPg.marginPreferences.left;
        ancrPgOutMrgn = ancrPg.marginPreferences.right; 
        var ancrPgTxtFrms = ancrPg.allPageItems;
        var ancrPgTxtFrmsLen = ancrPgTxtFrms.length;
        moveOverlapQueries(ancrPgWd,ancrPgWd);
        }//end of for
    function moveOverlapQueries(ancrPgWd,ancrPgWd){
        if (pageName == 1){//for recto pages
            //recto page outside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try{
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'FRO';
                            if (!(currAncrBounds[1] < (ancrPgWd - ancrPgOutMrgn))){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
            //recto page inside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try {
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'FRI';                            
                            if ((currAncrBounds[1] < (ancrPgInMrgn))){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
        }
        else if (pageName%2 == 1){//for recto pages
            //recto page outside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try {
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'RO';
                            if (!(currAncrBounds[1] < ((2*ancrPgWd) - ancrPgOutMrgn))){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
            //recto page inside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try {
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'RI';                            
                            if ((currAncrBounds[1] < (ancrPgWd + ancrPgInMrgn))){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
        }
        else {
            //verso page outside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try {
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'VO';                            
                            if (currAncrBounds[1] < (ancrPgOutMrgn)){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
            //verso page inside margins
            var tempArray = new Array ();
            var tempCt = 0;
            for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                    var currAncr = ancrPgTxtFrms[af];
                    if (currAncr.parent instanceof Character){
                        try{
                            var currAncrBounds = currAncr.geometricBounds;
                            var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                            pagePattern = 'VI';                                                        
                            if ((currAncrBounds[1] > (ancrPgWd - ancrPgInMrgn)) && (currAncrBounds[1] < (ancrPgWd))){
                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                currAncr.name = String(currAncr.id);
                                tempCt ++;
                            }//end of if
                        } catch (e){}
                    }//end of if
                }//end of for
            queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern);
            app.activeDocument.recompose();
        }//end else
    function queryMoverTopToBottom(tempArray,ancrPgWd,pagePattern){
            tempArray.sort(function(a, b){return b-a});
            tempArray = tempArray.sort(function(a,b) {
             return a[1] > b[1];
             });
            var tempArrayLen = tempArray.length;
            var queryOverLaps = true;
            try{
                while(queryOverLaps){
                    queryOverLaps = false;
                    for (var arr = 0; arr < tempArrayLen; arr ++){ 
                        app.activeDocument.recompose();
                        var itrtFm = tempArray[arr];
                        var ancrFrm = myDoc.textFrames.itemByID(itrtFm[0]);
                        var ancrFrmBounds = ancrFrm.geometricBounds;
                        var ancrFrmTopPosition = ancrFrmBounds[0];
                        var ancrFrmBottomPosition = ancrFrmBounds[2];
                        var ancrFrmHt = ancrFrmBounds[2] - ancrFrmBounds[0];
                        for (var b = 0; b < tempArrayLen; b ++){
                            var citdArray = tempArray[b];
                            var testFrm = myDoc.textFrames.itemByID(citdArray[0]);
                            var testFrmBounds = testFrm.geometricBounds;
                            var testFrmTopPosition = testFrmBounds[0];
                            var testFrmBottomPosition = testFrmBounds[2];
                            if((ancrFrmTopPosition < testFrmBottomPosition) && !(testFrmTopPosition > ancrFrmTopPosition) && !(itrtFm[0] == citdArray[0])){
                                var newTopPosition = testFrmBottomPosition - ancrFrmTopPosition;
                                var oldOffset = ancrFrm.anchoredObjectSettings.anchorYoffset;
                                ancrFrm.anchoredObjectSettings.anchorYoffset = ancrFrm.anchoredObjectSettings.anchorYoffset + newTopPosition + 2;
                                b = tempArrayLen;
                                queryOverLaps = true;
                                app.activeDocument.recompose();
                                var ancrFrmBounds = ancrFrm.geometricBounds;
                                var ancrFrmTopPosition = ancrFrmBounds[0];
                                var ancrFrmBottomPosition = ancrFrmBounds[2];
                                if (ancrFrmBottomPosition > ancrPgHt) {
                                    //ancrFrm.anchoredObjectSettings.anchorYoffset = oldOffset;

                                    var tempArray = new Array ();
                                    var tempCt = 0;
                                    for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                                            var currAncr = ancrPgTxtFrms[af];
                                            if (currAncr.parent instanceof Character){
                                                try {
                                                    var currAncrBounds = currAncr.geometricBounds;
                                                    var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                                                    if (pagePattern == 'FRO'){
                                                            if (!(currAncrBounds[1] < (ancrPgWd - ancrPgOutMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if                                                        
                                                        }
                                                    else if (pagePattern == 'FRI'){
                                                            if ((currAncrBounds[1] < (ancrPgInMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if                                                         
                                                        }
                                                    else if (pagePattern == 'RO'){
                                                            if (!(currAncrBounds[1] < ((2*ancrPgWd) - ancrPgOutMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }
                                                    else if (pagePattern == 'RI'){
                                                            if ((currAncrBounds[1] < (ancrPgWd + ancrPgInMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }                                                    
                                                    else if (pagePattern == 'VO'){
                                                            if (currAncrBounds[1] < (ancrPgOutMrgn)){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }                                                    
                                                    else if (pagePattern == 'VI'){
                                                            if ((currAncrBounds[1] > (ancrPgWd - ancrPgInMrgn)) && (currAncrBounds[1] < (ancrPgWd))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }                                                    
                                                    
                                                } catch (e){}
                                            }//end of if
                                        }//end of for

                                    queryMoverBottomToTop(tempArray);
                                    queryOverLaps = false;
                                    arr = tempArrayLen;
                                    break;
                                    }
                                //checking bottom position 
                                }//end of if
                            else if (ancrFrmBottomPosition > ancrPgHt){
                                    var tempArray = new Array ();
                                    var tempCt = 0;
                                    for (var af = 0; af < ancrPgTxtFrmsLen; af ++){
                                            var currAncr = ancrPgTxtFrms[af];
                                            if (currAncr.parent instanceof Character){
                                                try {
                                                    var currAncrBounds = currAncr.geometricBounds;
                                                    var currAncrHt = currAncrBounds[2] - currAncrBounds[0];
                                                    
                                                    if (pagePattern == 'FRO'){
                                                            if (!(currAncrBounds[1] < (ancrPgWd - ancrPgOutMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if                                                        
                                                        }
                                                    else if (pagePattern == 'FRI'){
                                                            if ((currAncrBounds[1] < (ancrPgInMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if                                                         
                                                        }
                                                    else if (pagePattern == 'RO'){
                                                            if (!(currAncrBounds[1] < ((2*ancrPgWd) - ancrPgOutMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }
                                                    else if (pagePattern == 'RI'){
                                                            if ((currAncrBounds[1] < (ancrPgWd + ancrPgInMrgn))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }                                                    
                                                    else if (pagePattern == 'VO'){
                                                            if (currAncrBounds[1] < (ancrPgOutMrgn)){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }                                                    
                                                    else if (pagePattern == 'VI'){
                                                            if ((currAncrBounds[1] > (ancrPgWd - ancrPgInMrgn)) && (currAncrBounds[1] < (ancrPgWd))){
                                                                tempArray[tempCt] = [currAncr.id,currAncrBounds[0],currAncrBounds[2]];
                                                                currAncr.name = String(currAncr.id);
                                                                tempCt ++;
                                                            }//end of if
                                                        }  

                                                } catch (e){}
                                            }//end of if
                                        }//end of for
                                    queryMoverBottomToTop(tempArray);
                                    queryOverLaps = false;
                                    arr = tempArrayLen;
                                    break;
                                }//end of else if
                            }//end of for
                        }//end of for
                    }//end of while
                } catch(e){}
            }//end of sub function
     function queryMoverBottomToTop(tempArray){
            tempArray.sort(function(a, b){return b-a});
            tempArray = tempArray.sort(function(a,b) {
             return a[1] > b[1];
             });
            var tempArrayLen = tempArray.length;
            var queryOverLaps = true;
                try{
                while(queryOverLaps){
                    queryOverLaps = false;
                    for (var arr = tempArrayLen - 1; arr >= 0; arr --){ 
                        app.activeDocument.recompose();
                        var itrtFm = tempArray[arr];
                        var ancrFrm = myDoc.textFrames.itemByID(itrtFm[0]);
                        var ancrFrmBounds = ancrFrm.geometricBounds;
                        var ancrFrmTopPosition = ancrFrmBounds[0];
                        var ancrFrmBottomPosition = ancrFrmBounds[2];
                        var ancrFrmHt = ancrFrmBounds[2] - ancrFrmBounds[0];
                        for (var b = tempArrayLen - 1; b >= 0; b --){
                            app.activeDocument.recompose();
                            var citdArray = tempArray[b];
                            var testFrm = myDoc.textFrames.itemByID(citdArray[0]);
                            var testFrmBounds = testFrm.geometricBounds;
                            var testFrmTopPosition = testFrmBounds[0];
                            var testFrmBottomPosition = testFrmBounds[2];
                            if ((itrtFm[0] == citdArray[0]) && !(arr == 0) && (ancrFrmBottomPosition > ancrPgHt)){
                                var bottomDiff = ancrFrmBottomPosition - ancrPgHt;
                                ancrFrm.anchoredObjectSettings.anchorYoffset = ancrFrm.anchoredObjectSettings.anchorYoffset - bottomDiff;
                                b = -1;
                                queryOverLaps = true;
                                app.activeDocument.recompose();
                                var ancrFrmTempBounds = ancrFrm.geometricBounds;
                                if (ancrPgBounds[0] > ancrFrmTempBounds[0]){
                                    ancrFrm.anchoredObjectSettings.anchorYoffset = ancrFrm.anchoredObjectSettings.anchorYoffset + bottomDiff;
                                    queryOverLaps = false;
                                    app.activeDocument.recompose();
                                    }
                                }//end of if
                            else if((ancrFrmTopPosition < testFrmTopPosition) && (ancrFrmBottomPosition > testFrmTopPosition) && !(itrtFm[0] == citdArray[0])){
                                var newTopPosition = testFrmTopPosition - ancrFrmTopPosition;
                                ancrFrm.anchoredObjectSettings.anchorYoffset = newTopPosition - ((2 + ancrFrmHt) - (ancrFrm.anchoredObjectSettings.anchorYoffset));
                                b = -1;
                                queryOverLaps = true;
                                app.activeDocument.recompose();
                                var ancrFrmTempBounds = ancrFrm.geometricBounds;
                                if (ancrPgBounds[0] > ancrFrmTempBounds[0]){
                                    ancrFrm.anchoredObjectSettings.anchorYoffset = newTopPosition + ((2 + ancrFrmHt) + (ancrFrm.anchoredObjectSettings.anchorYoffset));
                                    queryOverLaps = false;
                                    app.activeDocument.recompose();
                                    }
                                //checking bottom position 
                                }//end of else if
                            else if((ancrFrmTopPosition < testFrmBottomPosition) && !(testFrmTopPosition > ancrFrmTopPosition) && !(itrtFm[0] == citdArray[0])){
                                var newTopPosition = testFrmTopPosition - ancrFrmTopPosition;
                                ancrFrm.anchoredObjectSettings.anchorYoffset = newTopPosition - ((2 + ancrFrmHt) - (ancrFrm.anchoredObjectSettings.anchorYoffset));
                                b = -1;
                                queryOverLaps = true;
                                app.activeDocument.recompose();
                                var ancrFrmTempBounds = ancrFrm.geometricBounds;
                                if (ancrPgBounds[0] > ancrFrmTempBounds[0]){
                                    ancrFrm.anchoredObjectSettings.anchorYoffset = newTopPosition + ((2 + ancrFrmHt) + (ancrFrm.anchoredObjectSettings.anchorYoffset));
                                    queryOverLaps = false;
                                    app.activeDocument.recompose();
                                    }
                                //checking bottom position 
                                }//end of else if
                            else if (ancrFrmBottomPosition > ancrPgHt && tempArrayLen == 1){
                                var bottomDiff = ancrFrmBottomPosition - ancrPgHt;
                                ancrFrm.anchoredObjectSettings.anchorYoffset = ancrFrm.anchoredObjectSettings.anchorYoffset - bottomDiff;
                                }//end of else if
                            else {
                                    queryOverLaps = false;
                                }
                            }//end of for
                        }//end of for
                    }//end of while
                } catch(e){}
            }//end of sub function       
    }//end of function 
}
//=====================================================================

//======================================================================================
function downLoadXSL(xslURL,xslPath){
//code referered from "http://www.rorohiko.com/podcast/geturl.zip"        
        var imageData = GetURL(xslURL,true);
        if (imageData != null && imageData.body != null)
        {
          xslPath.open("w");
          xslPath.encoding = "BINARY";
          xslPath.write(imageData.body);
          xslPath.close();
        }

        function GetURL(url,isBinary, recursive301CallLevel)
        {
          var reply = null;   
          const kUTF8CharState_Complete = 0;  
          const kUTF8CharState_PendingMultiByte = 1;
          const kUTF8CharState_Binary = 2;
          const kLineState_InProgress = 0;
          const kLineState_SeenCR = 1;
          const kProtocolState_Status = 1;
          const kProtocolState_Headers = 2;
          const kProtocolState_Body = 3;
          const kProtocolState_Complete = 4;
          const kProtocolState_TimeOut = 5;
          
          do
          {
            //
            // Chop the URL into pieces
            //
            var parsedURL = ParseURL(url);
            //
            // We only know how to handle HTTP - bail out if it is something else
            //
            if (parsedURL.protocol != "HTTP")
            {
              break;
            }
            //
            // Open up a socket, and set the time out to 2 minutes. The timeout
            // could be parametrized - I leave that as an exercise.
            var socket = new Socket;    
            socket.timeout = 120;
            //
            // Open the socket in binary mode. Sockets could also be opened in UTF-8 mode
            // That might seem a good idea to interpret UTF-8 data, but it does not work out
            // well: the HTTP protocol gives us a body length in bytes. If we let the socket 
            // interpret UTF-8 then the body length we get from the header, and the number of 
            // characters we receive won't match - which makes things quite awkward.
            // So we need to use BINARY mode, and we must convert the UTF-8 ourselves.
            //
            if (! socket.open(parsedURL.address + ":" + parsedURL.port,"BINARY"))
            {
              break;
            }
            //
            // Dynamically build an HTTP 1.1 request.
            // 
            if (isBinary)
            {
              var request = 
                "GET /" + parsedURL.path + " HTTP/1.0\n" +
                "Host: " + parsedURL.address + "\n" +
                "User-Agent: InDesign ExtendScript\n" +
                "Accept: */*\n" + 
                "Connection: keep-alive\n\n";
            }
            else
            {
              var request = 
                "GET /" + parsedURL.path + " HTTP/1.0\n" +
                "Host: " + parsedURL.address + "\n" +
                "User-Agent: InDesign ExtendScript\n" +
                "Accept: text/xml,text/*,*/*\n" + 
                "Accept-Encoding:\n" +
                "Connection: keep-alive\n" +
                "Accept-Language: *\n" + 
                "Accept-Charset: utf-8\n\n";
            }
            //
            // Send the request out
            //
            socket.write(request);
            //
            // readState keeps track of our three state machines
            //
            var readState =
            {
              buffer: "",
              bufPos: 0,
              //
              // Lowest level state machine: UTF-8 conversion. If we're handling binary data
              // the state is set to kUTF8CharState_Binary which is a 'stuck' state - it 
              // remains in that state all the time. If the data really is UTF-8 the state
              // flicks between kUTF8CharState_PendingMultiByte and kUTF8CharState_Complete
              // 
              curCharState: isBinary ? kUTF8CharState_Binary : kUTF8CharState_Complete,
              curCharCode: 0,
              pendingUTF8Bytes: 0,      
              //
              // Second level state machine: allows us to handle lines and line endings
              // This state machine can process CR, LF, or CR+LF line endings properly
              // The state flicks between kLineState_InProgress and kLineState_SeenCR
              //
              lineState: kLineState_InProgress,
              curLine: "",
              line: "",
              isLineReadyToProcess: false,
              //
              // Third level state machine: handle HTTP reply. This state gradually 
              // progresses through kProtocolState_Status, kProtocolState_Headers,
              // kProtocolState_Body, kProtocolState_Complete.
              // contentBytesPending is part of this state - it keeps track of how many 
              // bytes of the body still need to be fetched.
              //      
              protocolState: kProtocolState_Status,
              contentBytesPending: null,
              dataAvailable: true,
              //
              // The HTTP packet data, chopped up in convenient pieces.
              //
              status: "",
              headers: {},
              body: ""
            };
            //
            // Main loop: we loop until we hit kProtocolState_Complete as well as an empty data buffer
            // (meaning all data has been processed) or until something timed out.
            // 
            while 
            (
              ! (readState.protocolState == kProtocolState_Complete && readState.buffer.length <= readState.bufPos)
             &&
              readState.protocolState != kProtocolState_TimeOut
            )
            {
              //
              // If all data in the buffer has been processed, clear the old stuff
              // away - this makes things more efficient
              //
              if (readState.bufPos > 0 && readState.buffer.length == readState.bufPos)
              {
                readState.buffer = "";
                readState.bufPos = 0;
              }
              //
              // If there is no data in the buffer, try to get some from the socket
              //
              if (readState.buffer == "")
              {      
                //
                // If we're handling the body of the HTTP reply, we can try to optimize
                // things by reading big blobs of data. Also, we need to look out for
                // completion of the transaction.
                //
                if (readState.protocolState == kProtocolState_Body)
                {
                  //
                  // readState.contentBytesPending==null means that the headers did not
                  // contain a length value for the body - in which case we need to process
                  // data until the socket is closed by the server
                  //
                  if (readState.contentBytesPending == null)
                  {
                    if (! readState.dataAvailable && ! socket.connected)
                    {
                      //
                      // The server is finished with us - we're done
                      //
                      socket = null;
                      readState.protocolState = kProtocolState_Complete;
                    }
                    else
                    {
                      //
                      // Attempt to read as many bytes as we can. If no bytes are returned
                      // by a length-less read(), force a read of one byte which will make
                      // the script wait for a byte to arrive
                      //
                      readState.buffer += socket.read();
                      readState.dataAvailable = readState.buffer.length > 0;
                      if (! readState.dataAvailable) 
                      {
                         readState.buffer += socket.read(1);
                         readState.dataAvailable = readState.buffer.length > 0;
                      }
                    }
                  }
                  else
                  {
                    //
                    // If the socket is suddenly disconnected, the server pulled the
                    // rug from underneath us. Register this as a time out problem and
                    // bail out.
                    //
                    if (! readState.dataAvailable && ! socket.connected)
                    {
                      socket = null;
                      readState.protocolState = kProtocolState_TimeOut;
                    }
                    else
                    {
                      //
                      // Try to get as much data as needed from the socket. We might 
                      // receive less than we've asked for. 
                      // 
                      readState.buffer = socket.read(readState.contentBytesPending);
                      readState.dataAvailable = readState.buffer.length > 0;
                      readState.contentBytesPending -= readState.buffer.length;
                      //
                      // Check if we've received as much as we were promised in the headers
                      // If so, we're done with the socket. 
                      //
                      if (readState.contentBytesPending == 0)
                      {
                        readState.protocolState = kProtocolState_Complete;
                        socket.close();
                        socket = null;
                      }
                      //
                      // If we're downloading binary data, we can immediately shove the
                      // whole buffer into the body data - there's no UTF-8 to worry about             
                      //
                      if (isBinary)
                      {
                        readState.body += readState.buffer;
                        readState.buffer = "";
                        readState.bufPos = 0;
                      }
                    }
                  }
                }
                else if (readState.protocolState != kProtocolState_Complete)
                {
                  //
                  // We're reading headers or status right now - look out
                  // for server disconnects
                  //
                  if (! readState.dataAvailable && ! socket.connected)
                  {
                    socket = null;
                    readState.protocolState = kProtocolState_TimeOut;
                  }
                  else
                  {
                    readState.buffer += socket.read(1);
                    readState.dataAvailable = readState.buffer.length > 0;
                  }
                }
              }
              
              //
              // The previous stretch of code got us as much data as possible into
              // the buffer (but that might be nothing, zilch). If there is data,
              // we process a single byte here.
              //
              if (readState.buffer.length > readState.bufPos)
              {
                if (readState.curCharState == kUTF8CharState_Binary && readState.protocolState == kProtocolState_Body)
                {
                    readState.body += readState.buffer;
                    readState.bufPos = readState.buffer.length;
                }
                else 
                {
                    //
                    // Fetch a byte
                    //
                    var cCode = readState.buffer.charCodeAt(readState.bufPos++);
                    
                    switch (readState.curCharState)
                    {
                      case kUTF8CharState_Binary:
                        //
                        // Don't use the UTF-8 state machine on binary data
                        //
                        readState.curCharCode = cCode;
                        readState.multiByteRemaining = 0;
                        break;
                      case kUTF8CharState_Complete:
                        //
                        // Interpret the various UTF-8 encodings - 1, 2, 3, or 4 
                        // consecutive bytes encode a single Unicode character. It's all
                        // bit-fiddling here: depending on the masks used, the bytes contain
                        // 3, 4, 5, 6 bits of the whole character.
                        // Check 
                        // http://en.wikipedia.org/wiki/UTF-8
                        //
                        if (cCode <= 127)
                        {
                          readState.curCharCode = cCode;
                          readState.multiByteRemaining = 0;
                        }
                        else if ((cCode & 0xE0) == 0xC0)
                        {
                          readState.curCharCode = cCode & 0x1F;
                          readState.curCharState = kUTF8CharState_PendingMultiByte;
                          readState.pendingUTF8Bytes = 1;
                        }
                        else if ((cCode & 0xF0) == 0xE0)
                        {
                          readState.curCharCode = cCode & 0x0F;
                          readState.curCharState = kUTF8CharState_PendingMultiByte;
                          readState.pendingUTF8Bytes = 2;
                        }
                        else if ((cCode & 0xF8) == 0xF0)
                        {
                          readState.curCharCode = cCode & 0x07;
                          readState.curCharState = kUTF8CharState_PendingMultiByte;
                          readState.pendingUTF8Bytes = 3;
                        }
                        else
                        {
                          // bad UTF-8 char
                          readState.curCharCode = cCode;
                          readState.pendingUTF8Bytes = 0;
                        }
                        break;
                      case kUTF8CharState_PendingMultiByte:
                        if ((cCode & 0xC0) == 0x80)
                        {
                          readState.curCharCode = (readState.curCharCode << 6) | (cCode & 0x3F);
                          readState.pendingUTF8Bytes--;
                          if (readState.pendingUTF8Bytes == 0)
                          {
                            readState.curCharState = kUTF8CharState_Complete;
                          }
                        }
                        else
                        {
                          // bad UTF-8 char
                          readState.curCharCode = cCode;
                          readState.multiByteRemaining = 0;
                          readState.curCharState = kUTF8CharState_Complete;
                        }
                        break;
                    }
                    
                    //
                    // If we've got a complete byte or Unicode char available, we process it
                    //
                    if (readState.curCharState == kUTF8CharState_Complete || readState.curCharState == kUTF8CharState_Binary)
                    {
                      cCode = readState.curCharCode;
                      var c = String.fromCharCode(readState.curCharCode);
                      if (readState.protocolState == kProtocolState_Body || readState.protocolState == kProtocolState_Complete)
                      {
                        //
                        // Once past the headers, we simply append new bytes to the body of the HTTP reply
                        //
                        readState.body += c; 
                      }
                      else
                      {
                        //
                        // While reading the headers, we look out for CR, LF or CRLF sequences            
                        //
                        if (readState.lineState == kLineState_SeenCR)
                        {
                          // 
                          // We saw a CR in the previous round - so whatever follows,
                          // the line is now ready to be processed.
                          //
                          readState.line = readState.curLine;
                          readState.isLineReadyToProcess = true;
                          readState.curLine = "";
                          readState.lineState = kLineState_InProgress;
                          // 
                          // The CR might be followed by another one, or 
                          // it might be followed by a LF (which we ignore)
                          // or any other character (which we process).
                          //
                          if (cCode == 13) // CR
                          {
                            readState.lineState = kLineState_SeenCR;
                          }
                          else if (cCode != 10) // no LF
                          {
                            readState.curLine += c;
                          }
                        }
                        else if (readState.lineState == kLineState_InProgress)
                        {
                          //
                          // If we're in the midsts of reading characters and we encounter
                          // a CR, we switch to the 'SeenCR' state - a LF might or might not
                          // follow.
                          // If we hit a straight LF, we can process the line, and get ready
                          // for the next one
                          //
                          if (cCode == 13) // CR
                          {
                            readState.lineState = kLineState_SeenCR;
                          }
                          else if (cCode == 10) // LF
                          {
                            readState.line = readState.curLine;
                            readState.isLineReadyToProcess = true;
                            readState.curLine = "";
                          }
                          else
                          {
                            // 
                            // Any other character is appended to the current line
                            //
                            readState.curLine += c;
                          }
                        }
                        
                        if (readState.isLineReadyToProcess)
                        {
                          //
                          // We've got a complete line to process
                          //
                          readState.isLineReadyToProcess = false;
                          if (readState.protocolState == kProtocolState_Status)
                          {
                            //
                            // The very first line is a status line. After that switch to
                            // 'Headers' state
                            //
                            readState.status = readState.line;
                            readState.protocolState = kProtocolState_Headers;
                          }
                          else if (readState.protocolState == kProtocolState_Headers)
                          {
                            //
                            // An empty line signifies the end of the headers - get ready
                            // for the body.
                            //
                            if (readState.line == "")
                            {
                              readState.protocolState = kProtocolState_Body;
                            }
                            else
                            {
                              //
                              // Tear the header line apart, and interpret it if it is
                              // useful (currently, the only header we process is 'Content-Length'
                              // so we know exactly how many bytes of body data will follow.
                              //
                              var headerLine = readState.line.split(":");
                              var headerTag = headerLine[0].replace(/^\s*(.*\S)\s*$/,"$1");
                              headerLine = headerLine.slice(1).join(":");
                              headerLine = headerLine.replace(/^\s*(.*\S)\s*$/,"$1");
                              readState.headers[headerTag] = headerLine;
                              if (headerTag == "Content-Length")
                              {
                                readState.contentBytesPending = parseInt(headerLine);
                                if (isNaN(readState.contentBytesPending) || readState.contentBytesPending <= 0)
                                {
                                  readState.contentBytesPending = null;
                                }
                                else
                                {
                                  readState.contentBytesPending -= (readState.buffer.length - readState.bufPos);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
              }
            }
          
            //
            // If we have not yet cleaned up the socket we do it here
            //
            if (socket != null)
            {
              socket.close();
              socket = null;
            }
            
            reply = 
            {
              status: readState.status,
              headers: readState.headers,
              body: readState.body
            };
          } 
          while (false);

          if (reply.status.indexOf("301") >= 0)
          {
            if (recursive301CallLevel == undefined)
            {
              recursive301CallLevel = 0;
            }
            if (recursive301CallLevel < kMaxRecursive301Calls)
            {
              reply = GetURL(reply.headers.Location, isBinary, recursive301CallLevel + 1);
            }
          }

          return reply;
        }

        // ****************

        function ParseURL(url)
        {
          url=url.replace(/([a-z]*):\/\/([-\._a-z0-9A-Z]*)(:[0-9]*)?\/?(.*)/,"$1/$2/$3/$4");
          url=url.split("/");

          if (url[2] == "undefined") url[2] = "80";
          
          var parsedURL = 
          {
            protocol: url[0].toUpperCase(),
            address: url[1],
            port: url[2],
            path: ""
          };

          url = url.slice(3);
          parsedURL.path = url.join("/");
          
          if (parsedURL.port.charAt(0) == ':')
          {
            parsedURL.port = parsedURL.port.slice(1);
          }
          
          if (parsedURL.port != "")
          {
            parsedURL.port = parseInt(parsedURL.port);
          }
          
          if (parsedURL.port == "" || parsedURL.port < 0 || parsedURL.port > 65535)
          {
            parsedURL.port = 80;
          }
          
          parsedURL.path = parsedURL.path;
          
          return parsedURL;
        }
    }
//===========================http request ends=================================
//=================Query highlights starts=========================
function highlightQueries(){
    var myDoc = app.activeDocument;
    var xmlQueries = myDoc.xmlElements[0].evaluateXPathExpression("//query");
    var xmlQueriesLen = xmlQueries.length;
    for (var q = 0; q < xmlQueriesLen; q ++){
        var currQueryCharacters = xmlQueries[q].characters;
        currQueryCharacters.everyItem().underline = true;
        currQueryCharacters.everyItem().underlineColor = myDoc.swatches.itemByName("HIGHLIGHT_COLOR");
        currQueryCharacters.everyItem().underlineTint = 40;
        currQueryCharacters.everyItem().underlineWeight = 11.5;
        currQueryCharacters.everyItem().underlineOffset  = -2.875;
        }
    }
//=================Query highlights starts=========================
//================Suffle pages starts=====================
function sufflePages(){
var myDoc = app.activeDocument;
//code to shuffle pages and move page to display individually for bleed prupose
var docPages = myDoc.pages;
var docPagesLen = docPages.length;
var docSpreads = myDoc.spreads;
var docSpreadsLen = docSpreads.length;
var actualSpreadLen;//expected spread length after pages shuffled
if(docPagesLen%2){
    actualSpreadLen = docPagesLen;
    }
else{
    actualSpreadLen = docPagesLen-1;
    }
var tempCt = 0;
for (var ds = 0; ds < actualSpreadLen; ds ++){
        if (tempCt == 0){
            var currSpread = docSpreads[ds];
            if (currSpread.pages.length>1){
                docSpreads[ds].allowPageShuffle = false;
                var currOddPage = currSpread.pages[1];//assuming that the template has only two pages spreads
                var currOddPageName = parseInt(currOddPage.name);
                //var nextEvenPage = docPages[currOddPageName];
                var nextEvenPage = docPages[String(ds+2)];//made changes here on 03-May -2016 becuase had identified a bug on the previous line
                if (nextEvenPage.isValid){
                    currOddPage.move (LocationOptions.BEFORE, nextEvenPage);
                    tempCt++;
                    }//end of if
                }//end of if
            }//end of if
        else{
            if ((actualSpreadLen) < actualSpreadLen){
                var currSpread = myDoc.spreads[ds +tempCt];
                if (currSpread.pages.length>1){
                    docSpreads[ds+tempCt].allowPageShuffle = false;
                    var currOddPage = currSpread.pages[1];
                    var currOddPageName = parseInt(currOddPage.name);
                    //var nextEvenPage = docPages[currOddPageName];
                    var nextEvenPage = docPages[currOddPageName];//made changes here on 03-May -2016 becuase had identified a bug on the previous line
                    if (nextEvenPage.isValid){
                        currOddPage.move (LocationOptions.BEFORE, nextEvenPage);
                        tempCt++;
                        }//end of if
                    else {
                        docSpreads[ds+tempCt].allowPageShuffle = true;
                        nextEvenPage = myDoc.pages.add(LocationOptions.after, currOddPage);
                        docSpreads[ds+tempCt].allowPageShuffle = false;
                        currOddPage.move (LocationOptions.BEFORE, nextEvenPage);
                        nextEvenPage.remove();
                        }//end of else
                    }//end of if   
                }
            }//end of else
    }//end of for
}
//================Suffle pages ends=====================
//Below code will search all URL in the document and insert "Discretionary line break" to soft hyphenation for URl
//Code was written by Pari.
function addingDiscretionaryLineBreakForURLs(){
    myResetFindChangePref();
//~     app.findGrepPreferences.findWhat = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)|([A-Z]{20,})";
    app.findGrepPreferences.findWhat = "https?:\\/\\/(www\\.)?[\\-a-zA-Z0-9@:%\\.,;_\\+~\\#=]{2,256}\\.[a-z]{2,6}\\b([\\-a-zA-Z0-9@:%_\\+\\.,;~\\#?&\\/=]*)|(www\\.)?[\\-a-zA-Z0-9@:%\\.,;_\\+~\\#=]{2,256}\\.[a-z]{2,6}\\b([\\-a-zA-Z0-9@:%_\\+\\.,;~\\#?&\\/=]*)|([A-Z]{20,})";
    app.findGrepPreferences.position = Position.NORMAL;
    var link = app.activeDocument.findGrep();
    var linkLen = link.length;
    for (n = linkLen - 1; n >= 0; n--) {
        var currLink = link[n].contents;
        var linkReturned = addLogicalBreaksToLinks(link[n]);
    }
}
/**
* add logical break to links - hyperlinks and email addresses
* when an url or email id has large number of characters they would intervene the normal flow of the paragraph.
* In order to avoid this situation we have to introduce discretionary line breaks to help InDesign decide where the link would be broken
*
**/
function addLogicalBreaksToLinks(currLink){
    var linkStr = currLink.contents;
    //var linkStr = 'http://dx.doi.org/10.1136/openhrt-2016-000417';
    //linkStr = 'http://static.www.bmj.com/sites/default/files/responseattachments/2015/10/Figure%20271015.docx';
    var lineBreakChar = "";//String.fromCodePoint(0x200B);
    // split the given link into protocol and remaining part
    var linkPartsArr = /^(https?:\/\/(?:www\.)?|www\.)(.*)$/g.exec(linkStr);
    if (linkPartsArr == null){
       linkPartsArr = ['', '', linkStr];
    }
    var protocolStr = linkPartsArr[1];
    // split the remaining part of the link into array
    var temp = linkPartsArr[2];
    var processedLinkStrArr = [protocolStr + lineBreakChar];
    var index = 0;
    // if the temp string begins with alphanumeric characters and has a punctuation then take that part alone for processing 
    while ((/^.*?[^a-z0-9]/i.test(temp)) || (index++ < 25)){
        var tempArr = /(.*?)([^a-z0-9])/i.exec(temp);
        temp = temp.replace(/^.*?[^a-z0-9]/i, '');
        if (tempArr == null){
            linkStrPart = temp;
            var linkStrPunc = '';
            index = 100; // push the index to higher value so the loop will break
        }
        else{
            linkStrPart = tempArr[1];
            // updated by PM, May 5, 2017
            // if length of string before the punctuation is one, then its not okay to split the string at that point
            // so skip adding the link break character for that punctuation
            if (linkStrPart.length == 1){
                var linkStrPunc = tempArr[2];
            }
            else{
                var linkStrPunc = tempArr[2] + lineBreakChar;
            }
        }
        // as a design assumption we try to split the character only if we have a minimum of 8 characters
        // we split at 4 characters
        if (linkStrPart.length > 20){
            var currStrArr = linkStrPart.match(/.{1,4}/g)
            // merge the last element of the array with its previous element and remove the last element
            // this is done to avoid leaving those characters on a separate line on the proof
            var len = currStrArr.length;
            if (len > 1){
                currStrArr[len - 2] = currStrArr[len - 2] + currStrArr[len - 1]
                currStrArr.pop();
            }
            //linkStrPart = currStrArr.join(lineBreakChar);
            processedLinkStrArr = processedLinkStrArr.concat(currStrArr);
        }
        if ((linkStrPart + linkStrPunc) != ''){
            processedLinkStrArr.push(linkStrPart + linkStrPunc);
        }
    }
    var aLen = processedLinkStrArr.length;
    var charIndex = linkStr.length;
    for (var i = aLen - 1; i > 0; i--) {
        var charLen = processedLinkStrArr[i].length;
        charIndex = charIndex - charLen;
        if (charLen > 1){
            var charObj = currLink.characters[charIndex];
            charObj.insertionPoints[0].contents = "\u200B";
            }
        }
    // if the last character is a punctuation then the lineBreakChar would have been added before it. please remove.
    processedLinkStr = processedLinkStrArr.join('').replace(/\u200B$/g, '');
    return processedLinkStr;
}
//function for tab align
function tabAlign(currTblDOM){    
    //Changing paragraphs above space
    var alignParas = currTblDOM.evaluateXPathExpression("//p[@data-align]");
    var alignParasLen = alignParas.length;
    for (var x = 0; x < alignParasLen; x++){
        var currAlignPara = alignParas[x].xmlAttributes.itemByName("data-align").value;
        if (!(currAlignPara == '')){
                var charAlignOn = alignParas[x].xmlAttributes.itemByName("data-align").value;
                var charAlignAt = alignParas[x].xmlAttributes.itemByName("data-align-left-width").value;
                try{
                    if(charAlignOn == '.'){
                        alignParas[x].paragraphs[0].tabStops.add({alignment:TabStopAlignment.CHARACTER_ALIGN, alignmentCharacter:charAlignOn, position:charAlignAt});
                        //alignParas[x].paragraphs[0].leftIndent = 0;
                        alignParas[x].paragraphs[0].firstLineIndent = 0;
                        alignParas[x].paragraphs[0].rightIndent = 0;                
                        }
                    else if(charAlignOn == ','){
                        //alignParas[x].paragraphs[0].justification = Justification.RIGHT_ALIGN;
                        alignParas[x].paragraphs[0].tabStops.add({alignment:TabStopAlignment.CHARACTER_ALIGN, alignmentCharacter:charAlignOn, position:charAlignAt});
                        alignParas[x].paragraphs[0].leftIndent = 0;
                        alignParas[x].paragraphs[0].firstLineIndent = 0;
                        alignParas[x].paragraphs[0].rightIndent = parseInt(alignParas[x].xmlAttributes.itemByName("data-align-right-width").value);                
                        }
                    else if(charAlignOn == '('){
                        alignParas[x].paragraphs[0].tabStops.add({alignment:TabStopAlignment.CHARACTER_ALIGN, alignmentCharacter:charAlignOn, position:charAlignAt});
                        //alignParas[x].paragraphs[0].leftIndent = 0;
                        alignParas[x].paragraphs[0].firstLineIndent = 0;
                        alignParas[x].paragraphs[0].rightIndent = 0;                
                        }
                    else if(charAlignOn == '±' || charAlignOn == '&#x00B1;' || charAlignOn == 'prm'){
                        charAlignOn = '±';
                        //below is the temp solution for p/m align
                        var tcha = alignParas[x].paragraphs[0].characters;
                        var tchaLen = tcha.length;
                        if (tchaLen > 0){
                            var plsMinusCharPosition = 0;
                            for (var a = 0; a < tchaLen; a ++){
                                if (tcha[a].contents == '±'){
                                    plsMinusCharPosition = a;
                                    break;
                                    }
                                }
                            var startCharOffset = tcha[0].horizontalOffset;
                            var lastCharBeforePlusRMinusOffset = tcha[plsMinusCharPosition - 1].endHorizontalOffset;
                            var diff = lastCharBeforePlusRMinusOffset - startCharOffset;
                            alignParas[x].paragraphs[0].leftIndent = charAlignAt - diff;                        
                            }
//~                         alignParas[x].paragraphs[0].recompose();
//~                         alignParas[x].paragraphs[0].tabStops.add({alignmentCharacter:'±', alignment:TabStopAlignment.CHARACTER_ALIGN, position:charAlignAt});
//~                         alignParas[x].paragraphs[0].firstLineIndent = 0;
//~                         alignParas[x].paragraphs[0].rightIndent = 0;                
                        }
                } catch (e){}
                }
            }
    }
//==============================================
//Developer: Kannan. R
//Date: 08-Mar-2017
function _color_changes(article_type,proof_type,config)
{
            doc = app.activeDocument;
            try{
                var testObj = config.colorDetails[article_type][proof_type];
                }
            catch(e){
                doc.close(SaveOptions.NO);
                debuggerMSG("Error: Color definition for article type (" + article_type + ") not configured\tfailed");
                displayMSG("Error: Color definition for article type (" + article_type + ") not configured\tfailed\t0");
                writeTxtFile("failed");//a txt file is being created in the log file path for jobmanager to know the current status of proof (dt: 02-Jun-2017)
                exit();
                }
            for(var color_name in config.colorDetails[article_type][proof_type])   
            {
                        var swatch = doc.swatches.item(color_name);
                        if(swatch.isValid)
                        {
                                    var color_type = config.colorDetails[article_type][proof_type][color_name].colourType;
                                    var color_mode = config.colorDetails[article_type][proof_type][color_name].colourMode;
                                    var color_value = config.colorDetails[article_type][proof_type][color_name].colourValue;
                                    
                                        color_values = color_value.split(",");
                                        var color_values_arr = [];
                                        for(var ar=0;ar<color_values.length;ar++)
                                        {
                                                color_values_arr.push(Number(color_values[ar]))
                                        }
                                    
                                    if(color_type.toString().match("process","i"))
                                    {
                                            swatch.model = 1886548851;
                                    }
                                    else if(color_mode.toString().match("spot","i"))
                                    {
                                            swatch.model = 1936748404;
                                    }
                                
                                    if(color_mode.toString().match("cmyk","i"))
                                    {
                                            swatch.space = 1129142603;
                                    
                                            swatch.colorValue = color_values_arr;
                                    }
                                    else if(color_mode.toString().match("lab","i"))
                                    {
                                            swatch.space = 1665941826;
                                            swatch.colorValue = color_values_arr;
                                    }
                                     else if(color_mode.toString().match("rgb","i"))
                                    {
                                            swatch.space = 1666336578;
                                            swatch.colorValue = color_values_arr;
                                    }
                                
                        }
            }
    
}
//=====================================================================================
    //the below function will keep the required to flow content and remove the unwanted layers
    function updateLayers(myDoc, rootNode, layerToBeUsed, config, watermarkStatus){
        var docLayers = myDoc.layers;
        var docLayersLen = docLayers.length;
        var layoutName = config.articleTypeDetails[layerToBeUsed]
        for (var ly = docLayersLen - 1; ly >=0; ly --){
            var currLayer = docLayers[ly];
            var currLayerName = currLayer.name;
            if (currLayerName == 'WATERMARK' && (watermarkStatus == 'false')){
                currLayer.remove();        
                }
            else if (!(currLayerName == layoutName) && (currLayerName != 'COMMON') && (currLayerName != 'OPEN_ACC_LOGO')){// && (currLayerName != 'WATERMARK')
                var layersTextFrames = currLayer.textFrames;
                var layersTextFramesLen = layersTextFrames.length;
                for (var lf = 0; lf < layersTextFramesLen; lf ++){
                    var currxmlFrame = layersTextFrames[lf];
                    if (currxmlFrame.properties.associatedXMLElement instanceof XMLElement){
                        currxmlFrame.associatedXMLElement.untag();
                        }
                    }//end of FOR loop
                currLayer.remove();        
                }//end of IF
            }//end of FOR loop    
        }// end of updateLayers function
    
/*
Developer: Kannan. R
Functionality: The below function will highlight table cell(s) with overflows*/
function _table_cells_overflows(table)
{
            var flag = 0;
            text_frames_overflow_arr = [];
            doc = app.activeDocument;
            
            doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
            doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
            
            if( (table) && (table.toString().match("table","i")) )
            {
                
                            // To create "Red" color if does not exist
                            color_red = doc.swatches.item("Red");
                            if( (color_red) && (!color_red.isValid) )
                            {
                                    color_red = doc.colors.add({name:"Red", space:ColorSpace.RGB, colorValue:[255,0,0]})  // create RGB red color, if not an exist.
                            }

                            var cell_overflow = table.cells.everyItem().overflows;

                            for(var t in cell_overflow)
                            {
                                    if(cell_overflow[t] == true)
                                    {
                                                   var cell = table.cells[t];
                                                    cell.fillColor = color_red;
                                                    cell.fillTint = 100;
                                                    
                                                    var table_frame = "";
                                                   try
                                                   {
                                                            table_frame = cell.insertioPoints[0].parentTextFrames[0];
                                                   }
                                                   catch(e){}
                                                   
                                                   if( (table_frame) && (table_frame.toString().match("textFrame","i")))
                                                   {  
                                                   }
                                                   else
                                                   {
                                                                        // Fetching textframe for particular table
                                                                        var row_cells = cell.parentRow.cells.everyItem().overflows;
                                                                        for(var c in row_cells)
                                                                        {
                                                                                    if(row_cells[c] == false)
                                                                                    {
                                                                                            table_frame = cell.parentRow.cells[c].insertionPoints[0].parentTextFrames[0];
                                                                                            if((table_frame) && (table_frame.toString().match("textFrame","i")) )
                                                                                            {  break; }
                                                                                    }
                                                                        }
                                                   }
                                                
                                                    if((table_frame) && (!table_frame.label.toString().match("cell_overflow","i")) )
                                                    {
                                                                    _create_stamp(table_frame)
                                                    }
                                                    
                                                    flag = 1;
                                    }
                            }
                        
                            if(flag == 1)
                            {
                                        var tf=0;
                                        for(tf=0;tf<text_frames_overflow_arr.length;tf++)
                                        {
                                                    if(text_frames_overflow_arr[tf].label == "cell_overflow")
                                                    {
                                                                text_frames_overflow_arr[tf].label = "";
                                                    }
                                        }
                                        return true;
                            }
                            else
                            {
                                        return "Table cells may not overflow...";
                            }
             }
            else
            {
                        return "Selected item is not a table...";
            }

            function _create_stamp(table_frame)
            {
                        doc = app.activeDocument;
                        
                        if( (table_frame) && (table_frame.toString().match("TextFrame","i")))
                        {
                                    //table_frame.textWrapPreferences.textWrapMode = TextWrapModes.NONE;
                                      //  table_frame.select();
                                        
                                        var table_frame_width = table_frame.geometricBounds[3] - table_frame.geometricBounds[1];
                                        font_size = (table_frame_width / 10);
                                        
                                      //  app.copy();
                                       // app.pasteInPlace();
                                       // var new_frame = doc.selection[0];
                                        var new_frame = table_frame.duplicate();
                                        
                                        with(new_frame)
                                        {
                                                    contents = "";
                                                    applyObjectStyle(doc.objectStyles.item("[None]"))
                                                    texts[0].appliedParagraphStyle = doc.paragraphStyles.item("[Basic Paragraph]");
                                                    textFramePreferences.ignoreWrap = true;
                                                    contents = "Table cell(s) overflows, please use Adjust Table option to fix column width";
                                                    texts[0].pointSize = font_size + " pt";
                                                    texts[0].fillColor = color_red;
                                                    texts[0].justification = Justification.CENTER_ALIGN;
                                                    textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN;
                                                    
                                                    table_frame.label = "cell_overflow";
                                                    text_frames_overflow_arr.push(table_frame);
                                        } 
                        }
                        else
                        {
                                        return "Table's TextFrame is not found...";
                        }
            }
        
        
}    
/* 
            Move "METAINFO", "CROSSMARK", "RELATED_ARTICLE_INFO" frames to base align with root frame.
*/

function _meta_info_tag_frame_base_align()
{
        doc  =app.activeDocument
        ///  METAINFO - Process
        var mata_info_tag = doc.xmlElements[0].evaluateXPathExpression("//METAINFO");
        if(mata_info_tag.length > 0)
        {
                    try
                    {
                            var mata_info_tag_frame = mata_info_tag[0].insertionPoints[0].parentTextFrames[0];   // fetch related textframe
                    }
                    catch(e){}
                    if((mata_info_tag_frame) && (mata_info_tag_frame.isValid) )
                    {
                           // doc.select(mata_info_tag_frame)
                            var meta_info_y2 = mata_info_tag_frame.geometricBounds[2];
                            var meta_info_x2 = mata_info_tag_frame.geometricBounds[3];
                            var text_frames = doc.pages[0].textFrames;
                            var text_frames_arr = [];
                            var root_frame = "";
                            var t = 0;
                            
                             //Fetch root frame, base on highest y2 value
                            var temp_flag = 0;
                            for(t=0;t<text_frames.length;t++)
                            {
                                        if( (text_frames[t].geometricBounds[1] > meta_info_x2))
                                        {
                                                    if(text_frames[t].geometricBounds[2] > temp_flag)
                                                    {
                                                            root_frame = text_frames[t];
                                                            temp_flag = text_frames[t].geometricBounds[2];
                                                    }
                                        }
                                
                            }
                        
                        
                            if( (root_frame) && (root_frame.isValid))
                            {
                                         var root_frame_y2 = root_frame.geometricBounds[2];
                                         if(meta_info_y2 > root_frame_y2)
                                         {
                                                        
                                                         var mata_info_tag_frame_height = mata_info_tag_frame.geometricBounds[2] - mata_info_tag_frame.geometricBounds[0];
                                                         var mata_info_tag_frame_y = root_frame_y2 - mata_info_tag_frame_height - mata_info_tag_frame.strokeWeight;
                                                         var mata_info_tag_frame_x = mata_info_tag_frame.geometricBounds[1] ;
                                                         mata_info_tag_frame.move([mata_info_tag_frame_x,mata_info_tag_frame_y])
                                                         
                                                          ///  CROSSMARK - Process
                                                           var crossmark_tag = doc.xmlElements[0].evaluateXPathExpression("//CROSSMARK");
                                                           if(crossmark_tag.length > 0)
                                                            {
                                                                            try
                                                                            {
                                                                                    var crossmark_tag_frame = crossmark_tag[0].graphics[0].parent;  // fetch related textframe
                                                                             }
                                                                            catch(e){}
                                                                            if((crossmark_tag_frame) && (crossmark_tag_frame.isValid) )
                                                                            {
                                                                                            crossmark_tag_frame_height = crossmark_tag_frame.geometricBounds[2] - crossmark_tag_frame.geometricBounds[0];
                                                                                            crossmark_tag_frame_x = crossmark_tag_frame.geometricBounds[1] ;
                                                                                            crossmark_tag_frame_y = mata_info_tag_frame_y -  crossmark_tag_frame_height - 7;
                                                                                            crossmark_tag_frame.move([crossmark_tag_frame_x,crossmark_tag_frame_y])
                                                                                        
                                                                                            ///  RELATED_ARTICLE_INFO - Process
                                                                                           var related_article_info_tag = doc.xmlElements[0].evaluateXPathExpression("//RELATED_ARTICLE_INFO");
                                                                                           if(related_article_info_tag.length > 0)
                                                                                            {
                                                                                                            try
                                                                                                            {
                                                                                                                    var related_article_info_tag_frame = related_article_info_tag[0].insertionPoints[0].parentTextFrames[0];   // fetch related textframe
                                                                                                             }
                                                                                                            catch(e){}
                                                                                                            if((related_article_info_tag_frame) && (related_article_info_tag_frame.isValid) )
                                                                                                            {
                                                                                                                        related_article_info_tag_frame_height = related_article_info_tag_frame.geometricBounds[2] - related_article_info_tag_frame.geometricBounds[0];
                                                                                                                        related_article_info_tag_frame_x = related_article_info_tag_frame.geometricBounds[1] ;
                                                                                                                        related_article_info_tag_frame_y = crossmark_tag_frame_y -  related_article_info_tag_frame_height - 7;
                                                                                                                        related_article_info_tag_frame.move([related_article_info_tag_frame_x,related_article_info_tag_frame_y])
                                                                                                            } // end if
                                                                                            } // end if
                                                                            } // end if
                                                            } // end if
                                          } // end if
                            } // end if
                    } // end if
        } // end if
} // end function    

//=====================================================================================
//===========================================================================================
function placeOnlineBox(xPath, boxSpace, layerTemplateScript, boxType, onPage1Width, secondXpath){
    try{
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
    nodeLastPara = myDoc.xmlElements[0].evaluateXPathExpression(xPath);
    if (nodeLastPara.length == 0){
        nodeLastPara = myDoc.xmlElements[0].evaluateXPathExpression(secondXpath);
        }
    nodeLastPara = nodeLastPara[0];
    if(nodeLastPara.isValid){
        var TCContFrm;
        var currPage = nodeLastPara.paragraphs.lastItem().insertionPoints[-1].paragraphs[0].parentTextFrames[0].parentPage;
        var nodeLastParaFrame =  nodeLastPara.paragraphs[0].parentTextFrames[0];
        var nodeLastParaFrameBounds = nodeLastParaFrame.geometricBounds;
        var lastPageColuCount = nodeLastPara.paragraphs[0].parentTextFrames[0].textColumns;
        var lastPageColuCountLen = lastPageColuCount.length;
        var pathArray = new Array();
        for(var i = 0; i < lastPageColuCountLen; i++){
            var firstColumnLastLineBase = lastPageColuCount[i].lines.lastItem().insertionPoints[0].lines[0].endBaseline;
            pathArray.push(firstColumnLastLineBase);
            }
        //checking max value's index
        var maxIndex = 0;
        maxIndex = indexOfMax(pathArray);
        function indexOfMax(arr)
        {
            if (arr.length === 0) {
                return -1;
            }
            var max = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    maxIndex = i;
                    max = arr[i];
                }
            }
            return maxIndex;
        }
        var yOffset = lastPageColuCount[maxIndex].lines.lastItem().insertionPoints[0].lines[0].endBaseline;
        //var tempFrame = myDoc.pages[0].textFrames.add({geometricBounds:[0,0,10,10]});//this temp text frame is added to change the text selection mode of cursor to object selection mode 
        myDoc.pages[0].textFrames[0].select();
        var currLibItem = currLib.assets.item(boxType).placeAsset(myDoc);
        currLibItem[0].move(currPage);
        TCContFrm = currLibItem[0];
        //tempFrame.remove();
        var TCContFrmBounds = TCContFrm.geometricBounds;
        var TCContFrmHt = TCContFrmBounds[2]-TCContFrmBounds[0]+boxSpace;// boxSpace is the gap between last line and box top.
        var pageHt = config.pageSize['height'];//Code has been updated here to locate the copyright box
        var pageBottomMrg = config.margin['bottom'];//Code has been updated here to locate the copyright box
        var htAvblPage = pageHt-pageBottomMrg;//Code has been updated here to locate the copyright box
        var htAvbl = htAvblPage-nodeLastParaFrameBounds[2];//Code has been updated here to locate the copyright box
        //checking whether any further text frame appears at the bottom of the page
        var placeOnCurrPage = true;
        var TCContFrmID = TCContFrm.id;
        var allTextFramesAtCurrPage = currPage.textFrames;
        var allTextFramesAtCurrPageLen = allTextFramesAtCurrPage.length
        for (var tf = 0; tf < allTextFramesAtCurrPageLen; tf ++){
            var cFrame = allTextFramesAtCurrPage[tf];
            var cFrameBounds = cFrame.geometricBounds;
            //cFrame.select();
            if ((cFrameBounds[2] <= (pageHt - pageBottomMrg)) && cFrame.id != nodeLastParaFrame.id && cFrameBounds[0] > nodeLastParaFrameBounds[2] && cFrameBounds[1] >= nodeLastParaFrameBounds[1]){
                placeOnCurrPage = false;
                break;
                }//end of IF
            }//end of FOR loop
        if(htAvbl >= TCContFrmHt && placeOnCurrPage){
            TCContFrm.move([nodeLastParaFrameBounds[1], yOffset+boxSpace]);
            }
        else{
            var nextPage = app.activeDocument.pages.add(LocationOptions.AT_END);
            nextPage.appliedMaster = app.activeDocument.masterSpreads.item("A-TXT");
            var nextPageMrgPref = nextPage.marginPreferences;
            currLibItem[0].move(nextPage);
            TCContFrm.move([nextPageMrgPref.left, nextPageMrgPref.top]);
            }
        currLibItem[0].textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP
        if (currLibItem[0].parentPage.name == 1){
            currLibItem[0].geometricBounds = [currLibItem[0].geometricBounds[0], currLibItem[0].geometricBounds[1], currLibItem[0].geometricBounds[2], currLibItem[0].geometricBounds[1] + onPage1Width];
            }
        currLib.close();
        }//end of IF
    }catch(e){
            debuggerMSG("Exception on 'placeOnlineBox' function ..." + e);
        }
}//end of function

//=====================================================================================
// *********************************************************************************************************
// Heading: Table Proofing for InDesign Applying Text and Cell Colors
// Scritp Name:  Table Proofing for InDesign Applying Text and Cell Colors.jsx
// Script for InDesign CS6, Version-8.0
// Script Version No: 3.8.0.12.
// Developed by: S. Karthik, Exeter Premedia.
// Last Modification Date: 05-Oct-2016
// Script Description:  1. Table Proofing for Applying Text and Cell Background Colors Based on the Template (RGB or CMYK). 
//                                    2. In template shout be create: Type >> Text Variables >> Define >> CMYK (Text: true).
//                                    3. In xml input file shout be must RGB color value only.
//
// *********************************************************************************************************
    
function  applyingTableCellandTextColor(textXpath, cellXpath){
    try{
        var myDoc = app.activeDocument;
        var xmlElements, xmlElementsLen, textXpathValue, RGB, rValue, gValue, bValue;
        if(proof_type == "online"){
            var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression(textXpath);
            var xmlElementsLen = xmlElements.length; //Attributes total count
                 for(var i=0; i<xmlElementsLen; i++){
                        textXpathValue = xmlElements[i].xmlAttributes.itemByName("data-text-color").value; //Attributes value. 
                        RGB = textXpathValue.split(','); //Here with split input RGB color values.
                        rValue = parseInt(textXpathValue.split(',')[0]);
                        gValue = parseInt(textXpathValue.split(',')[1]);
                        bValue = parseInt(textXpathValue.split(',')[2]);
                        colrName = rValue+'-'+gValue+'-'+bValue;  //Here with create color nameing.
                        MakeColor(colrName, ColorSpace.RGB, ColorModel.process, [rValue, gValue, bValue], proof_type);
                        xmlElements[i].texts[0].fillColor = colrName; //applied for text color.
                     }
            var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression(cellXpath);
            var xmlElementsLen = xmlElements.length; //Attributes total count
                for(var j=0; j<xmlElementsLen; j++){
                        textXpathValue = xmlElements[j].xmlAttributes.itemByName("data-table-background-color").value; //Attributes value. 
                        RGB = textXpathValue.split(','); //Here with split input RGB color values.
                        rValue = parseInt(textXpathValue.split(',')[0]);
                        gValue = parseInt(textXpathValue.split(',')[1]);
                        bValue = parseInt(textXpathValue.split(',')[2]);
                        colrName = rValue+'-'+gValue+'-'+bValue;
                        MakeColor(colrName, ColorSpace.RGB, ColorModel.process, [rValue, gValue, bValue], proof_type);
                        xmlElements[j].cells[0].fillColor = colrName; //applied for cell background color.
                     }
                 }
        else if(proof_type == "print"){
            var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression(textXpath);
            var xmlElementsLen = xmlElements.length; //Attributes total count
                 for(var i=0; i<xmlElementsLen; i++){
                        textXpathValue = xmlElements[i].xmlAttributes.itemByName("data-text-color").value; //Attributes value. 
                        RGB = textXpathValue.split(','); //Here with split input RGB color values.
                        rValue = parseInt(textXpathValue.split(',')[0]);
                        gValue = parseInt(textXpathValue.split(',')[1]);
                        bValue = parseInt(textXpathValue.split(',')[2]);
                        colrName = rValue+'-'+gValue+'-'+bValue;  //Here with create color nameing.
                        MakeColor(colrName, ColorSpace.RGB, ColorModel.process, [rValue, gValue, bValue], proof_type);
                        xmlElements[i].texts[0].fillColor = colrName; //applied for text color.
                     }
            var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression(cellXpath);
            var xmlElementsLen = xmlElements.length; //Attributes total count
                for(var j=0; j<xmlElementsLen; j++){
                        textXpathValue = xmlElements[j].xmlAttributes.itemByName("data-table-background-color").value; //Attributes value. 
                        RGB = textXpathValue.split(','); //Here with split input RGB color values.
                        rValue = parseInt(textXpathValue.split(',')[0]);
                        gValue = parseInt(textXpathValue.split(',')[1]);
                        bValue = parseInt(textXpathValue.split(',')[2]);
                        colrName = rValue+'-'+gValue+'-'+bValue;
                        MakeColor(colrName, ColorSpace.RGB, ColorModel.process, [rValue, gValue, bValue], proof_type);
                        xmlElements[j].cells[0].fillColor = colrName; //applied for cell background color.
                     }
                 }
            function MakeColor(colorName, colorSpace, colorModel, colorValue, proof_type) { //Adding color values in the inDesign file.
                var doc = app.activeDocument;
                var color = doc.colors.item(colorName); //color name
                if (!color.isValid) {
                    color = doc.colors.add({name: colorName, space: colorSpace, model: colorModel, colorValue: colorValue});
                    if(proof_type == "print"){  //Importan: Here with applied for color mode CMYK or RGB based on the Template.
                    myDoc.colors.itemByName(colrName).properties = {space:ColorSpace.CMYK}; //RGB convert to CMYK mode.
                    }
                }
                return color;
            }
    }catch(e){};
}//Function End    

//=========================================================================
function _define_pdf_presets(pdf_type, crop_marks, bleed_marks, registration_marks, colour_bars, page_information, offset)
{
            if( (crop_marks) && (crop_marks.toString().match("true","i")) ){crop_marks = true}
            else{crop_marks = false}
            
            if( (bleed_marks) && (bleed_marks.toString().match("true","i")) ){bleed_marks = true}
            else{bleed_marks = false}
            
            if( (registration_marks) && (registration_marks.toString().match("true","i")) ){registration_marks = true}
            else{registration_marks = false}
            
            if( (colour_bars) && (colour_bars.toString().match("true","i")) ){colour_bars = true}
            else{colour_bars = false}
            
            if( (page_information) && (page_information.toString().match("true","i")) ){page_information = true}
            else{page_information = false}
            
            
            // Remove "PDF_PRESET", If exist.
            try
            {
                    app.pdfExportPresets.item("PDF_PRESET").remove();
            }
            catch(e){}
            
            // Create "PDF_PRESET" using '[High Quality Print]'.
            var high_quality_preset = app.pdfExportPresets.item('[High Quality Print]');  
            pdf_preset = high_quality_preset.duplicate();
            pdf_preset.name = "PDF_PRESET";

            // Assign pdf presets property values from parameters.
            with(pdf_preset)
            {
                        // General properties
                                    standardsCompliance = PDFXStandards.NONE;
                                    acrobatCompatibility = AcrobatCompatibility.ACROBAT_5;
                                    exportReaderSpreads = false;
                                    generateThumbnails = false, 
                                    optimizePDF = true
                                    includeStructure = false; // tagged pdf
                                    exportWhichLayers = ExportLayerOptions.EXPORT_VISIBLE_PRINTABLE_LAYERS;
                                    includeBookmarks = true;
                                    includeHyperlinks = true;
                                    interactiveElementsOption = InteractiveElementsOptions.APPEARANCE_ONLY;
                                    exportNonprintingObjects = false;
                                    exportGuidesAndGrids = false;
                         // Compression properties
                                    colorBitmapCompression = BitmapCompression.AUTO_COMPRESSION;
                                    colorBitmapQuality = CompressionQuality.MAXIMUM;
                                    colorBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;
                                    colorBitmapSamplingDPI = 300;
                                    thresholdToCompressColor = 450;
                                    grayscaleBitmapCompression = BitmapCompression.AUTO_COMPRESSION;
                                    grayscaleBitmapQuality = CompressionQuality.MAXIMUM;
                                    grayscaleBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;
                                    grayscaleBitmapSamplingDPI = 300;
                                    thresholdToCompressGray = 450;
                                    monochromeBitmapCompression = MonoBitmapCompression.CCIT4;
                                    monochromeBitmapSampling = Sampling.BICUBIC_DOWNSAMPLE;
                                    monochromeBitmapSamplingDPI = 1200;
                                    thresholdToCompressMonochrome = 1800;
                                    compressTextAndLineArt = true;
                                    cropImagesToFrames = true;
                         // Marks and Bleeds properties
                                      cropMarks = crop_marks;   
                                      bleedMarks = bleed_marks;
                                      registrationMarks = registration_marks;
                                      colorBars = colour_bars;
                                      pageInformationMarks = page_information;
                                      if(offset)
                                      {
                                                try
                                                {
                                                        pageMarksOffset = offset;
                                                }
                                                catch(e){}
                                      }
                                  //earlier by default we used to set default bleed setup would be document preference but it has been modified, if the document has bleed setup and config says proof request if for online (or not print) then bleed will be useDocumentBleedWithPDF = 'false'
                                    if(pdf_type.toString().match("(print)","i"))
                                    {
                                      useDocumentBleedWithPDF = true;
                                        }//end of IF
                                    else {
                                      useDocumentBleedWithPDF = false;
                                        }
                                      includeSlugWithPDF = false;
                         //Output properties
                                    /* Here using "[High Quality Print]" properties */
                         // Advanced properties
                                   subsetFontsBelow = 100;
                                   omitEPS = false;
                                   omitPDF = false;
                                   omitBitmaps = false;
            }
            with(app.interactivePDFExportPreferences) {  
                exportLayers = false;  
                exportReaderSpreads = false;  
                flipPages = false;  
                generateThumbnails = true;  
                includeStructure = false;  
                interactivePDFInteractiveElementsOption = InteractivePDFInteractiveElementsOptions.INCLUDE_ALL_MEDIA; //APPEARANCE_ONLY  
                pageRange = PageRange.ALL_PAGES;  
                pageTransitionOverride = PageTransitionOverrideOptions.FROM_DOCUMENT; 
                pdfJPEGQuality = PDFJPEGQualityOptions.MAXIMUM;  
                pdfMagnification = PdfMagnificationOptions.DEFAULT_VALUE;  
                pdfPageLayout = PageLayoutOptions.DEFAULT_VALUE; 
                pdfRasterCompression = PDFRasterCompressionOptions.AUTOMATIC_COMPRESSION; 
                rasterResolution = 300; 
            } 
                                                            
            // If pdf_type is online or web then relink the images from its web folder.
            if(pdf_type.toString().match("(print)","i"))
            {
                        //_relink();
                        //app.select(null);
            }
        
            return pdf_preset;
}  // end function




function _relink()
{
            doc = app.activeDocument;
            links = doc.links;
            var l=0;
            for(l=0;l<links.length;l++)
            {
                            var link = links[l];
                            var link_web_path = File(link.filePath.replace('\online','\print'));
//~                             var link_web_path = File(link.filePath).parent + "/print";
//~                             var link_name = link.name;
//~                             var relink_full_name = File(link_web_path + "/" + link_name);
                            
                            // Relink the images if file is exist.
                            if(File(link_web_path).exists)
                            {           try{
                                        link.relink(File(link_web_path));
                                        link.update();}
                                        catch(e){}
                            }
            }
} // end function

/*
            1. Apply character style for inline math
            2. Remove overlapping for inline math
*/

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
                                                //debuggerMSG(e.message);
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
                                                                                catch(e){//debuggerMSG(e.message)
                                                                                    }
                                                                    }
                                                            }
                                                            catch(e){//debuggerMSG(e.message)
                                                                }
                                                        
                                                            try
                                                            {
                                                                        var curr_eps_tag_name = curr_eps.associatedXMLElement.markupTag.name;
                                                            }
                                                            catch(e){
                                                                //debuggerMSG(e.messgae)
                                                                }
                                                            
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
                                                                        catch(e){
                                                                            //debuggerMSG(e.message)
                                                                            }
                                                           }

                                                   }
                                        }
                            }
                            //app.select(null);
                }
}
//=========================================================================
//=========Footnote placer====================
function footNotePlacer(){

var myDoc = app.activeDocument;
    var tFrames = myDoc.pageItems;
    var tFramesLen = tFrames.length;
    for (var f = 0; f < tFramesLen; f ++){
        var fLabel = tFrames[f].label;
        if (fLabel == 'FIRST_FRAME'){
            firstFrame = tFrames[f];
            f = tFramesLen;
            }
        }

var label=0, label2=0;
var tempXpath = [], tempCount = 0; 
var fnCitations = GetXpathElement ("//span[@class='jrnlFNRef']");
if (fnCitations!=""){
    var fnCitationsLength = fnCitations.length;
    for (var fn=0; fn<fnCitationsLength; fn++){
    var insideTable = fnCitations[fn].texts[0].parent instanceof Cell;
        if (!insideTable){
//~             ResolveOverset(myDoc)
            if(fnCitations[fn].xmlAttributes.item("data-rid").isValid){
                var idValue = fnCitations[fn].xmlAttributes.item("data-rid").value;
                var footNoteElement = GetXpathElement ("//div[@id = \'"+idValue+"\']");
                if (footNoteElement!=""){
                    footNoteElement[0].texts[0].appliedParagraphStyle = doc.paragraphStyles.item("jrnlFootNotePara");
                    fnCitations[fn].texts[0].contents="";     
                    var fnObj = fnCitations[fn].texts[0].insertionPoints[0].footnotes.add();
                    footNoteElement[0].texts[0].move(LocationOptions.AT_END, fnObj.insertionPoints.item(-1))
                    }//End of if 
                else{
                    //logFile.writeln("Footnote Number"+fnCitations[fn].texts[0].contents+ " is missing");
                    }
                }//end of IF
            }//End of if not inside Table
        else {
//~             ResolveOverset(myDoc)
//~             var idValue = fnCitations[fn].xmlAttributes.item("data_fid").value;
//~             var footNoteElement = GetXpathElement ("//jrnlFootNote[@id = \'"+idValue+"\']");
//~             if (footNoteElement!=""){
//~                 footNoteElement[0].texts[0].select(SelectionOptions.replaceWith);
//~                 app.cut();
//~                 var myCell = fnCitations[fn].texts[0].parent;
//~                 var myTable = myCell.parent;
//~                 var prevPara = myTable.storyOffset.paragraphs.previousItem(myTable.storyOffset.paragraphs[-1]); 
//~                 var prevParaTbl = prevPara.parent.tables[0];                    
//~                 var indexLess;
//~                 //checking again previous paragraph contains table
//~                 if (prevParaTbl.isValid){
//~                     indexLess = 3
//~                     }//end of IF
//~                 else {
//~                     indexLess = 1
//~                     }
//~                 //moving insertion point after the table
//~                 var tfn = myTable.storyOffset.parentStory.insertionPoints[myTable.storyOffset.index-indexLess].footnotes.add({contents:"footnotetext"});
//~                 var fnReference = myTable.storyOffset.parentStory.characters[tfn.storyOffset.index];
//~                 fnReference.fillColor = "None";
//~                 tfn.texts[0].select(SelectionOptions.replaceWith);
//~                 app.paste();
//~                 }//End of if footNoteElement is not empty
//~             else{
//~                 //logFile.writeln("Footnote Number"+fnCitations[fn].texts[0].contents+ " is missing");
//~                 }
            }//End of else
        }//end of fn for loop
    }//end of if fnCitaion not equal to empty
//For Log reporting only
var missedFN = GetXpathElement ("//fn/label");
if (missedFN!=""){
    var missedFNLength = missedFN.length;
    for (var f=0; f<missedFNLength; f++){
        var fnLabelString = missedFN[f].parent.xmlAttributes.item('id').value;
        //logFile.writeln("No Citaion Found for Footnote id: "+fnLabelString);
        }
    }
//logFile.writeln("---------------------------------------------------------------");
//logFile.close(); 
//Delete ExtraEntermarks
var clearEnters = GetXpathElement ("//back/notes");
if (clearEnters!=""){
    var clearEntersLength = clearEnters.length;
    myResetFindChangeGrep();
    app.findGrepPreferences.findWhat = "^\\s+";
    app.changeGrepPreferences.changeTo = "";
    for (var cl=0; cl<clearEntersLength; cl++){
        clearEnters[cl].insertTextAsContent("\r", XMLElementPosition.AFTER_ELEMENT);
        var extraEnters = clearEnters[cl].texts[0];
        extraEnters.changeGrep();
        }
    myResetFindChangeGrep();
    }
//alert ("Your footnotes has been sucessfully placed.\n\nCopyright © 2011, Exeter Premedia Inc.");
//--------------------------------------------------------------------
function myResetFindChangeGrep(){
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
    }
//For getting xpath elements
function GetXpathElement(FindXpath){
	var myRuleSet = new Array (new XpathElement(FindXpath));
		with(myDoc){
			var elements = xmlElements;
			__processRuleSet(elements.item(0), myRuleSet);
		}
	var temp = tempXpath;
	tempCount = 0;
	tempXpath = [];
	return temp;
	}
function XpathElement(myXpath){
    this.name = "XpathElement";
    this.xpath = myXpath;
    this.apply = function(myElement, myRuleProcessor){
		tempXpath[tempCount++] = myElement;
		}
	}
}
        function MapCharStyle(myXPath){
            this.name = "MapCharStyle";
            this.xpath = myXPath;
            this.apply = function(myElement, myRuleProcessor){
                var myText = myElement.texts[0]
                myxml[label++] = myElement;
                }
            return true;
        }

        function passValueToMap(XPATH){
            var myRuleSet = new Array (new MapCharStyle(XPATH));
            with(myDoc)
                {
                var elements = xmlElements;
                __processRuleSet(elements.item(0), myRuleSet);
                }//end with
            }//End of function

        function ruleProcessorObject(ruleSet, ruleProcessor) {
           this.ruleSet = ruleSet;
           this.ruleProcessor = ruleProcessor;
        }

        function __makeRuleProcessor(ruleSet, prefixMappingTable){
            // Get the condition paths of all the rules.
            var pathArray = new Array();
            for (i=0; i<ruleSet.length; i++)
            {
                 pathArray.push(ruleSet[i].xpath);
            }

            // the following call can throw an exception, in which case 
            // no rules are processed  
            try{
                var ruleProcessor = app.xmlRuleProcessors.add(pathArray, prefixMappingTable);
            }
            catch(e){
                throw e;
            }
            var rProcessor =  new ruleProcessorObject(ruleSet, ruleProcessor);
            return rProcessor;
        }

        function __deleteRuleProcessor(rProcessor) {
            // remove the XMLRuleProcessor object
            rProcessor.ruleProcessor.remove();
            
            // delete the object properties
            delete rProcessor.ruleProcessor;
            delete rProcessor.ruleSet;
            
            // delete the object itself
            delete	rProcessor;
        }

        function __processRuleSet (root, ruleSet, prefixMappingTable)
        {
                var mainRProcessor = __makeRuleProcessor(ruleSet, prefixMappingTable);

                // if __processTree() fails with an exception, 
                // delete ruleProcessor and throw e
                try {
                    __processTree(root, mainRProcessor);
                    __deleteRuleProcessor(mainRProcessor);
                } catch (e) {
                    __deleteRuleProcessor(mainRProcessor);
                    throw e;
                }
        }

        function __processTree (root, rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            try
            {
                var matchData = ruleProcessor.startProcessingRuleSet(root);
                __processMatchData(matchData, rProcessor);
                         
                ruleProcessor.endProcessingRuleSet();
            }
            catch (e)
            {
                // no longer deleting ruleProcessor within __processTree
                // deletion occurs either in __processRuleSet, or external
                // to glue code.
                ruleProcessor.endProcessingRuleSet();
                throw e;
            }
         }

        function __processChildren(rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            try
            {
                var matchData = ruleProcessor.startProcessingSubtree();
                __processMatchData(matchData, rProcessor);
            }
            catch (e)
            {
                ruleProcessor.halt();
                throw e;
            }
        }

        function __processMatchData(matchData, rProcessor)
        {
            var ruleProcessor = rProcessor.ruleProcessor; 
            var ruleSet = rProcessor.ruleSet;
            while (matchData != undefined)
            {
                var element = matchData.element;
                var matchRules = matchData.matchRules;
                var applyMatchedRules = true;

                // apply the action of the rule. 
                // Continue applying rules as long as the apply function returns false.
                for (var i=0; i<matchRules.length && applyMatchedRules && !ruleProcessor.halted; i++)
                {
                    applyMatchedRules = (false == ruleSet[matchRules[i]].apply(element, rProcessor));
                }
                matchData = ruleProcessor.findNextMatch();
            }
        }

        function __skipChildren(rProcessor)
        {
            rProcessor.ruleProcessor.skipChildren();
        }

//relinking the template logos from the logos ffolder based on its proof type
function _relinkLogos(layerTemplateScript,proof_type)
{
            doc = app.activeDocument;
            var logosPath = layerTemplateScript.replace(/scripts/, 'logos') + "\\" + proof_type + "\\";
            links = doc.links;
            var l=0;
            for(l=0;l<links.length;l++)
            {
                            var link = links[l];
                            var linkName = links[l].name;
                            var link_web_path = logosPath + linkName;
                            if(File(link_web_path).exists)
                            {           try{
                                        link.relink(File(link_web_path));
                                        link.update();}
                                        catch(e){}
                            }
            }
} // end function
//===============End footnote placer=========================
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

//reducing font sizes as required by user
/*
    Functionality: Will reduce the font for the node passed as param
    Name: Augustine K
    Date: 01-Aug-2017
    */
function reduceFontSizes(reduceFontXpaths){
    var inputXpaths = reduceFontXpaths;
    inputXpaths = inputXpaths.split(',');
    var inputXpathsLen = inputXpaths.length;
    for (var xp = 0; xp < inputXpathsLen; xp ++){
        var currXpath = inputXpaths[xp];
        var fontSizesToBeReduced = app.activeDocument.xmlElements[0].evaluateXPathExpression(currXpath);
        var fontSizesToBeReducedLen = fontSizesToBeReduced.length;
        for (var fs = 0; fs < fontSizesToBeReducedLen; fs ++){
            var currPara = fontSizesToBeReduced[fs].paragraphs[0];
            var reduceFontSizeTo = fontSizesToBeReduced[fs].xmlAttributes.itemByName("reduceFont").value;
            if (reduceFontSizeTo != ''){
                currPara.pointSize = reduceFontSizeTo;
                currPara.leading = Leading.AUTO;
                }
            }//end of  FOR loop
        }//end of FOR loop
    }//end of reduceFontSizes

// Heading: Inline Table pstyle span value change for it respective para
// Script for InDesign CS6, Version-8.0
// Script Version No: 1.0.
// Developed by: S.Karthik, Exeter Premedia.
// Last Modification Date: 02-Aug-2017;
// Script Description:  1. inline table paragraph style span option change to "Single Column" to "Span column"
//                                    
// ***************************************************************************************** ****************

function  inlineTablePstyleSpanChange(inlineTableXpath){
        var myDoc = app.activeDocument;
            var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression(inlineTableXpath);
            var xmlElementsLen = xmlElements.length; //Attributes total count
                 for(var i=0; i<xmlElementsLen; i++){
                        var inlineTableXpathValue = xmlElements[i].xmlAttributes.itemByName("data-p-span").isValid; //Attributes value. 
                        var inineTblPstyle = xmlElements[i].parent.paragraphs[0].appliedParagraphStyle;
                        var inineTblPstyleName = xmlElements[i].parent.paragraphs[0].appliedParagraphStyle.name; // paragraph style name
                            if(inlineTableXpathValue && inineTblPstyleName == "TBL_INLINE"){
                                inineTblPstyle.spanColumnType = SpanColumnTypeOptions.SPAN_COLUMNS; // here with change sapn value
                                inineTblPstyle.spanSplitColumnCount = SpanColumnCountOptions.ALL;            // column spilt change
                            }
                }
}
// ***************************************************************************************** ****************
// Heading: Applied Table StrokeType and StrokeWeight
// Script for InDesign CS6, Version-8.0
// Script Version No: 1.0.
// Developed by: S.Karthik, Exeter Premedia.
// Last Modification Date: 03-Aug-2017;
// Script Description:  1. In table rule what i need change to StrokeType and StrokeWeight
//                                    
// ***************************************************************************************** ****************

function applyTableBorderStyle(strokeType, strokeWeight){
    var myDoc = app.activeDocument;
    var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression("//Cell[@data-border-top]");
    var xmlElementsLen = xmlElements.length; //Attributes total count
    for(var j=0; j<xmlElementsLen; j++){
            var currCell = xmlElements[j].cells[0];
            currCell.topEdgeStrokeType = strokeType;
            currCell.topEdgeStrokeWeight = strokeWeight;
        }
    var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression("//Cell[@data-border-bottom]");
    var xmlElementsLen = xmlElements.length; //Attributes total count
    for(var j=0; j<xmlElementsLen; j++){
            var currCell = xmlElements[j].cells[0];
            currCell.bottomEdgeStrokeType = strokeType;
            currCell.bottomEdgeStrokeWeight = strokeWeight;
        }
    var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression("//Cell[@data-border-left]");
    var xmlElementsLen = xmlElements.length; //Attributes total count
    for(var j=0; j<xmlElementsLen; j++){
            var currCell = xmlElements[j].cells[0];
            currCell.leftEdgeStrokeType = strokeType;
            currCell.leftEdgeStrokeWeight = strokeWeight;
        }
    var xmlElements = myDoc.xmlElements[0].evaluateXPathExpression("//Cell[@data-border-right]");
    var xmlElementsLen = xmlElements.length; //Attributes total count
    for(var j=0; j<xmlElementsLen; j++){
            var currCell = xmlElements[j].cells[0];
            currCell.rightEdgeStrokeType = strokeType;
            currCell.rightEdgeStrokeWeight = strokeWeight;
        }
    }

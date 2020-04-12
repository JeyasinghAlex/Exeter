/*alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsBoxedText|jrnlAbsHead|jrnlAbsPara|jrnlHead1_First|TXT_CHAP_FIRST', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrAff']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
stackStubFrames();
stackFramesOverLap('METAINFO,COPYRIGHTSTMT_INFO,CROSSMARK,RELATED_ARTICLE_INFO,STUB_STMT,STUB_COLUMN');
placeComBoxLib("//div[@class='jrnlAbsBox']", layerTemplateScript, 'placeLibInline');
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
removeOpenDataLogo("//div[@class='jrnlOpenDataInfo']");
addSpBeforePara('jrnlCorrNoticeFN,jrnlHandlingEditorFN,jrnlSocialFN,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlAuthorNoteFN,jrnlLicense,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();*/
moveBlockToColumnBottom(240, "//div[@class='jrnlFNTxtBlock']", 'TXT_FN');
splitFramesIntoTwo("//p[@pstyle='jrnlKwdGroup']");
adjustHeightOflineforAbsGrp_ASME("//div[@class='jrnlAbsKeyBlock']","//div[@class='jrnlAuthors']");
alignVerticalFIRST_FRAME_CHANGED();
alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsBoxedText|jrnlAbsHead|jrnlAbsPara|jrnlHead1_First|jrnlHead1|TXT_CHAP_FIRST', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrAff']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
modifyTextwrapMetaInfoFrame();
stackStubFrames();
//stackFramesOverLap('METAINFO,COPYRIGHTSTMT_INFO,CROSSMARK,RELATED_ARTICLE_INFO,STUB_STMT,STUB_COLUMN');
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']");
placeComBoxLib("//div[@class='jrnlAbsBox']", layerTemplateScript, 'placeLibInline');
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
addSpBeforePara('jrnlPresentAddrFN,jrnlCorrNoticeFN,jrnlSocialFN,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlLicense,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
adjustOverlapFrame('BMJ_RMD_LOGO,STUB_COLUMN')
dublin_core_metadata();
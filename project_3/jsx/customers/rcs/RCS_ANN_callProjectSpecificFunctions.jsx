alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsBoxedText|jrnlAbsHead|jrnlAbsPara|jrnlHead1_First|TXT_CHAP_FIRST', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrAff']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
stackStubFrames();
stackFramesOverLap('METAINFO,CROSSMARK,RELATED_ARTICLE_INFO,STUB_STMT,STUB_COLUMN');
//splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']");
placeComBoxLib("//div[@class='jrnlAbsBox']", layerTemplateScript, 'placeLibInline');
_web_links("CrossMark.eps|BMJ_BJSM_OPEN_ACCESS_BW.eps","//span[@class='jrnlDOI']")
addSpBeforePara('jrnlAckGroup,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlEthicsFN,jrnlLicense,jrnlCorrNoticeFN,jrnlCopyrightStmt', 12);

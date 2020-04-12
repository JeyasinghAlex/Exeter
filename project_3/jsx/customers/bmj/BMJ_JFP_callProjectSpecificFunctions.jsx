alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsHead|jrnlAbsPara|jrnlHead1_First|BRWYOFWG_jrnlHead1_First|TXT_CHAP_FIRST|jrnlAuthors|QUOTE-O', 'ascent');
//~ moveNodesOnFrmToIntext('METAINFO', 'STUB_COLUMN', 'before', 'jrnlAffGroup', "//div[@class='back']", 'Author affiliations\r', 'jrnlAffHead', 'For numbered affiliations see end of article.\r', 'jrnlAff');
stackStubFrames();
stackFramesOverLap('METAINFO,COPYRIGHTSTMT_INFO,CROSSMARK,RELATED_ARTICLE_INFO,STUB_STMT,STUB_COLUMN');
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='BRWYOFWG_jrnlAuthors']|//p[@pstyle='RESEARCH_jrnlAuthors']|//p[@pstyle='REVIEW_jrnlAuthors']");
moveBlockToColumnBottom(162.092, "//div[@class='jrnlFNTxtBlock']", 'TXT_FN');
placePhotos("//div[@class='body']", "//pFig[@class='ED_IMG']");
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
addSpBeforePara('jrnlSocialFN,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlLicense,jrnlCorrNoticeFN,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman",'"',"ClassGarmnd BT","Roman",'"');
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","'","ClassGarmnd BT","Roman","'");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();


﻿stackFramesOverLap('METAINFO,COPYRIGHTSTMT_INFO,CROSSMARK,RELATED_ARTICLE_INFO,STUB_STMT,STUB_COLUMN');
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='PERSPECTIVE_jrnlAuthors']");
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
placeComBoxLib("//div[@class='jrnlAbsBox']", layerTemplateScript, 'placeLibInline');
alignStubFramesToAbsHead(myDoc, 'STUB_DOI', 'jrnlHead1_First|TXT_CHAP_FIRST|jrnlAbsHead|jrnlAuthors|jrnlAbsPara|PERSPECTIVE_jrnlHead1_First', 'ascent');
stackStubFrames();
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");
placeInlineFigureParentParaTopLeft_or_Right("//matchEqn[@cstyle='FIG_INLINE_TEXT'][not(child::box-inline-fig[@cstyle='ORCID_IMAGE'])] | //pFig[@data-fig-inline='right']");
addSpBeforePara('jrnlPresentAddrFN,jrnlSocialFN1,jrnlAckGroup,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlLicense,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();
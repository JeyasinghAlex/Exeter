alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsBoxedText|jrnlAbsHead|jrnlAbsPara|jrnlHead1_First|TXT_CHAP_FIRST', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrAff']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
stackStubFrames();
//splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']");
placeComBoxLib("//div[@class='jrnlAbsBox']", layerTemplateScript, 'placeLibInline');
addSpBeforePara('jrnlSocialFN1,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlLicense,jrnlCorrNoticeFN,jrnlCopyrightStmt', 12);

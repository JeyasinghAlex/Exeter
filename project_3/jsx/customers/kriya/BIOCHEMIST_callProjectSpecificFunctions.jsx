alignStubFramesToAbsHeadBiochemist(myDoc, 'STUB_COLUMN_VERSO|STUB_COLUMN_RECTO', 'jrnlAbsHead|jrnlAbsPara|jrnlAbsParaLast|jrnlAbsParaFirst|jrnlHead1_First|TXT_CHAP_FIRST', 'ascent');
splitFramesIntoTwo("//p[@pstyle='jrnlArtTitle']");
placePhotos("//div[@class='body']", "//pFig[@class='ED_IMG']");
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");

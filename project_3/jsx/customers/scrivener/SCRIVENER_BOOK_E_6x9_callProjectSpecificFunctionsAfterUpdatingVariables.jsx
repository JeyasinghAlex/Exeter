addVersoBlankPageAtEND();
//replaceFpageLpageValue();
convertGrapicToPrintVersion(proof_type);
replaceFpageLpageValue("//span[@class='jrnlFPage']", "–", "//span[@class='jrnlLPage']");
//replaceLpageValueInToCite(":", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlLPage']");
//replaceLpageValueInToCite(":", "//*[@pstyle='jrnlToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlToCite']//span[@class='jrnlLPage']");

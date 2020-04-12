convertGrapicToPrintVersion(proof_type);
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlLPage']","F");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlToCite']//span[@class='jrnlLPage']","F");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlCLRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlCLRH']//span[@class='jrnlLPage']","F");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlCRRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlCRRH']//span[@class='jrnlLPage']","F");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlLRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlLRH']//span[@class='jrnlLPage']","F");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlRRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlRRH']//span[@class='jrnlLPage']","F");
calcParaNFloatBounds();

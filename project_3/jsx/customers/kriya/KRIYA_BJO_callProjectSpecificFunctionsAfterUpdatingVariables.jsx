convertGrapicToPrintVersion(proof_type);
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlToCite']//span[@class='jrnlLPage']");
queriesPagesWithQueryNumANchor(currDocInPrg,"//floatBlock//div[@class='jrnlQueryBlock']", "//div[@doi]", "doi");
colorstamp();
calcParaNFloatBounds();

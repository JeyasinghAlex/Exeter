addVersoBlankPageAtEND();
convertGrapicToPrintVersion(proof_type);
replaceFpageLpageValue("//span[@class='jrnlFPage']", "–", "//span[@class='jrnlLPage']");
queriesPagesWithQueryNumANchor(currDocInPrg,"//floatBlock//div[@class='jrnlQueryBlock']", "//div[@doi]", "doi");
calcParaNFloatBounds();
removeRunningHeaderLandscapePage();

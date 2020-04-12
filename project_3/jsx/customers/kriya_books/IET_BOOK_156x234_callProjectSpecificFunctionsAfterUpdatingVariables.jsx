addVersoBlankPageAtEND();
convertGrapicToPrintVersion(proof_type);
replaceFpageLpageValue("//span[@class='jrnlFPage']", "–", "//span[@class='jrnlLPage']");
calcParaNFloatBounds();

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="cmsID"/>
	<xsl:param name="pageType"/>
    <xsl:param name="fpage"/>
    <xsl:output method="xml" indent="no"/>
    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="*[@*[contains(., 'Punc')]]|*[@*[contains(., removeString)]]">
        <xsl:variable name="class" select="./@class"/>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:choose>
                    <xsl:when test="@class='jrnlOnBehalfOf'">
                        <xsl:choose>
                            <xsl:when test="(../*[@class='jrnlOnBehalfOf'])[1] is ."/>
                            <xsl:otherwise>
                                <xsl:value-of select="./@startPunc"/>
                                <xsl:text> </xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@startPunc"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
            <xsl:choose>
                <xsl:when test="@class='jrnlAuthor'">
                    <xsl:choose>
                        <xsl:when test="../position() eq count(../*[@class='jrnlAuthorGroup'])-1">
                            <xsl:value-of select="./@penultimatePunc"/>
                        </xsl:when>
                        <xsl:when test="../following-sibling::*[@class='jrnlAuthorGroup']">
                            <xsl:choose>
                                <xsl:when test="($journal='rrpe' or $journal='usw' or $journal='jfcp') and count(//p[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup']) eq 2">
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="./@interPunc"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test="../following-sibling::*[@class='jrnlOnBehalfOf']">
                                <xsl:value-of select="../following-sibling::*[@class='jrnlOnBehalfOf'][1]/@startPunc"/>
                            </xsl:if>
                            <xsl:if test="@endPunc">
                                <xsl:value-of select="./@endPunc"/>
                            </xsl:if>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
						<xsl:when test="position() eq count(../*[@class=$class])-1">
							<xsl:if test="count(../*[@class=$class]) &gt; 2">
								<xsl:if test="@serialCommaPunc">
								<xsl:value-of select="./@serialCommaPunc"/>
								</xsl:if>
							</xsl:if>
							<xsl:value-of select="./@penultimatePunc"/>
						</xsl:when>
                        <xsl:when test="following-sibling::*[@class=$class]">
                            <xsl:value-of select="./@interPunc"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test="@endPunc">
                                <xsl:value-of select="./@endPunc"/>
                            </xsl:if>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <!--<xsl:template match="//div[@class='front']//*[@class='jrnlCopyrightStmt']" priority="5">
        <span class="jrnlCopyrightStmt">
            <xsl:apply-templates select=" @* "/>
            <xsl:text>. </xsl:text>
            <xsl:apply-templates/>
        </span>
    </xsl:template> -->
     <!-- moving all pull and margin quote to the floatblock if cn pull quote is margin-->
    <xsl:template match="//div[@type='main']" priority="5">
         <div type="main">
           <xsl:choose>
                <xsl:when test="$journal='jpe'">
                   <xsl:apply-templates select="@*"/>
                        <xsl:for-each select="//*[@class='jrnlBlockQuote'and @data-type='pull-quote']">
                            <xsl:variable name="pid" select="concat('BLK_BXQ',position())"/>
                            <div class="floatBlock" id="{$pid}" data-stream-name="{concat('a_BXQ',position())}" data-id="{concat('BXQ',position())}">
                                <div class="jrnlPullQuoteBlock" id="{$pid}" data-id="{concat('BXQ',position())}" data-stream-name="{concat('a_BXQ',position())}" type="Quote">
                                    <p class="jrnlPullQuoteBlock">
                                        <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                    </p>
                                </div>
                            </div>
                        </xsl:for-each>
                         <xsl:for-each select="//*[@class='jrnlBlockQuote'and @data-type='margin']">
                            <xsl:variable name="pid" select="concat('BLK_BXMQ',position())"/>
                            <div class="floatBlock" id="{$pid}" data-stream-name="{concat('a_BXMQ',position())}" data-id="{concat('BXMQ',position())}">
                                <div class="jrnlMarginBlock" id="{$pid}" data-id="{concat('BXMQ',position())}" data-stream-name="{concat('a_BXMQ',position())}" type="Quote">
                                    <p class="jrnlMarginBlock">
                                        <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                    </p>
                                </div>
                            </div>
                        </xsl:for-each>
                    <xsl:apply-templates select="node()"/>
                </xsl:when>
				<xsl:when test="$journal='cn' or $journal='cl'">
						<xsl:if test="$journal='cn'">
							   <xsl:apply-templates select="@*"/>
									<xsl:for-each select="//*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
										<xsl:variable name="pid" select="concat('BLK_BXQ',position())"/>
										<div class="floatBlock" id="{$pid}" data-stream-name="{concat('a_BXQ',position())}" data-id="{concat('BXQ',position())}">
											<div class="jrnlMarginBlock" id="{$pid}" data-id="{concat('BXQ',position())}" data-stream-name="{concat('a_BXQ',position())}" type="Quote">
												<p class="jrnlMarginBlock">
													<xsl:apply-templates select="@*[name()!='class']|node()"/>
												</p>
											</div>
										</div>
									</xsl:for-each>
						 </xsl:if>
								 <xsl:for-each select="//*[@class='jrnlBio']">
								   <div class="floatBlock">
										  <div class="jrnlEditorImgBlock">
											<xsl:variable name="biography" select=".//*[@class='jrnlBiography']/node()"/>
											<xsl:choose>
												<xsl:when test=".//*[@class='jrnlFigBlock']">
													<img class="">
														<xsl:attribute name="src">
															<xsl:value-of select="./*[@class='jrnlFigBlock']//img/@src"/>
														</xsl:attribute>
														<xsl:attribute name="alt">
															<xsl:value-of select="./*[@class='jrnlFigBlock']//img/@alt"/>
														</xsl:attribute>
													</img>
												</xsl:when>
												<xsl:when test=".//img[not(parent::p[@class='jrnlBiography'])]">
												   <img class="">
														<xsl:attribute name="src">
															<xsl:value-of select=".//img/@src"/>
														</xsl:attribute>
														<xsl:attribute name="alt">
															<xsl:value-of select=".//img/@alt"/>
														</xsl:attribute>
													</img>
												</xsl:when>
												<xsl:otherwise>
												</xsl:otherwise>
											</xsl:choose>
										<xsl:if test="$biography !=''">
											<p class="jrnlEditorImgCaption">
												<xsl:apply-templates select="$biography"/>
											</p>
										</xsl:if>
								  </div>
								  </div>
								 </xsl:for-each>
								 <xsl:for-each select="//*[@class='jrnlWebBoxBlock']">
								   <div class="floatBlock">
										<xsl:element name="{./name()}">
										    <xsl:apply-templates select="@*|node()"/>
                                         </xsl:element>
								  </div>
								 </xsl:for-each>
								<xsl:apply-templates select="node()"/>
					 </xsl:when>
					 <xsl:otherwise>
						<xsl:apply-templates select="@*|node()"/>
                     </xsl:otherwise>
            </xsl:choose>
        </div>
     </xsl:template>
<!-- Removing  jrnlBlockQuote from body part -->
    <xsl:template match="//*[@class='body']//*[@class='jrnlBlockQuote' and @data-type='pull-quote']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='jpe' or $journal='cn'"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
         </xsl:choose>
    </xsl:template> 
     <xsl:template match="//*[@class='body']//*[@class='jrnlBlockQuote' and @data-type='margin']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='jpe' or $journal='cn'"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
         </xsl:choose>
    </xsl:template> 
    <!-- citation for blockQuote-->
     <!--<xsl:template match="//*[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[1][@class='jrnlBlockQuote']]" priority="7">
    <xsl:choose>
            <xsl:when test="$journal='jpe'">
                <xsl:variable name="c" select="count(//*[@class='body']//*[./following-sibling::*[1][@class='jrnlBlockQuote']])"/>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="node()"/>
                    <xsl:variable name="blockId" select="count(following-sibling::*[@class='jrnlBlockQuote'][1]/preceding-sibling::*[@class='jrnlBlockQuote']) + 1"/>
                    <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>    
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
<xsl:template match="//*[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote']][1]" priority="8">
     <xsl:choose>
            <xsl:when test="$journal='jpe'">
                <xsl:variable name="c" select="count(//*[@class='body']//*[./following-sibling::*[1][@class='jrnlBlockQuote']])"/>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="node()"/>
                    <xsl:variable name="blockId" select="count(following-sibling::*[@class='jrnlBlockQuote'][1]/preceding-sibling::*[@class='jrnlBlockQuote']) + 1"/>
                    <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
                </xsl:element>
             </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> -->
    
     <!-- citation for blockQuote-->
    <xsl:template match="div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote'][not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])]] | div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin'][not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])]]" priority="7">
         <xsl:choose>
            <xsl:when test="$journal='jpe' or $journal='cn'">
            <xsl:element name="{name(.)}">
                <xsl:apply-templates select="@*|node()"/>
                <xsl:choose>
                    <xsl:when test="not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])"> 
                      <xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
                           <xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='pull-quote']) + 1"/>
                          <!--   <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/> -->
                            <xsl:choose>
									<xsl:when test="$journal='cn'">
									  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$blockId)}"/>
									</xsl:when>
									<xsl:otherwise>
										<span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
									</xsl:otherwise>
							</xsl:choose>
                        </xsl:for-each>
                         <xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']">
                           <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='margin']) + 1"/>
                          <!--   <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/> -->
                           <xsl:apply-templates select="@*|node()"/>
                             <xsl:choose>
									<xsl:when test="$journal='cn'">
									  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$mblockId)}"/>
									</xsl:when>
									<xsl:otherwise>
										<span class="jrnlFirstCitation" data-rid="{concat('BXMQ',$mblockId)}"/>
									</xsl:otherwise>
							</xsl:choose>
                        </xsl:for-each>
                     </xsl:when> 
                </xsl:choose>
            </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
            </xsl:choose>
	</xsl:template>
    <xsl:template match="div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']]|//div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']]" priority="7"><!--|div[@class='body']/*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']]-->
    <xsl:element name="{name(.)}">
        <xsl:apply-templates select="@*|node()"/>
        <xsl:choose>
			<xsl:when test="$journal='jpe' or $journal='cn' ">
				<xsl:variable name="current" select="generate-id(.)"/>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
				<xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='pull-quote']) + 1"/>
					<xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
						<xsl:choose>
							<xsl:when test="$journal='cn'">
							  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:when>
							<xsl:otherwise>
								<span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:for-each>
				<xsl:for-each select="./preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
				<xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='pull-quote']) + 1"/>
					<xsl:if test="not(./preceding-sibling::*[@class]) and $current = generate-id(./following-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])"> 
						<xsl:choose>
							<xsl:when test="$journal='cn'">
							  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:when>
							<xsl:otherwise>
								<span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:for-each>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote'and @data-type='margin']">
				   <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='margin']) + 1"/>
				   <xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
				  <!--   <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/> -->
					 <xsl:choose>
							<xsl:when test="$journal='cn'">
							  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$mblockId)}"/>
							</xsl:when>
							<xsl:otherwise>
								<span class="jrnlFirstCitationMN" data-rid="{concat('BXMQ',$mblockId)}"/>
							</xsl:otherwise>
					</xsl:choose>
					</xsl:if>
				</xsl:for-each>
				<xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']">
                   <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='margin']) + 1"/>
                   <xsl:if test="not(./preceding-sibling::*[@class]) and $current = generate-id(./following-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])"> 
                        <xsl:choose>
							<xsl:when test="$journal='cn'">
							  <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$mblockId)}"/>
							</xsl:when>
							<xsl:otherwise>
								<span class="jrnlFirstCitationMN" data-rid="{concat('BXMQ',$mblockId)}"/>
							</xsl:otherwise>
					    </xsl:choose>
					</xsl:if>
			    </xsl:for-each>
			</xsl:when>
        </xsl:choose>
    </xsl:element>
</xsl:template>
   <!-- change class name changed for class box jrnlFirstCitationMN -->
    <xsl:template match="span[starts-with(@data-rid, 'BX') and @class='jrnlFirstCitation']" priority="6">
        <xsl:choose>
            <xsl:when test="$journal='jpe'">
                <xsl:element name="{./name()}">
                  <xsl:attribute name="class" select="'jrnlFirstCitationMN'"/>
                  <xsl:apply-templates select="@*[name()!='class']|node()"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
				<xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
		</xsl:choose>
    </xsl:template>
    <xsl:template match="//div[@class='front']//*[@class='jrnlCopyrightHolder']" priority="5">
        <span class="jrnlCopyrightHolder">
            <xsl:apply-templates select=" @* "/>
            <xsl:text> by the </xsl:text>
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='front']//*[@class='jrnlLicense']" priority="5">
        <span class="jrnlLicense">
            <xsl:apply-templates select=" @* "/>
            <xsl:text>. </xsl:text>
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="p[@class='jrnlSecPara']" priority="5">
        <p class="jrnlSecPara">
            <xsl:apply-templates select="@*[name()!='class']|node()"/>
        </p>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlAboutTheAuthorsTitle']" priority="5">
        <xsl:variable name="count1" select="count(//*[@class='jrnlBiography'])"/>
        <xsl:choose>
            <xsl:when test="$count1 &gt; 1">
                <p class="jrnlAboutTheAuthorsTitle" removeifempty="true">About the Authors</p>
            </xsl:when>
            <xsl:otherwise>
                <p class="jrnlAboutTheAuthorsTitle" removeifempty="true">About the Author</p>
            </xsl:otherwise>
        </xsl:choose>
	</xsl:template>
   <!-- <xsl:template match="//div[@class='WordSection1']" priority="5">
        <div class="WordSection1" style="page: WordSection1;" id="contentDivNode" cmsID="{$cmsID}">
            <xsl:for-each select="//*[@class='jrnlFigBlock'][name((ancestor::*[@class='jrnlFigBlockGroup'])[last()]) = '']|//*[@class='jrnlVidBlock']|//*[@class='jrnlTblBlock'][name((ancestor::*[@class='jrnlTblBlockGroup'])[last()]) = '']|//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|//*[@class='jrnlFigBlockGroup']|//*[@class='jrnlTblBlockGroup']|//*[@class='jrnlBoxBlockGroup']">
                <div class="floatBlock">
                    <xsl:apply-templates select="@*[name()!='class']"/>
                    <xsl:apply-templates select="."/>
                </div>
            </xsl:for-each>
            <xsl:apply-templates/>
        </div>
    </xsl:template> -->
    <xsl:template match="//div[@class='front']" priority="5">
     <xsl:variable name="fpageVal">
                <xsl:choose>
                    <xsl:when test="$fpage != '' and not(contains($fpage,'fpage'))">
                        <xsl:value-of select="$fpage"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="''"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
        <div class="front" cmsID="{$cmsID}" journal-id="{$journal}" fpage="{$fpageVal}" proof-type="{$proof}">
         	<xsl:apply-templates select="@*[name()!='fpage']"/>
             <xsl:if test="$pageType != ''">
                <xsl:attribute name="data-page-type">
                    <xsl:value-of select="$pageType"/>
                </xsl:attribute>
            </xsl:if>
        <xsl:apply-templates select="node()"/>
        </div>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsGroup']" priority="5">
        <xsl:if test="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
            <xsl:for-each select="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
                <div class="jrnlAbsBox">
                    <xsl:apply-templates select="./@*|./*"/>
                </div>
            </xsl:for-each>
        </xsl:if>
        <div class="jrnlAbsGroup">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']" priority="5">
        <p class="jrnlAbsPara">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
   <!-- <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template> -->
    <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5"/>
     <xsl:template match="//div[@class='front']//p[@class='jrnlAbsPara']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                <xsl:choose>
                    <xsl:when test="$journal='cn' and position()=last() and ./preceding-sibling::*[@class='jrnlAbsPara']">
                        <xsl:attribute name="data-spl-style" select="'jrnlAbsParaLast_Structure'"/>
                    </xsl:when>
                </xsl:choose>
                <span>
                    <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
               <xsl:text>:</xsl:text>
                </span>
                <xsl:text> </xsl:text>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template>
    <!--<xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:if test="./@data-anchor = 'true'">
            <span class="jrnlFirstCitation" data-rid="{./@data-citation-string}"/>
        </xsl:if>
        <span class="{./@class}" data-citation-string="{./@data-citation-string}">
            <xsl:variable name="id" select="./@data-citation-string"/>
            <xsl:variable name="id" select="replace($id, '^\s*(.+?)\s*$', '$1')"/>
            <xsl:variable name="id" select="replace($id, '\s', ',')"/>
            <xsl:variable name="node" select="current()"/>
            <xsl:variable name="citationText" select="replace(., '^(Figures?|Tables?|Videos?|Box)\s', '$1 ', 'i')"/>
            <xsl:for-each select="tokenize($id,',')">
                <xsl:variable name="currentID" select="."/>
                <xsl:choose>
                    <xsl:when test="$node/preceding::span[contains(@data-citation-string, $currentID)]"/>
                    <xsl:otherwise>
                        <xsl:attribute name="data-citation-first" select="'true'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
            <xsl:value-of select="$citationText"/>
        </span>
    </xsl:template> -->
   <xsl:template match="//table/tbody" priority="5">
         <xsl:choose>
            <xsl:when test="$journal != 'cl'">
                <xsl:variable name="maxCells">
                    <xsl:for-each select="tr">
                        <xsl:sort select="sum(td/@colspan) + count(td[not(@colspan)])" order="descending"/>
                        <xsl:if test="position() = 1">
                            <xsl:value-of select="sum(td/@colspan) + count(td[not(@colspan)])"/>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:variable>
                     <tbody>
                    <xsl:apply-templates select="@* | node()"/>
                    <!--<xsl:if test="../../*[@class='jrnlTblFoot']"> -->
                    <xsl:if test="../following-sibling::*[1][@class='jrnlTblFoot']">
                    <xsl:choose>
                            <xsl:when test=".//ancestor::div[@class='jrnlBoxBlock']">
                            <tr>
                            <td colspan="{$maxCells}">
                               <xsl:for-each select="../../p[@class='jrnlTblFoot']">
                                    <p class="jrnlBoxTblFoot">
                                        <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                    </p>
                                </xsl:for-each> 
                            </td>
                            </tr>
                            </xsl:when>
                            <xsl:otherwise>
                              <tr>
                            <td colspan="{$maxCells}">
                               <!--<xsl:for-each select="../../p[@class='jrnlTblFoot']"> -->
                                <xsl:for-each select="../following-sibling::p[@class='jrnlTblFoot']">
                                <xsl:if test="./node()!=''">
                                    <p class="jrnlTblFoot">
                                        <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                    </p>
                                    </xsl:if>
                                </xsl:for-each> 
                            </td>
                            </tr>
                            </xsl:otherwise>
                    </xsl:choose>
                    </xsl:if>
                   </tbody>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                     <xsl:apply-templates select="@* | node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
   </xsl:template>
   
   <xsl:template match="//div[@class='body']//*[@class='jrnlFNRef'][contains(@data-rid,'fn')]" priority="5">
     <xsl:element name="{name()}">
             <xsl:variable name="class">
                <xsl:choose>
                    <xsl:when test="$journal='pa'">
                        <xsl:value-of select="'jrnlNotesRef'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@class"/>
                    </xsl:otherwise>
                </xsl:choose>
             </xsl:variable>
             <xsl:attribute name="class">
                 <xsl:value-of select="$class"/>
             </xsl:attribute>
            <xsl:apply-templates select="@*[name()!='class']|node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='back']//*[@class='jrnlFootNoteFN']" priority="5">
        <xsl:element name="{name()}">
             <xsl:variable name="class">
                <xsl:choose>
                    <xsl:when test="$journal='pa'">
                        <xsl:value-of select="'jrnlFN'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@class"/>
                    </xsl:otherwise>
                </xsl:choose>
             </xsl:variable>
             <xsl:attribute name="class">
                 <xsl:value-of select="$class"/>
             </xsl:attribute>
            <xsl:apply-templates select="@*[name()!='class']|node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='back']//*[@class='jrnlFootNotePara']" priority="5">
        <xsl:element name="{name()}">
             <xsl:variable name="class">
                <xsl:choose>
                    <xsl:when test="$journal='pa' or $journal='jcp' ">
                        <xsl:value-of select="'jrnlFNPara'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@class"/>
                    </xsl:otherwise>
                </xsl:choose>
             </xsl:variable>
             <xsl:attribute name="class">
                 <xsl:value-of select="$class"/>
             </xsl:attribute>
            <xsl:apply-templates select="@*[name()!='class']|node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='floatBlock']//*[@class='jrnlFootNotePara']" priority="5">
           <p>
            <xsl:apply-templates select="@*|node()except(span[@data-class='label'])"/>
          </p>
      </xsl:template>
    <xsl:template match="//*[@class='jrnlFootNoteFNHead']" priority="5">
        <xsl:variable name="count1" select="count(//*[@class='jrnlFootNote'])"/>
        <xsl:choose>
            <xsl:when test="$count1 &gt; 1">
                <h1 class="jrnlFootNoteFNHead" endNote="true">Notes</h1>
            </xsl:when>
            <xsl:otherwise>
                 <h1 class="jrnlFootNoteFNHead" endNote="true">Note</h1>
            </xsl:otherwise>
        </xsl:choose>
	</xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
        <xsl:variable name="class" select="./@class"/>
        <xsl:variable name="doi" select="replace(./../span[@class='RefWebsite'],'doi:','')"/>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http://dx.doi.org'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <span class="{$class}">
            <xsl:choose>
                <xsl:when test="./../span[@class='RefWebsite']">
                    <a href="{$doi}">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefDOI']" priority="5">
        <xsl:variable name="doi" select="replace(.,'doi:','')"/>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http://dx.doi.org'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:text> </xsl:text>
        <span class="RefDOI">
            <a href="{$doi}">
                <xsl:value-of select="$doi"/>
            </a>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefWebsite']" priority="5">
        <xsl:choose>
            <xsl:when test="$proof='print' and ./../@removeDOIForPrint='true'"/>
            <xsl:when test="$proof='online' and ./../@removeDOIForOnline='true'"/>
            <xsl:otherwise>
                <span class="RefWebsite">
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="//div[@class='front' or @class='back']//*[@class='jrnlAffGroup'][@removeNode='true']" priority="5"/>
    <xsl:template match="//div[@class='jrnlAff']/span[@class='jrnlInstitution']" priority="5">
        <p class="jrnlInstitution">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='jrnlAff']/span[@class='jrnlCountry']" priority="5">
        <p class="jrnlCountry">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//p[@class='jrnlRRH']" priority="5">
        <p class="jrnlRRH">
            <span class="jrnlShortTitle">
                <xsl:apply-templates/>
            </span>
        </p>
    </xsl:template>
     <xsl:template match="//*[@class='jrnlFigBlock']//*[@data-class='jrnlFigFootText']" priority="5">
		<xsl:element name="{name()}">
			<xsl:attribute name="class">
				<xsl:value-of select="'jrnlFigFoot'"/>
			</xsl:attribute>
			<xsl:apply-templates select="@*[name()!='class']|node()"/>
		</xsl:element>
     </xsl:template>
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
     <xsl:if test=". != ''">
        <xsl:choose>
            <xsl:when test="$journal='nn'">
                <xsl:variable name="labelName" select="concat(.,' ■ ')"/>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
            </xsl:when>
            <xsl:when test="$journal='pa' or $journal='cl' or $journal='rtnp' or $journal='jfcp'">
                <xsl:variable name="labelName" select="concat(.,' ')"/>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
            </xsl:when>
            <xsl:when test="$journal='jpe'">
                    <span class="label">
                    <xsl:value-of select="."/>
                </span>
            </xsl:when>
             <xsl:when test="$journal='cn' or $journal='jcp' or $journal='rrpe' or $journal='jnm'">
                <xsl:variable name="labelName" select="concat(.,' ')"/>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="labelName" select="concat(.,' ')"/>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
        </xsl:if>
    </xsl:template>
  <xsl:template match="//div[@class='body']//h3[@data-runon='true']" priority="8">
        <h3 class="jrnlHead3">
            <xsl:if test="./following-sibling::*[1][@class='jrnlSecPara']/@data-word-spacing">
                <xsl:attribute name="data-word-spacing">
                    <xsl:value-of select="./following-sibling::*[1][@class='jrnlSecPara']/@data-word-spacing"/>
                </xsl:attribute>
            </xsl:if>
            <span>
                <xsl:apply-templates select="@*|node()"/>
                 <xsl:variable name="lastchar">
                    <xsl:value-of select="substring(., string-length(.), 1)"/>
                </xsl:variable>
                  <xsl:variable name="quot" select="'&#34;'"/>
                  <xsl:if test="$lastchar != '”' and $lastchar != '&#34;' and $lastchar != '?'">
                     <xsl:text>.</xsl:text>
                </xsl:if>
            </span>
            <xsl:choose>
				<xsl:when test="$journal='nn'">
					<xsl:text> </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> </xsl:text>
				</xsl:otherwise>
            </xsl:choose>
            <!-- <span>
               <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()"/> 
               </span> -->
           <!-- <xsl:for-each select="./following-sibling::*[1][@class='jrnlHead4']">
    				<span>
    					<xsl:apply-templates select="./@*|./node()"/>
    					 <xsl:text>.</xsl:text>    
    				</span>
				    <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
    				    <xsl:choose>
            				<xsl:when test="$journal='nn'">
            					<xsl:text> </xsl:text>
            				</xsl:when>
            				<xsl:otherwise>
            					<xsl:text> </xsl:text>
            				</xsl:otherwise>
                        </xsl:choose>
        				<span>
        					<xsl:apply-templates select="./@*|./node()"/>
        				</span>
				    </xsl:for-each>
				</xsl:for-each>  --> 
            <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
				<!--<span>
					<xsl:apply-templates select="./@*|./node()"/>
				</span> -->
					<xsl:apply-templates select="./node()"/>
				<xsl:variable name="current" select="generate-id(.)"/>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
					<xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='pull-quote']) + 1"/>
					<xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
						<xsl:choose>
							<xsl:when test="$journal='cn'">
                                 <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:when>
							<xsl:otherwise>
                                 <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:for-each>
			</xsl:for-each>
        </h3>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="8"/>
   <!-- <xsl:template match="//div[@class='body']//h4[./preceding-sibling::*[1][@data-runon='true']]" priority="8"/>-->
   <!-- <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@class='jrnlHead4']]" priority="8"/>-->
   <xsl:template match="//div[@class='body']//h4[@data-runon='true']" priority="8">
        <h4 class="jrnlHead4">
            <xsl:if test="./following-sibling::*[1][@class='jrnlSecPara']/@data-word-spacing">
                <xsl:attribute name="data-word-spacing">
                    <xsl:value-of select="./following-sibling::*[1][@class='jrnlSecPara']/@data-word-spacing"/>
                </xsl:attribute>
            </xsl:if>
            <span>
                <xsl:apply-templates select="@*|node()"/>
				<!--IF LAST CHAR IS " WE WILL NOT ADD . Punc -->
				<xsl:variable name="lastchar">
                    <xsl:value-of select="substring(., string-length(.), 1)"/>
                </xsl:variable>
                 <xsl:variable name="quot" select="'&#34;'"/>
                  <xsl:if test="$lastchar != '”' and $lastchar != '&#34;'">
                     <xsl:text>.</xsl:text>
                </xsl:if>
             </span>
            <xsl:choose>
				<xsl:when test="$journal='nn'">
					<xsl:text> </xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text> </xsl:text>
				</xsl:otherwise>
            </xsl:choose>
              <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
				<span>
					<xsl:apply-templates select="./@*|./node()"/>
				</span>
				<xsl:variable name="current" select="generate-id(.)"/>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
					<xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='pull-quote']) + 1"/>
					<xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
						<xsl:choose>
							<xsl:when test="$journal='cn'">
                                 <span class="jrnlFirstCitationMN" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:when>
							<xsl:otherwise>
                                 <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</xsl:for-each>
			</xsl:for-each>
        </h4>
  </xsl:template>
    <xsl:template match="//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead4'])][./preceding-sibling::*[2][@data-runon='true']]|//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead4'])][./preceding-sibling::*[3][@data-runon='true']][./preceding-sibling::*[1][@class='jrnlBlockQuote'][@data-type='pull-quote']]|//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead4'])][./preceding-sibling::*[3][@data-runon='true']][./preceding-sibling::*[1][@class='floatBlock'][@data-inline='true']]" priority="8"> 
        <p>
            <xsl:attribute name="data-spl-style">
                    <xsl:value-of select="'TXI'"/>
                </xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </p>
    </xsl:template>
<!-- <xsl:template match="//*[@class='jrnlFigCaption']|//*[@class='jrnlBoxCaption']|//*[@class='jrnlTblCaption']|//*[@class='jrnlVidCaption']" priority="5">
        <xsl:element name="{local-name()}">
          <xsl:variable name="caption" select="./node() except(span[@class='label'])"/>
            <xsl:variable name="caption" select="replace($caption[1],'^\s+','')"/>
            <xsl:apply-templates select="./@*"/>
         <xsl:if test="./*[@class='label']">
                <xsl:variable name="labelName" select="concat(./*[@class='label'],' ')"/>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
               
            </xsl:if> 
          
             <xsl:value-of select="$caption"/>
        </xsl:element>
    </xsl:template> -->
   <!-- <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:element name="img">
                <xsl:if test="./@class">
                    <xsl:attribute name="class">
                        <xsl:value-of select="./img/@class"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="./img/@id">
                    <xsl:attribute name="id">
                        <xsl:value-of select="./img/@id"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="src">
                    <xsl:value-of select="./img/@src"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                    <xsl:value-of select="./img/@alt"/>
                </xsl:attribute>
                <xsl:apply-templates select="./img/@*[contains(name(.), 'data-')]"/>
            </xsl:element>
            <xsl:apply-templates select=" node()"/>
        </div>
    </xsl:template> -->
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <xsl:choose>
			<xsl:when test="$journal='nn' or $journal='cl' or $journal='jfcp'">
                <div>
                    <xsl:apply-templates select=" @* "/>
                    <xsl:apply-templates select=".//*[@class='jrnlFigCaption']"/>
                    <xsl:for-each select="./img">
                        <xsl:element name="img">
                            <xsl:if test="./@class">
                                <xsl:attribute name="class">
                                    <xsl:value-of select="./@class"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="./@id">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="./@id"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="src">
                                <xsl:value-of select="./@src"/>
                            </xsl:attribute>
                            <xsl:attribute name="alt">
                                <xsl:value-of select="./@alt"/>
                            </xsl:attribute>
                            <xsl:apply-templates select="./@*[contains(name(.), 'data-')]"/>
                        </xsl:element>
                    </xsl:for-each>
                    <xsl:apply-templates select=" node()except(.//*[@class='jrnlFigCaption'])"/>
				</div>
			</xsl:when>
			<xsl:otherwise>
		        <div>
                    <xsl:apply-templates select=" @* "/>
                    <xsl:for-each select="./img">
                        <xsl:element name="img">
                            <xsl:if test="./@class">
                                <xsl:attribute name="class">
                                    <xsl:value-of select="./@class"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="./@id">
                                <xsl:attribute name="id">
                                    <xsl:value-of select="./@id"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:attribute name="src">
                                <xsl:value-of select="./@src"/>
                            </xsl:attribute>
                            <xsl:attribute name="alt">
                                <xsl:value-of select="./@alt"/>
                            </xsl:attribute>
                            <xsl:apply-templates select="./@*[contains(name(.), 'data-')]"/>
                        </xsl:element>
                    </xsl:for-each>
                    <xsl:apply-templates select=" node()"/>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@type='main']//*[@class='jrnlBoxBlock']" priority="5">
        <div>
            <xsl:attribute name="data-type">
                <xsl:value-of select="'TYPE1'"/>
            </xsl:attribute>
            <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
            <xsl:apply-templates select=" node() "/>
        </div>
    </xsl:template>
    <xsl:template match="//td[@*[contains(., 'data-cell-width-tablesetter')]]" priority="5">
        <xsl:element name="{name(.)}">
            <!--<xsl:apply-templates select="@*|node()"/>-->
            <xsl:apply-templates select="@*[not(contains(name(),'data-cell-width-tablesetter'))]"/>
            <xsl:attribute name="data-cell-width-tablesetter">
                <xsl:value-of select="sum(./@*[contains(name(),'data-cell-width-tablesetter')])"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="@*[not(normalize-space())]"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal!='cl'"/>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="not(./preceding-sibling::*[@class='jrnlTblFoot'])">
                        <div class="jrnlTblFootGroup">
                            <xsl:element name="{name(.)}">
                                <xsl:apply-templates select="@* | node()"/>
                            </xsl:element>
                            <xsl:for-each select="./following-sibling::*[@class='jrnlTblFoot']">
                                <xsl:element name="{name(.)}">
                                 <xsl:apply-templates select="@* | node()"/>
                                </xsl:element>
                            </xsl:for-each>
                            <p/>
                        </div>
                    </xsl:when>
                <xsl:otherwise>
                </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--<xsl:choose>
                <xsl:when test="@removeString != ''">
                    <xsl:variable name="nodeContent" select="."/>
                    <xsl:variable name="nodeContents">
                        <xsl:for-each select="tokenize(@removeString,',')">
                            <xsl:variable name="content" select="."/>
                            <xsl:variable name="nodeContent" select="replace($nodeContent, $content, '')"/>
                        </xsl:for-each>
                        <xsl:value-of select="$nodeContent"/>
                    </xsl:variable>
                    <xsl:value-of select="$nodeContents"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>-->
	<xsl:template match="//*[@class='jrnlAbsGroup']/*[@class='jrnlAbsHead']" priority="5">
	    <xsl:choose>
	         <xsl:when test="$journal='pa' or $journal = 'vv' or $journal='rrpe' or $journal='ehpp' or $journal='jnm' or $journal='jdnp' or $journal='usw' or $journal='humancaring'">
	        </xsl:when>
	        <xsl:otherwise>
			     <xsl:element name="{name(.)}">
		             <xsl:apply-templates select="@* | node()"/>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	 <xsl:template match="//div[@class='front']//*[@class='jrnlISSN']" priority="5">
        <span class="jrnlISSN">
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
    	        <xsl:when test="$journal !='humancaring'">
                    <xsl:text>10.1891/</xsl:text>
                </xsl:when>
            	<xsl:otherwise>
                	<xsl:text>10.20467/</xsl:text>
            	</xsl:otherwise>
        	</xsl:choose>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template>  
    <xsl:template match="//div[@class='front']//div[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup']" priority="5">
		<xsl:choose>
	         <xsl:when test="$journal !='cl' and $journal !='emdr'">
				<xsl:variable name="jrnlAuthor" select="./*[@class='jrnlAuthor']"/>
				<xsl:variable name="jrnlAff" select="./*[@class='jrnlAff']"/>
				 <xsl:variable name="jrnlDegrees" select="./*[@class='jrnlDegrees']"/>
				<xsl:variable name="affid">
					<xsl:for-each select="./child::*[@class='jrnlAff']">
						<xsl:value-of select="./@id"/>
					</xsl:for-each>
				</xsl:variable>
				<xsl:variable name="nextaffid">
					<xsl:for-each select="./following-sibling::*[@class='jrnlAuthorGroup'][1]/child::*[@class='jrnlAff']">
						<xsl:value-of select="./@id"/>
					</xsl:for-each>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="$affid=$nextaffid">
						<p class="jrnlAuthorGroup">
							<xsl:apply-templates select="$jrnlAuthor"/>
							<xsl:apply-templates select="$jrnlDegrees"/>
						</p>
					</xsl:when>
					<xsl:otherwise>
						<p class="jrnlAuthorGroup">
							<xsl:apply-templates select="$jrnlAuthor"/>
							<xsl:apply-templates select="$jrnlDegrees"/>
						 </p>
						<xsl:apply-templates select="$jrnlAff"/>
					</xsl:otherwise>
				</xsl:choose>
            </xsl:when>
            <xsl:when test="$journal ='emdr'">
				<xsl:variable name="jrnlAuthor" select="./*[@class='jrnlAuthor']"/>
				<xsl:variable name="jrnlAff" select="./*[@class='jrnlAff']"/>
				 <xsl:variable name="jrnlDegrees" select="./*[@class='jrnlDegrees']"/>
				<xsl:variable name="affid">
					<xsl:for-each select="./child::*[@class='jrnlAff']">
						<xsl:value-of select="./@id"/>
					</xsl:for-each>
				</xsl:variable>
				<xsl:variable name="nextaffid">
				<xsl:for-each select="./following-sibling::*[@class='jrnlAuthorGroup'][1]/child::*[@class='jrnlAff']">
                    <xsl:value-of select="./@id"/>
				</xsl:for-each>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="$affid=$nextaffid">
						<div class="jrnlAuthorGroup">
							<xsl:apply-templates select="$jrnlAuthor"/>
							<xsl:apply-templates select="$jrnlDegrees"/>
						</div>
					</xsl:when>
					<xsl:otherwise>
						 <div class="jrnlAuthorGroup">
							<xsl:apply-templates select="$jrnlAuthor"/>
							<xsl:apply-templates select="$jrnlDegrees"/>
						</div>
						<xsl:apply-templates select="$jrnlAff"/>
					</xsl:otherwise>
				</xsl:choose>
            </xsl:when>
            <xsl:otherwise>
				 <xsl:element name="{name(.)}">
					<xsl:apply-templates select="@*|node()"/>
				 </xsl:element>      
             </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
           
    <!--  <xsl:template match="//div[@class='back']//*[@class='jrnlCorrAff']" priority="5">
             <xsl:choose>
            <xsl:when test="$journal='nn'">
               <xsl:variable name="jrnlcorraff">
             <xsl:value-of select = "substring-before(./text(),' E-mail:')" /> 
             </xsl:variable>
                   <xsl:choose>
                    <xsl:when test="contains(./text(),' E-mail:')">
                    <P class="jrnlCorrAff">
                          <xsl:apply-templates select="@*"/>
                          <xsl:apply-templates select="$jrnl"/>
                              </P>
                    </xsl:when>
                    <xsl:otherwise>
                     <xsl:copy>
                            <xsl:apply-templates select="@*|node()except (*[@class = 'jrnlCorrEmail'])"/>
                        </xsl:copy>
                    </xsl:otherwise>
                    </xsl:choose>
                    <xsl:variable name="jrnlCorrEmail" select=".//*[@class = 'jrnlCorrEmail']"/>
                    <xsl:variable name="mail" select=".//*[@class = 'jrnlCorrEmail']/text()"/>
                     <p class="jrnlCorrEmail">
                      <xsl:text>E-mail: </xsl:text>
                      <xsl:apply-templates select="$mail"/>
                     </p>
            </xsl:when>
            <xsl:otherwise>
             <xsl:element name="{name(.)}">
                <xsl:apply-templates select="@*|node()"/>
             </xsl:element>      
             </xsl:otherwise>
         </xsl:choose>
         </xsl:template> -->
    <xsl:template match="//div[@class='back']//*[@class='jrnlCorrAff']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='nn'">
                <xsl:variable name="jrnlInstitution" select=".//*[@class = 'jrnlInstitution']/text()"/>
                <xsl:variable name="jrnlCity" select=".//*[@class = 'jrnlCity']/text()"/>
                <xsl:variable name="jrnlDepartment" select=".//*[@class = 'jrnlDepartment']/text()"/>
                <xsl:variable name="jrnlState" select=".//*[@class = 'jrnlState']/text()"/>
                <!--<xsl:copy>
                    <xsl:apply-templates select="@*|node()except (*[@class = 'jrnlCorrEmail'])"/>
                </xsl:copy> -->
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:for-each select="./text()">
                        <xsl:value-of select="replace(.,'. E-mail:|, $','')"/>
                    </xsl:for-each>
                </xsl:element>
                <xsl:if test="$jrnlDepartment!=''">
                    <p class="jrnlDepartment">
                        <xsl:apply-templates select="$jrnlDepartment"/>
                    </p>
                </xsl:if>
                <xsl:if test="$jrnlInstitution!=''">
                    <p class="jrnlInstitution">
                        <xsl:apply-templates select="$jrnlInstitution"/>
                    </p>
                </xsl:if>
                <xsl:if test="$jrnlCity!=''">
                    <p class="jrnlCity">
                        <xsl:apply-templates select="$jrnlCity"/>
                    </p>
                </xsl:if>
                <xsl:if test="$jrnlState!=''">
                    <p class="jrnlState">
                        <xsl:apply-templates select="$jrnlState"/>
                    </p>
                </xsl:if>
                <xsl:variable name="jrnlCorrEmail" select=".//*[@class = 'jrnlCorrEmail']"/>
                <xsl:variable name="mail" select=".//*[@class = 'jrnlCorrEmail']/text()"/>
                <p class="jrnlCorrEmail">
                    <xsl:text>E-mail: </xsl:text>
                    <xsl:variable name="href">
                        <xsl:value-of select="concat('mailto:',$mail)"/>
                    </xsl:variable>
                    <a href="{$href}">
                        <xsl:apply-templates select="$mail"/>
                    </a>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:value-of select="./@startPunc"/>
					<!--<xsl:apply-templates select="node()"/> -->
                    <xsl:for-each select="./node()">
                        <xsl:choose>
                            <xsl:when test="./@class='jrnlCorrEmail'">
                                <xsl:element name="{name(.)}">
                                    <xsl:apply-templates select="@*"/>
                                    <xsl:variable name="href">
                                        <xsl:value-of select="concat('mailto:',.)"/>
                                    </xsl:variable>
                                    <a href="{$href}">
                                        <xsl:value-of select="."/>
                                    </a>
                                </xsl:element>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:apply-templates select="."/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                </xsl:element>      
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
     <!-- <xsl:template match="//div[@class='back']//*[@class='jrnlCorrAff']" priority="6">
         <xsl:choose>
            <xsl:when test="$journal='nn'">
             <xsl:value-of select="replace(./text(),'. E-mail:','')"/>
            </xsl:when>
            <xsl:otherwise>
                        <xsl:apply-templates/>
                      </xsl:otherwise>
               </xsl:choose>
        </xsl:template> -->
      <xsl:template match="//div[@class='back']//*[@class='jrnlCorrAff']/*[@class='jrnlCorrAddress']" priority="5">
      <xsl:choose>
            <xsl:when test="$journal='nn'"/>
            <xsl:otherwise>
                        <xsl:apply-templates/>
                      </xsl:otherwise>
               </xsl:choose>
     </xsl:template> 
	  <xsl:template match="//*[@class='jrnlBoxBlock']//table/tbody//tr/td/p" priority="6">
                <p class="jrnlBoxTblBody">
                    <xsl:apply-templates/>
                </p>
      </xsl:template>
      <xsl:template match="//*[@class='jrnlBoxBlock']//table" priority="5">
    	<xsl:element name="{name(.)}">
    		<xsl:apply-templates select="./@*"/>
    		<xsl:attribute name="data-class">
    			<xsl:value-of select="'jrnlBoxTbl'"/>
    		</xsl:attribute>
    		<xsl:apply-templates select="node()"/>
    	</xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlBoxBlock']//*[@class='jrnlTblFoot']" priority="6"/>
    <xsl:template match="*[@data-type='cne']|*[@data-type='purpose']" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:attribute name="class">
                <xsl:value-of select="'jrnlFN'"/>
            </xsl:attribute>
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test="./@data-type='cne'">
                    <p class="jrnlFNHead" data-fig-inline="left">
                    <img class="jrnlCnLogo">
                        <xsl:attribute name="src">
                        <xsl:value-of select="concat('{.}../logos/',$proof,'/SPRINGER_CE_icon.eps')"/>
                        </xsl:attribute>
                    </img>
                    <xsl:apply-templates select="./*[@class='jrnlFNHead']"/>
                    </p>
                </xsl:when>
                <xsl:when test="./@data-type='purpose'"/>
                <xsl:otherwise>
                    <xsl:if test="./*[@class='jrnlFNHead']">
                    <p class="jrnlFNHead">
                        <xsl:apply-templates select="./*[@class='jrnlFNHead']"/>
                    </p>
                    </xsl:if>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="./*[@class='jrnlFNPara']">
                <p class="jrnlFNPara">
                    <xsl:apply-templates select="@*|node()"/>
                </p>
            </xsl:for-each>
        </xsl:element>
        </xsl:template>
         <!--to remove space from caption and adding line break-->
       <xsl:template match="//*[@class='jrnlTblCaption']" priority="5">
         <xsl:choose>
            <xsl:when test="$journal='jpe'">
				<xsl:element name="{local-name()}">
				  <xsl:variable name="caption" select="./node() except(span[@class='label'])"/>
			      <!--<xsl:variable name="caption" select="replace($caption[1],'^\s+','')"/> need to remove space from xml itself-->
				  <xsl:apply-templates select="./@*"/>
				   <xsl:if test="./*[@class='label']">
						<xsl:variable name="labelName" select="./*[@class='label']"/>
						<span class="label">
							<xsl:value-of select="$labelName"/>
						</span>
				   </xsl:if> 
				 <xsl:text>
</xsl:text>
					 <xsl:apply-templates select="$caption"/>
				</xsl:element>
          </xsl:when>
         <xsl:otherwise>
             <xsl:element name="{name(.)}">
                <xsl:apply-templates select="@*|node()"/>
             </xsl:element>      
             </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
 <xsl:template match="//*[@class='jrnlBio'][./*[@class='jrnlFigBlock']]" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='jpe'">
                <xsl:copy>
                    <xsl:apply-templates select="@*|node()except (div[@class = 'jrnlFigBlock'])"/>
                </xsl:copy>
                <xsl:if test="./*[@class='jrnlFigBlock']">
                <div class="jrnlEditorImgBlock">
                    <xsl:variable name="name" select="./*[@class='jrnlFigBlock']/*[@class='jrnlFigCaption'][1]/text()"/>
                    <xsl:variable name="role" select="./*[@class='jrnlFigBlock']/*[@class='jrnlFigCaption'][2]/text()"/>
                    <img class="">
                        <xsl:attribute name="src">
                            <xsl:value-of select="./*[@class='jrnlFigBlock']//img/@src"/>
                        </xsl:attribute>
                        <xsl:attribute name="alt">
                            <xsl:value-of select="./*[@class='jrnlFigBlock']//img/@alt"/>
                        </xsl:attribute>
                    </img>
                     <xsl:if test="$name != ''">
                    <p class="jrnlEditorName">
                        <xsl:apply-templates select="$name"/>
                    </p>
                    </xsl:if>
                     <xsl:if test="$role != ''">
                    <p class="jrnlEditorRole">
                        <xsl:apply-templates select="$role"/>
                    </p>
                    </xsl:if>
                </div>
                </xsl:if>
            </xsl:when>
            <xsl:when test="$journal='cn' or $journal='cl'"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlBiography'][not(./preceding-sibling::*[@class='jrnlBiography'])]" priority="5">
		<xsl:choose>
            <xsl:when test="$journal='jpe'">
         <p>
			<xsl:apply-templates select="@*|node()"/>
			<xsl:for-each select="./following::*[@class='jrnlBiography']">
				  <xsl:text> </xsl:text>
				  <span>
						 <xsl:apply-templates select="./@*|./node()"/>
				  </span>
			</xsl:for-each>
        </p>
        </xsl:when>
        <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
         </xsl:otherwise>
        </xsl:choose>
     </xsl:template>
     <xsl:template match="//*[@class='jrnlBio'][not(./*[@class='jrnlFigBlock'])]" priority="5">
     <xsl:choose>
            <xsl:when test="./preceding-sibling::*[@class='jrnlBio']">
                <xsl:choose>
                <xsl:when test="$journal='jpe' or $journal='cn' or $journal='cl'"/>
                <xsl:otherwise>
                    <xsl:element name="{./name()}">
                        <xsl:apply-templates select="@*|node()"/>
                    </xsl:element>
                </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                 <xsl:choose>
                    <xsl:when test="$journal='cn' or $journal='cl'"/>
                    <xsl:otherwise>
                        <xsl:element name="{./name()}">
                            <xsl:apply-templates select="@*|node()"/>
                        </xsl:element>
                    </xsl:otherwise>
                  </xsl:choose>
            </xsl:otherwise>
    </xsl:choose>
    </xsl:template>
   <!-- <xsl:template match="//*[@data-class='jrnlQuoteBlock'][not(.//*[@data-type='pull-quote' or @data-type='margin'])]" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='ijcbirth'">
				<table data-class="jrnlBlockQuoteTbl">
					<tbody>
						<xsl:for-each select="./p">
							<tr>
							<td width="234">
								 <p class="jrnlBlockQuoteTblPara">
								<xsl:apply-templates select="./@*[name()!='class']|./node()"/>
							</p>
							</td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
            </xsl:when>
            <xsl:otherwise>
				<xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
				</xsl:element>
            </xsl:otherwise>
        </xsl:choose>
     </xsl:template> -->
   <!-- <xsl:template match="//*[@class='jrnlBlockQuote'][not(.//*[@data-type='pull-quote' or @data-type='margin' or @class='jrnlAttrib'])]" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='ijcbirth'">
				<table data-class="jrnlBlockQuoteTbl">
					<tbody>
						<tr>
							<td width="234">
								 <p class="jrnlBlockQuoteTblPara">
									<xsl:apply-templates select="./@*[name()!='class']|./node()"/>
								</p>
							</td>
						</tr>
				    </tbody>
				</table>
            </xsl:when>
            <xsl:otherwise>
				<xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
				</xsl:element>
            </xsl:otherwise>
        </xsl:choose>
     </xsl:template> -->
     <xsl:template match="//*[@class='jrnlBlockQuote'][not(./@data-type='pull-quote' or ./@data-type='margin' or .//@class='jrnlAttrib')][not(./preceding-sibling::*[1][@class='jrnlBlockQuote'])]" priority="5">
    	<xsl:variable name="current" select="generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnlBlockQuote'))][1])"/>
        <xsl:choose>
            <xsl:when test="$journal='ijcbirth'">
				<table data-class="jrnlBlockQuoteTbl">
					<tbody>
						<tr>
							<td width="234">
								 <p class="jrnlBlockQuoteTblPara">
									<xsl:apply-templates select="./@*[name()!='class']|./node()"/>
								</p>
							</td>
						</tr>
						<xsl:for-each select="./following::*[@class='jrnlBlockQuote']">
						    <xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnlBlockQuote'))][1])">
							    <tr>
        							<td width="234">
        								 <p class="jrnlBlockQuoteTblPara">
        									<xsl:apply-templates select="./@*[name()!='class']|./node()"/>
        								</p>
        							</td>
						        </tr>
						    </xsl:if>
						</xsl:for-each>
				    </tbody>
				</table>
            </xsl:when>
            <xsl:otherwise>
				<xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
				</xsl:element>
            </xsl:otherwise>
        </xsl:choose>
     </xsl:template>
     <xsl:template match="//*[@class='jrnlBlockQuote'][not(./@data-type='pull-quote' or ./@data-type='margin' or .//@class='jrnlAttrib')][./preceding-sibling::*[1][@class='jrnlBlockQuote']]" priority="5">
     <xsl:choose>
        <xsl:when test="$journal='ijcbirth'"/>
        <xsl:otherwise>
        	<xsl:element name="{./name()}">
				<xsl:apply-templates select="@*|node()"/>
			</xsl:element>
        </xsl:otherwise>
    </xsl:choose>
    </xsl:template>
     <xsl:template match="//*[@data-class='jrnlQuoteBlock'][not(.//*[@data-type='pull-quote' or @data-type='margin'])]" priority="5">
        <xsl:apply-templates/>
     </xsl:template>
   <!-- <xsl:template match="//div[@class='front']//*[@class='jrnlAbsTitle']" priority="5"/>
    <xsl:template match="//div[@class='front']//p[@class='jrnlAbsPara']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                <span>
                    <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                <xsl:text>:</xsl:text>
                </span>
                <xsl:text> </xsl:text>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </p>
    </xsl:template>-->
    <xsl:template match="//*[@class='jrnlBlockQuote'][./span[@class='jrnlAttrib']]" priority="5">
        <xsl:element name="{./name()}">
            <xsl:attribute name="data-spl-style">
             <xsl:value-of select="'jrnlBlockQuote_attrib'"/>
            </xsl:attribute>
        <xsl:apply-templates select="@*|node()except(//span[@class='jrnlAttrib'])"/>
        </xsl:element>
        <p class="jrnlAttrib">
            <xsl:apply-templates select=".//span[@class='jrnlAttrib']/@*|.//span[@class='jrnlAttrib']/node()"/>
        </p>
    </xsl:template>
    <!-- add link for doi in footer -->
    <xsl:template match="//div[@class='front']//*[@class='jrnlCRBL_jrnlDOI' or @class='jrnlCVBR_jrnlDOI' or @class='jrnlCRBR_jrnlDOI' or @class='jrnlCVBL_jrnlDOI']" priority="5">
       <xsl:element name="{./name()}">
             <xsl:apply-templates select=" @* "/>
            <xsl:variable name="startPunc">
              <xsl:value-of select="./@startPunc"/>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$journal != 'ehpp' and $journal != 'usw'">
            <a>
                <xsl:variable name="href">
                    <xsl:for-each select=".//*">
                        <xsl:value-of select="concat(./@startPunc,.,./@endPunc)"/>
                    </xsl:for-each>
                </xsl:variable>
                <xsl:attribute name="href">
                    <xsl:value-of select="concat($startPunc,$href)"/>
                </xsl:attribute>
                <xsl:if test="@startPunc">
                     <xsl:value-of select="./@startPunc"/>
                </xsl:if>
                <xsl:apply-templates select="node()"/>
            </a>
            </xsl:when>
            <xsl:otherwise>
                <xsl:if test="@startPunc">
                         <xsl:value-of select="./@startPunc"/>
                </xsl:if>
                <xsl:apply-templates select="node()"/>
            </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
	<!-- jrnlProduct for cl-->
     <xsl:template match="//*[@class='jrnlProduct']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'cl' or $journal = 'rrpe'">
                <xsl:if test="$journal='cl'">
                    <p class="jrnlCoverinfo" data-fig-inline="left">
                        <xsl:apply-templates select="./img"/>
                         <xsl:apply-templates select=".//*[@class='BKRW_jrnlArtTitle']"/>
                    </p>
                </xsl:if>
                <p class="jrnlProductinfo">
                <xsl:apply-templates select="./*[@class='jrnlProductAuthor']"/>
				<xsl:apply-templates select="./*[@class='jrnlPublishername']"/>
                <xsl:apply-templates select="./*[@class='jrnlProductYear']"/>
                <xsl:apply-templates select="./*[@class='jrnlProductFpage']"/>
                <xsl:apply-templates select="./*[@class='jrnlProductComment']"/>
                <xsl:apply-templates select="./*[@class='jrnlProductPrice']"/>
                </p>
                <xsl:apply-templates select="./*[@class='jrnlProductSource']"/>
               
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
                </xsl:otherwise>
            </xsl:choose>
    </xsl:template>
	<!-- for cl After bio webbox moved in floatblock and removed from body part-->
	<xsl:template match="//*[@class='body']//div[@class='jrnlWebBoxBlock']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'cl'"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<!-- removing from Author node bz moved to stub info in aff node-->
    <xsl:template match="//div[@class='front' or @class='back']//*[@class='jrnlAuthorGroup']/*[@class='jrnlEmail'][@removeNode='true']" priority="5"/>
	  <!-- wraping city and country in para-->
      <xsl:template match="//div[@class='jrnlAff']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='jnm'">
                <xsl:variable name="jrnlCity" select="./*[@class = 'jrnlCity']/text()"/>
                <xsl:variable name="jrnlCountry" select="./*[@class = 'jrnlCountry']/text()"/>
                <xsl:variable name="jrnlDepartment" select="./*[@class = 'jrnlDepartment']/text()"/>
                <xsl:variable name="jrnlInstitution" select="./*[@class = 'jrnlInstitution']/text()"/>
                 <xsl:if test="$jrnlDepartment!=''">
                    <xsl:apply-templates select="./*[@class='jrnlDepartment']"/>
                 </xsl:if>
                <xsl:if test="$jrnlInstitution!=''">
                    <xsl:apply-templates select="./*[@class='jrnlInstitution']"/>
                </xsl:if>
                 <xsl:if test="$jrnlCity!=''">
                    <p class="jrnlCity">
                        <xsl:apply-templates select="$jrnlCity"/>
                        <xsl:text>,</xsl:text>
                        <xsl:apply-templates select="$jrnlCountry"/>
                    </p>
                    </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                     <xsl:apply-templates select="@* | node()"/>
                </xsl:element>
                </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<!-- Sigblock moved to back mattern in config and here removing from body matter except CN journals -->
	<xsl:template match="//div[@class='body']/*[@class='jrnlSigBlockGroup']" priority="5">
        <xsl:choose>
	         <xsl:when test="$journal ='cn'">
	            <xsl:element name="{name(.)}">
                     <xsl:apply-templates select="@* | node()"/>
                </xsl:element>
	         </xsl:when>
	         <xsl:otherwise>
	         </xsl:otherwise>
	    </xsl:choose>
    </xsl:template>
  <xsl:template match="//*[@class='body']/*[@class='jrnlWebBoxBlock']//p[@class='jrnlBoxText']" priority="5">
    <xsl:element name="{name(.)}">
        <xsl:apply-templates select="@*"/>
        <xsl:attribute name="data-spl-style" select="'WEB_BOX_TXT'"/>
        <xsl:apply-templates select="node()"/>
    </xsl:element>
   </xsl:template>
   <!-- Updated for letter to Editor -->
   <xsl:template match="//div[@class='back']//div[@class='LRTOTEER_jrnlAuthors']/*[@class='jrnlAuthorGroup']" priority="5">
    	<xsl:choose>
	         <xsl:when test="$journal ='nn' and $articleType ='letter to the editor'">
				<xsl:variable name="jrnlAuthor" select="./*[@class='jrnlIndAuthor']/*[@class='jrnlAuthor']"/>
				<xsl:variable name="jrnlAff" select="./*[@class='LRTOTEER_jrnlAff']"/>
				<xsl:variable name="jrnlDegrees" select="./*[@class='jrnlDegrees']"/>
				<xsl:variable name="affid">
					<xsl:for-each select="./child::*[@class='LRTOTEER_jrnlAff']">
						<xsl:value-of select="./@id"/>
					</xsl:for-each>
				</xsl:variable>
				<xsl:variable name="nextaffid">
					<xsl:for-each select="./following-sibling::*[@class='jrnlAuthorGroup'][1]/child::*[@class='LRTOTEER_jrnlAff']">
						<xsl:value-of select="./@id"/>
					</xsl:for-each>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="$affid=$nextaffid">
    				    <div class="jrnlAuthorGroup">
    						<p class="jrnlIndAuthor">
    							<xsl:apply-templates select="$jrnlAuthor"/>
    							<xsl:apply-templates select="$jrnlDegrees"/>
    						</p>
    					</div>	
					</xsl:when>
					<xsl:otherwise>
    					<div class="jrnlAuthorGroup">
    						<p class="jrnlIndAuthor">
    							<xsl:apply-templates select="$jrnlAuthor"/>
    							<xsl:apply-templates select="$jrnlDegrees"/>
    						 </p>
    						<xsl:apply-templates select="$jrnlAff"/>
					    </div>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
            <xsl:otherwise>
				 <xsl:element name="{name(.)}">
					<xsl:apply-templates select="@*|node()"/>
				 </xsl:element>      
             </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<!--updated for "in this issue" article type -->
	 <xsl:template match="//*[@class='INTSIE_jrnlAuthors']" priority="5">
        <xsl:variable name="GName" select="./*[@class='INTSIE_jrnlAuthorGroup']/*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
        <xsl:variable name="SName" select="./*[@class='INTSIE_jrnlAuthorGroup']/*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
        <xsl:variable name="jrnlEditorName">
            <xsl:value-of select="concat($GName,' ',$SName)"/>
        </xsl:variable>
        <xsl:variable name="jrnlEditorRole" select="./*[@class='INTSIE_jrnlAuthorGroup']/*[@class='jrnlRole']"/>
        <div class="jrnlBio">
            <xsl:apply-templates select="./*[@class='INTSIE_jrnlAuthorGroup']/*[@class='INTSIE_jrnlBio']/*[@class='jrnlBiography']"/>
        </div>
        <div class="jrnlEditorImgBlock">
            <xsl:apply-templates select="./*[@class='INTSIE_jrnlAuthorGroup']/*[@class='INTSIE_jrnlBio']/img"/>
            <p class="jrnlEditorName">
                <xsl:apply-templates select="$jrnlEditorName/text()"/>
            </p>
            <p class="jrnlEditorRole">
                <xsl:apply-templates select="$jrnlEditorRole/text()"/>
            </p>
        </div>
     </xsl:template>
	<!-- Handled more than one ackpara means make it as para except 1st ackpara for journal JFCP-->
	<xsl:template match="//*[@class='jrnlAckGroup']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='jfcp'">
                <p>
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="*[@class='jrnlAckHead']"/>
                    <xsl:for-each select="./*[@class='jrnlAckPara'][not(./preceding-sibling::*[@class='jrnlAckPara'])]">
                        <span>
                            <xsl:apply-templates select="./@*|./node()"/>
                        </span>
                    </xsl:for-each>
                </p>
                <xsl:for-each select="./*[@class='jrnlAckPara'][./preceding-sibling::*[@class='jrnlAckPara']]">
                    <p>
                        <xsl:apply-templates select="./@*|./node()"/>
                    </p>
                </xsl:for-each>
        </xsl:when>
        <xsl:otherwise>
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="@*|node()"/>
            </xsl:element>
         </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="div[@class='front' or @class='back']//*[@class='jrnlAffGroup'][@removeAffLabel='true']" priority="5">
    	<xsl:element name="{name(.)}">
    	    <xsl:apply-templates select="@*"/>
        	<xsl:choose>
        		<xsl:when test="count(.//*[ends-with(./@class,'jrnlAff')]) = 1">
        			<xsl:for-each select=".//*[ends-with(./@class,'jrnlAff')]">
        				<xsl:element name="{name(.)}">
        				<xsl:apply-templates select="@*|node()except(*[@class='jrnlAffLabel'])"/>
        				</xsl:element>
        			</xsl:for-each>
        		</xsl:when>
        		<xsl:otherwise>
        			<xsl:apply-templates select="@*|node()"/>
        		</xsl:otherwise>
        	</xsl:choose> 
    	</xsl:element>
    </xsl:template>
</xsl:stylesheet>
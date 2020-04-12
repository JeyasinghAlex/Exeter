<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
	<xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="doi"/>
    <xsl:param name="fpage"/>
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
                            <xsl:value-of select="./@interPunc"/>
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
    
     <xsl:template match="//span[@data-class='jrnlExtLink'][@data-href]" priority="5">
        <xsl:choose>
            <xsl:when test="./text()!=''">
                <span class="jrnlExtLink" data-type="uri" data-href="{@data-href}">
                    <a href="{@data-href}" target="_blank" data-mce-href="{@data-href}">
                        <xsl:apply-templates/>
                    </a>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span>
                    <xsl:apply-templates select="@*|node()"/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--<xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5"/>-->
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsGroup']" priority="5">
        <xsl:if test="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
            <xsl:for-each select="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
                <div class="jrnlAbsBox">
                    <xsl:apply-templates select="./@*|./*"/>
                </div>
            </xsl:for-each>
        </xsl:if>
        <div>
            <xsl:apply-templates select="@*"/>
            <xsl:apply-templates select="./*[@class='jrnlAbsHead']"/>
            <p class="jrnlAbsPara">
                <xsl:for-each select="./*[@class='jrnlAbsPara']">
                    <xsl:choose>
                        <xsl:when test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                            <span>
                                <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                            <xsl:text>:</xsl:text>
                            </span>
                            <xsl:text> </xsl:text>
                        </xsl:when>
                    </xsl:choose>
                    <span class="jrnlAbsPara">
                        <xsl:apply-templates select="./node()"/>
                    </span>
                </xsl:for-each>
            </p>
        </div>
    </xsl:template>
     <!--<xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5">
        <xsl:variable name="nextNode" select="following-sibling::*/@class"/>
        <xsl:choose>
            <xsl:when test="$nextNode[contains(.,'jrnlAbsTitle')]"/>
            <xsl:otherwise>
             <h1 class="jrnlAbsHead">
                    <xsl:apply-templates/>
                </h1>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> -->
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
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template>
    <xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlCorrRef']" priority="6"/>
   <!-- <xsl:template match="span[@class='jrnlCorrEmail']" priority="5">
        <p class="jrnlCorrEmail">
            <xsl:apply-templates/>
        </p>
    </xsl:template> -->
    <!--xsl:template match="//*[@class='jrnlConfPara'][1]" priority="5"/-->
	<!--<xsl:template match="//div[@class='jrnlRelArt']" priority="5">
            <p>
                <xsl:apply-templates select="@*|node()except(*[@class = 'jrnlRelArtTitle'])"/>
            </p>
            <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']"/>
    </xsl:template> -->
    
    <xsl:template match="//p[@class='jrnlAff'][@removeNode='true']" priority="5"/>
    
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="."/>
            <xsl:choose>
                <xsl:when test="$journal='berman'">
                    <span class="label">
                        <xsl:value-of select="$labelName"/>
                        <xsl:text> ■ </xsl:text>
                    </span>
                </xsl:when>
                <xsl:otherwise>
                    <span class="label">
                        <xsl:value-of select="$labelName"/>
						<xsl:text>. </xsl:text>
                        <!--<xsl:text> </xsl:text>-->
                    </span>
                </xsl:otherwise>
            </xsl:choose>
    </xsl:template>
<!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:variable name="id" select="./@data-citation-string"/>
        <xsl:variable name="flag">
            <xsl:for-each select="//*[@class='jrnlFirstCitation']">
                <xsl:choose>
                    <xsl:when test="contains(./@data-rid,$id)">true</xsl:when>
                         <xsl:otherwise>false</xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </xsl:variable>
       <xsl:if test="./@data-anchor = 'true'  and not(contains($flag,'true'))">
            <span class="jrnlFirstCitation" data-rid="{./@data-citation-string}"/>
        </xsl:if> 
        <span class="{./@class}" data-citation-string="{./@data-citation-string}">
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
            <xsl:if test="../../p[@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../../p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if>
        </tbody>
    </xsl:template>
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:choose>
                <xsl:when test="$journal = 'berman'">
                    <xsl:apply-templates select=" node()"/>
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
                </xsl:when>
                <xsl:otherwise>
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
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="p[@class='jrnlCorrAff']" priority="5">
        <div class="corrAffAuthor">
            <xsl:variable name="corrEmail" select="./*[@class='jrnlCorrEmail']/node()"/>
			<!--<xsl:variable name="corresName" select="./node() except(*[@class = 'jrnlCorrEmail'])"/>
            <xsl:variable name="corresName" select="replace($corresName, ',\s?$', '')"/>-->
			<xsl:variable name="corresName">
                <xsl:value-of select="./node() except(*[@class = 'jrnlCorrEmail'])"/>
            </xsl:variable>
            <xsl:if test="$corresName !=''">
                <p class="jrnlCorrAff">
    			   <xsl:for-each select="tokenize($corresName,'[,]\s')">
                        <xsl:variable name="corresName" select="replace(., '[,.;]\s$', '')"/>
                        <xsl:variable name="corresName" select="replace($corresName, '\s$', '')"/>
    			        <xsl:if test="$corresName!=''">
        			        <xsl:value-of select="$corresName"/>
        			        <xsl:if test="position()!=last()">
        			            <xsl:text>, </xsl:text>
        			        </xsl:if>
    			        </xsl:if>
    			    </xsl:for-each>
    			   <xsl:text>.</xsl:text>
                </p>
            </xsl:if>
            <xsl:if test="$corrEmail !=''">
                <p class="jrnlCorrEmail">
                    <xsl:text>Email: </xsl:text>
                    <a href="{concat('mailtoff:',$corrEmail)}">
                        <xsl:value-of select="$corrEmail"/>
                    </a>
                </p>
            </xsl:if>    
        </div>
    </xsl:template>
    <xsl:template match="//img[@class='ORCID_IMAGE']" priority="5">
        <xsl:choose>
            <xsl:when test="./preceding-sibling::*[@class='jrnlContribID']|./following-sibling::*[@class='jrnlContribID']">
                <xsl:text> </xsl:text>
                <xsl:variable name="link">
                    <xsl:value-of select="./preceding-sibling::*[@class='jrnlContribID']/text()|./following-sibling::*[@class='jrnlContribID']/text()"/>
                </xsl:variable>
                <xsl:variable name="href">
                    <xsl:value-of select="concat('http://orcid.org/',$link)"/>
                </xsl:variable>
                <xsl:if test="$href !=''">
                    <a href="{$href}">
                        <img>
                            <xsl:if test="./@src">
                                <xsl:attribute name="src">
                                    <xsl:value-of select="replace(./@src,'online',$proof)"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="./@class">
                                <xsl:attribute name="class">
                                    <xsl:value-of select="./@class"/>
                                </xsl:attribute>
                            </xsl:if>
                        </img>
                    </a>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlOrcidGroup']//*[@class='jrnlAuthor']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./*[@class='jrnlGivenName']">
                <xsl:apply-templates select="./*[@class='jrnlGivenName']"/>
            </xsl:if>
            <xsl:if test="./*[@class='jrnlSurName']">
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="./*[@class='jrnlSurName']"/>
            </xsl:if>
            <xsl:if test="./@endPunc">
                <xsl:value-of select="./@endPunc"/>
            </xsl:if>
        </xsl:element>
    </xsl:template>
     <xsl:template match="//*[@class='jrnlOrcidGroup']//*[@class='jrnlContribID']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
              <xsl:variable name="href" select="./text()"/>
            <a href="{$href}">
                <xsl:apply-templates/>
            </a>
        </xsl:element>
    </xsl:template>
    <!--<xsl:template match="*[@class='back']//*[@class='jrnlBio']/p[@class='jrnlBiography']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>-->
    <xsl:template match="*[@class='front']//*[@class='jrnlMetaInfo']//*[@class='jrnlAffGroup']//*[@class='jrnlAff']" priority="5">
        <xsl:choose>
            <xsl:when test="position() = 1">
                <p class="jrnlAff_First">
                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- create Floatblock for marginquote and Construct table for author Query -->
    <xsl:template match="//div[@type='main']" priority="5">
         <div type="main">
			<xsl:apply-templates select="@*"/>
			<xsl:if test="//*[@class='jrnlQueryRef']">
				<div class="floatBlock" id="BLK_AQ" data-stream-name="a_AQ">
					<div class="jrnlQueryBlock" id="BLK_AQ" data-id="BLK_AQ" data-stream-name="a_AQ" type="Query">
						<table data-class="jrnlQueryTbl">
							<thead>
								<tr>
									<th width="34">
										<p class="jrnlQuerySINoHead">No</p>
									</th>
									<th width="308">
										<p class="jrnlCustomMetaQueryHead">Query</p>
									</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="//*[@class='jrnlQueryRef'][@data-type='start'][not(@data-replied='true')]">
									<xsl:variable name="pid" select="position()"/>
									<xsl:variable name="citationID" select="concat(' AQ',$pid,' ')"/>
									<xsl:variable name="currNode" select="@data-citation-string"/>
									
									<xsl:for-each select="//*[@class='jrnlQueryRef'][@data-citation-string=$citationID]">
										<xsl:variable name="rid" select="@data-rid"/>
										<xsl:variable name="queryNode" select="//*[@class='jrnlCustomMetaGroup']//*[@class='jrnlCustomMetaQuery'][@id=$rid]"/>
										<tr>
											<td>
												<p class="jrnlQuerySINo">
													<span class="jrnlQueryTblRef">
														<xsl:apply-templates select="@*[name()='data-citation-string']"/>
														<xsl:value-of select="concat('AQ',$pid)"/>
													</span>
												</p>
											</td>
											<td>
												<p>
													<xsl:apply-templates select="$queryNode/@*"/>
													<xsl:apply-templates select="$queryNode/node()"/>
												</p>
											</td>
										</tr>
									</xsl:for-each>
								</xsl:for-each>
							</tbody>
						</table>
					</div>
				</div>
			</xsl:if>
           <xsl:choose>
                <xsl:when test="$journal='berman'">
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
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    <!--remove margine blockQuote from body part -->
    <xsl:template match="//*[@class='body']//*[@class='jrnlBlockQuote' and @data-type='margin']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal='berman'"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
         </xsl:choose>
    </xsl:template>
    <!-- citation for blockQuote-->
    <xsl:template match="div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin'][not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])]]" priority="7">
         <xsl:choose>
            <xsl:when test="$journal='berman'">
            <xsl:element name="{name(.)}">
                <xsl:apply-templates select="@*|node()"/>
                <xsl:choose>
                    <xsl:when test="not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])"> 
                         <xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']">
                           <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='margin']) + 1"/>
                            <xsl:apply-templates select="@*|node()"/>
						    <span class="jrnlFirstCitationMN" data-rid="{concat('BXMQ',$mblockId)}"/>
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
    <xsl:template match="//div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']]" priority="7">
    <xsl:element name="{name(.)}">
        <xsl:apply-templates select="@*|node()"/>
        <xsl:choose>
			<xsl:when test="$journal='berman'">
				<xsl:variable name="current" select="generate-id(.)"/>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote'and @data-type='margin']">
				   <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='margin']) + 1"/>
				   <xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
						<span class="jrnlFirstCitationMN" data-rid="{concat('BXMQ',$mblockId)}"/>
					</xsl:if>
				</xsl:for-each>
				<xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']">
                   <xsl:variable name="mblockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='margin']) + 1"/>
                   <xsl:if test="not(./preceding-sibling::*[@class]) and $current = generate-id(./following-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
						<span class="jrnlFirstCitationMN" data-rid="{concat('BXMQ',$mblockId)}"/>
					</xsl:if>
			    </xsl:for-each>
			</xsl:when>
        </xsl:choose>
    </xsl:element>
</xsl:template>
    <xsl:template match="//div[@class='WordSection1']" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:choose>
    			<xsl:when test="$journal='berman'">
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="node()except(//*[@class='jrnlRefGroup'])"/>
                    <xsl:for-each select="//*[@type='main']//*[@class='back']//*[@class='jrnlFootNoteFNHead'][./following-sibling::*[@class='jrnlEndNoteList'][./child::*[@class='jrnlFootNote'][@moveOut='true']]]">
                        <div class="jrnlFootNoteFNGroup" moveOut="true">
                            <div class="jrnlBackGroup">    
                                <div class="jrnlFootNoteFNBlock">
                                    <xsl:element name="{name(.)}">
                                    <xsl:apply-templates select="@*"/>
                                       <!-- <xsl:apply-templates select="@*|node()"/> -->
                                       <xsl:variable name="count" select="count(//*[@class='jrnlFootNote'])"/>
                                        <xsl:choose>
                                            <xsl:when test="$count &gt; 1">
                                                <xsl:text>EndNotes</xsl:text>
                                            </xsl:when>
                                            <xsl:when test="$count eq 1">
                                                 <xsl:text>EndNote</xsl:text>
                                            </xsl:when>
                                            <xsl:otherwise/>
                                          </xsl:choose>  
                                    </xsl:element>
                                    <xsl:for-each select="./following-sibling::*[@class='jrnlEndNoteList']">
                                        <xsl:element name="{name(.)}">
                                            <xsl:apply-templates select="@*|node()"/>
                                        </xsl:element>
                                    </xsl:for-each>
                                </div>
                            </div>
                        </div>
                    </xsl:for-each>
                    <xsl:apply-templates select=".//*[@class='jrnlRefGroup']"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='body']//h3[@data-runon='true']" priority="8">
        <xsl:choose>
            <xsl:when test="./following-sibling::*[1][@class='jrnlHead4']">
                <h3 class="jrnlHead3">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                    </span>
                </h3>
            </xsl:when>
            <xsl:otherwise>
                <h3 class="jrnlHead3">
                    <xsl:choose>
                        <xsl:when test="$journal='etp'">
                            <span>
                                <xsl:apply-templates select="@*|node()"/>
                                 <xsl:text>.</xsl:text>
                            </span>
                            <xsl:text> </xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <span>
                                <xsl:apply-templates select="@*|node()"/>
                                 <xsl:text> </xsl:text>
                            </span>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
        				<xsl:apply-templates select="./node()"/>
        			</xsl:for-each>
                </h3>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//div[@class='body']//h4[@data-runon='true']" priority="8">
        <h4 class="jrnlHead4">
            <xsl:choose>
                <xsl:when test="$journal='etp'">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                         <xsl:text>.</xsl:text>
                    </span>
                    <xsl:text> </xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                         <xsl:text> </xsl:text>
                    </span>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
				<xsl:apply-templates select="./node()"/>
			</xsl:for-each>
        </h4>
    </xsl:template>
	<xsl:template match="//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead4'])][./preceding-sibling::*[2][@data-runon='true']]" priority="8"> 
        <p>
            <xsl:attribute name="data-spl-style">
                    <xsl:value-of select="'TXI'"/>
                </xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </p>
    </xsl:template>
	<!-- Remove custom meta data query -->
	<xsl:template match="*[@class='front']/*[@class='jrnlCustomMetaGroup']" priority="5"/>
	<!-- Construct [AQ] for AuthorQuery -->
    <xsl:template match="//*[@class='jrnlQueryRef'][@data-citation-string]" priority="6">
        <span>
            <xsl:apply-templates select="@*"/>
        </span>
    </xsl:template>
	<xsl:template match="//*[@class='jrnlFootNoteFNHead'][./following-sibling::*[@class='jrnlEndNoteList'][./child::*[@class='jrnlFootNote'][not(@moveOut) or @moveOut!='true']]]" priority="5">
        <xsl:variable name="count" select="count(//*[@class='jrnlFootNote'])"/>
        <xsl:choose>
            <xsl:when test="$count &gt; 1">
                <h1 class="jrnlFootNoteFNHead" endNote="true">Notes</h1>
            </xsl:when>
            <xsl:when test="$count eq 1">
                <h1 class="jrnlFootNoteFNHead" endNote="true">Note</h1>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
	</xsl:template>
	<xsl:template match="//*[@class='jrnlBioHead']" priority="5">
        <xsl:variable name="count" select="count(//*[@class='jrnlBio'])"/>
        <xsl:variable name="countAuthor" select="count(//*[@class='jrnlBio_jrnlAuthorGroup'])"/>
        <xsl:choose>
            <xsl:when test="$count &gt; 1 or $countAuthor &gt; 1">
                <h1 class="jrnlBioHead" bookMark-level="{./@bookMark-level}">Author Biographies</h1>
            </xsl:when>
            <xsl:when test="$count eq 1 or $countAuthor eq 1">
                <h1 class="jrnlBioHead" bookMark-level="{./@bookMark-level}">Author Biography</h1>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
	</xsl:template>
    <xsl:template match="p[@class='jrnlFootNotePara']//span[@class='label' or @data-class='label']" priority="5"/>
	<xsl:template match="//*[@class='jrnlQueryRef'][@data-type='end']|//*[@class='jrnlQueryRef'][@data-replied]" priority="5"/>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="8"/>
    <xsl:template match="*[@class='back']//*[@class='jrnlEndNoteList'][./child::*[@class='jrnlFootNote'][@moveOut='true']]" priority="5"/>
    <xsl:template match="*[@class='back']//*[@class='jrnlFootNoteFNHead'][./following-sibling::*[@class='jrnlEndNoteList'][./child::*[@class='jrnlFootNote'][@moveOut='true']]]" priority="5"/>
    <xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlContribID']" priority="5"/>
    <xsl:template match="*[@class='back']//*[@class='jrnlJournalInfo']" priority="5"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <xsl:template match="//div[@class='body']/*[@class='jrnlConfFNGroup']" priority="5"/>
	<!--<xsl:template match="@*[not(normalize-space())]"/>-->
</xsl:stylesheet>
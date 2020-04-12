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
    <xsl:variable name="jrnlArtTypeCode">
        <xsl:choose>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'In Memoriam')">
                <xsl:text>01</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Editorial')">
                <xsl:text>02</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Guest Editorial')">
                <xsl:text>03</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Commentary')">
                <xsl:text>04</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Foreword')">
                <xsl:text>05</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Preface')">
                <xsl:text>06</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Retrospectives')">
                <xsl:text>07</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Review Article')">
                <xsl:text>08</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Photogallery')">
                <xsl:text>09</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Research Papers')">
                <xsl:text>10</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Technology Reviews')">
                <xsl:text>40</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Technical Briefs')">
                <xsl:text>45</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Design Innovation Papers')">
                <xsl:text>50</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Discussions')">
                <xsl:text>55</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Closures')">
                <xsl:text>60</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Book Reviews')">
                <xsl:text>65</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Errata')">
                <xsl:text>70</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlArtType']//*[@class='jrnlSubject'],'Announcements')">
                <xsl:text>80</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>00</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:template match="//*[@class='jrnlIssueArtCode']//*[@class='jrnlArtTypeCode']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:value-of select="$jrnlArtTypeCode"/>
        </xsl:element>
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
    <!--<xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlCorrRef']" priority="6"/>-->
    <xsl:template match="//*[@class='jrnlAffGroup'][@removeNode='true']" priority="5"/>
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="."/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
            <xsl:text> </xsl:text>
        </span>
    </xsl:template>
<!-- Moved this firstcitation template match to structure.xsl -->
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
            <xsl:for-each select="tokenize($id,',')">
                <xsl:variable name="currentID" select="."/>
                <xsl:choose>
                    <xsl:when test="$node/preceding::span[contains(@data-citation-string, $currentID)]"/>
                    <xsl:otherwise>
                        <xsl:attribute name="data-citation-first" select="'true'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
            <xsl:apply-templates select="node()"/>
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
    </xsl:template>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlFootNoteFNHead']" priority="5">
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
	<xsl:template match="//div[@class='body']//h2[@data-runon='true']" priority="5">
        <h2 class="jrnlHead2">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            </span>
            <xsl:text>. </xsl:text>
            <span>
                <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()"/>
            </span>
        </h2>
    </xsl:template>
    <xsl:template match="//div[@class='body']//h2[@data-runon='true']" priority="8">
        <xsl:choose>
            <xsl:when test="./following-sibling::*[1][@class='jrnlHead3']">
                <h2 class="jrnlHead2">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                    </span>
                </h2>
            </xsl:when>
            <xsl:otherwise>
                <h2 class="jrnlHead2">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                         <xsl:text>.</xsl:text>
                    </span>
                    <xsl:text> </xsl:text>
                    <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
        				<xsl:apply-templates select="./node()"/>
        			</xsl:for-each>
                </h2>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//div[@class='body']//h3[@data-runon='true']" priority="8">
        <h3 class="jrnlHead3">
            <span>
                <xsl:apply-templates select="@*|node()"/>
                 <xsl:text>.</xsl:text>
            </span>
            <xsl:text> </xsl:text>
            <xsl:for-each select="./following-sibling::*[1][@class='jrnlSecPara']">
				<xsl:apply-templates select="./node()"/>
			</xsl:for-each>
        </h3>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead3'])][./preceding-sibling::*[2][@data-runon='true']]" priority="8"> 
        <p>
            <xsl:attribute name="data-spl-style">
                <xsl:value-of select="'TXI'"/>
            </xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </p>
    </xsl:template>
    <xsl:template match="*[@class='body']//*[contains(@class,'jrnlHead')]/span[@data-content-type='label']" priority="5">
		<xsl:element name="{name(.)}">
		<xsl:apply-templates select=" @* "/>
			<xsl:attribute name="class">
				<xsl:value-of select="'label'"/>
			</xsl:attribute>
			<xsl:apply-templates select=" node() "/>
			<xsl:text> </xsl:text>
		</xsl:element>
	 </xsl:template>
	 <xsl:template match="*[@class='jrnlAuthorGroup']" priority="5">
         <div class="jrnlAuthorGroup">
            <xsl:apply-templates select="@*"/>
            <div class="jrnlAuthorBlock">
                <p>
                    <xsl:apply-templates select="./*[@class='jrnlAuthor']/@*|./*[@class='jrnlAuthor']/node()except(.//*[@class='jrnlPrefix'])"/>
                    <xsl:if test="./*[@class='jrnlCorrRef']">
                        <span>
                            <xsl:apply-templates select="./*[@class='jrnlCorrRef']/@*"/>
                            <xsl:text>1</xsl:text>
                        </span>
                    </xsl:if>
                </p>
            </div>
            <div>
				<xsl:variable name="affCount" select="count(./*[@class='jrnlAff'])"/>
                <xsl:apply-templates select="./*[@class='jrnlAff']/@*"/>
                <p>
                    <xsl:apply-templates select="./*[@class='jrnlAuthor']//*[@class='jrnlPrefix']/@*|./*[@class='jrnlAuthor']//*[@class='jrnlPrefix']/node()"/>
                </p>
                <xsl:for-each select="./*[@class='jrnlAff']">
                    <xsl:element name="{name(.)}">
                        <xsl:apply-templates select="./@*|./node()except(*[@class='jrnlAddressInfo'])"/>
                        <p>
                            <xsl:apply-templates select="./*[@class='jrnlAddressInfo']/@*|./*[@class='jrnlAddressInfo']/node()"/>
                            <xsl:if test="$affCount > 1 and position() != $affCount">
                                <xsl:text>;</xsl:text>
                            </xsl:if>
                        </p>
                    </xsl:element>
                </xsl:for-each>
                <xsl:variable name="authorEmail" select="./*[@class='jrnlEmail']/node()"/>
                <xsl:if test="$authorEmail !=''">
                    <p>
                        <xsl:apply-templates select="./*[@class='jrnlEmail']/@*"/>
                        <xsl:text>e-mail: </xsl:text>
                        <a href="{concat('mailto:',$authorEmail)}">
                            <xsl:value-of select="$authorEmail"/>
                        </a>
                    </p>
                </xsl:if>
            </div>
         </div>
    </xsl:template>
	<xsl:template match="*[@class='jrnlAbsGroup']/*[@class='jrnlAbsPara']" priority="5">
        <xsl:element name="{name(.)}">
		    <xsl:apply-templates select=" @* |node()"/>
		    <span>
	           <xsl:apply-templates select="//*[@class='front']//*[@class='jrnlDOI']/@*"/>
		        <xsl:if test="//*[@class='front']//*[@class='jrnlDOI']/@startPunc">
                    <xsl:value-of select="//*[@class='front']//*[@class='jrnlDOI']/@startPunc"/>
                </xsl:if>
		        <xsl:apply-templates select="//*[@class='front']//*[@class='jrnlDOI']/node()"/>
		        <xsl:if test="//*[@class='front']//*[@class='jrnlDOI']/@endPunc">
                    <xsl:value-of select="//*[@class='front']//*[@class='jrnlDOI']/@endPunc"/>
                </xsl:if>
		    </span>
		</xsl:element>
    </xsl:template>
	<xsl:template match="*[@class='jrnlEqnPara']/span[@class='jrnlEqnLabel']" priority="5">
        <xsl:element name="{name(.)}">
		    <xsl:apply-templates select=" @*"/>
		    <xsl:attribute name="data-spl-style">
				<xsl:value-of select="./@class"/>
			</xsl:attribute>
		    <xsl:apply-templates select="node()"/>
		</xsl:element>
    </xsl:template>
	<xsl:template match="//*[@class='jrnlRefText']//*[@class='RefJournalTitle']" priority="5">
        <xsl:variable name="doi" select="replace(..//*[@class='RefDOI'],'doi:','')"/>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:element name="{name(.)}">
		    <xsl:apply-templates select=" @*"/>
            <xsl:choose>
                <xsl:when test="..//*[@class='RefDOI']">
                    <a href="{$doi}">
                        <xsl:apply-templates select="node()"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlRefText']//*[@class='RefDOI']" priority="5"/>
	<xsl:template match="//div[@class='front']//p[@class='jrnlArtType']" priority="6"/>
	<xsl:template match="//div[@class='front']//p[@class='jrnlDOI']" priority="6"/>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="6"/>
    <xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlContribID']" priority="5"/>
    <xsl:template match="p[@class='jrnlFootNotePara']//span[@class='label' or @data-class='label']" priority="5"/>
    <xsl:template match="*[@class='back']//*[@class='jrnlJournalInfo']" priority="5"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <xsl:template match="//div[@class='body']/*[@class='jrnlConfFNGroup']" priority="5"/>
</xsl:stylesheet>
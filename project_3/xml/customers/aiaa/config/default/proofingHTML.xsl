<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="journalID"/>
    <xsl:param name="subArticleID"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="fpage"/>
    <xsl:param name="pageType"/>
	<xsl:param name="issueMakeup"/>
	<xsl:param name="issuePrefix"/>
    <xsl:param name="doi"/>
    <xsl:param name="stage"/>
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
    <xsl:template match="//div[@class='front']//*[@class='jrnlCopyrightStmt']" priority="5">
        <span class="jrnlCopyrightStmt">
            <xsl:apply-templates select=" @* "/>
            <xsl:text>. </xsl:text>
            <xsl:apply-templates/>
        </span>
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
    <xsl:template match="//div[@class='front']" priority="5">
        <div class="front" cmsID="{$cmsID}" journal-id="{$journal}" fpage="{$fpage}">
            <xsl:apply-templates select="@*|node()"/>
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
    <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template>
	<!-- Moved this firstcitation template match to structure.xsl -->
    <!-- <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:variable name="id" select="./@data-citation-string"/>
         <xsl:variable name="citationid" select="replace($id, '^\s+|\s+$', '')"/>
         <xsl:variable name="currnode" select="current()"/>
        <xsl:variable name="flag">
			<xsl:for-each select="//*[@class='jrnlFirstCitation']">
                <xsl:choose>
                    <xsl:when test="contains(./@data-rid,$id)">true</xsl:when>
                         <xsl:otherwise>false</xsl:otherwise>
                </xsl:choose>
            </xsl:for-each> 
            <xsl:for-each select="tokenize($citationid,' ')">
                <xsl:variable name="currentCitationID" select="concat(' ',.,' ')"/>
                    <xsl:choose>
                        <xsl:when test="$currnode/preceding::span[@class='jrnlFirstCitation'][contains(./@data-rid, $currentCitationID)]">true</xsl:when>
                        <xsl:when test="$currnode/following::span[@class='jrnlFirstCitation'][contains(./@data-rid, $currentCitationID)]">true</xsl:when>
                        <xsl:otherwise>false</xsl:otherwise>
                    </xsl:choose>
           </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="curCitationId" select="./@data-citation-string"/>
       <xsl:if test="./@data-anchor = 'true'  and not(contains($flag,'true')) and $curCitationId !='' and not(./@data-p-skip-citation)">
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
    <!--<xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
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
    </xsl:template> -->
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefWebsite' or @class='RefDOI'][not(./following-sibling::*[@class])]" priority="5">
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
    <xsl:template match="//p[@class='jrnlCorrAffHead']" priority="5">
        <xsl:if test="not(//div[@class='front']//*[@class='jrnlAffGroup'])">
            <p class="jrnlCorrAffHeadNoAff">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
        <xsl:if test="//div[@class='front']//*[@class='jrnlAffGroup']">
            <p class="jrnlCorrAffHead">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
    </xsl:template>
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
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
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
    </xsl:template>
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
     <xsl:if test=". != ''">
        <xsl:choose>
            <xsl:when test="$journal='jat'">
                <xsl:variable name="labelName" select="concat(.,' ')"/>
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
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="@*[not(normalize-space())]"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
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
</xsl:stylesheet>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
	<xsl:param name="journalID"/>
    <xsl:param name="cmsID"/>
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
    
   
    <xsl:template match="//div[@class='front']" priority="5">
		<xsl:variable name="journal-id">
            <xsl:choose>
                <xsl:when test="$journalID != '' ">
                    <xsl:value-of select="$journalID"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$journal"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div class="front" cmsID="" journal-id="{$journal-id}" fpage="{$fpage}" proof-type="{$proof}">
            <xsl:apply-templates select="@*[name()!='journal-id']|node()"/>
        </div>
    </xsl:template>
   <!-- Moved this firstcitation template match to structure.xsl -->
    <!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
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
    
    
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="concat(.,' ')"/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
        </span>
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
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="@*[not(normalize-space())]"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
   
	
    
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
</xsl:stylesheet>
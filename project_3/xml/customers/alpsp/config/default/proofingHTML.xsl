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
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']" priority="5">
        <p class="jrnlAbsPara">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlCorrRef']" priority="6"/>
    <xsl:template match="//p[@class='jrnlAff'][@removeNode='true']" priority="5"/>
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="."/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
            <xsl:text>&#x2003;</xsl:text>
        </span>
    </xsl:template>
<!-- Moved this firstcitation template match to structure.xsl -->
    <!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
	<xsl:variable name="citationString" select="./@data-citation-string"/>
        <xsl:if test="./@data-anchor = 'true' and not(contains($citationString,' FS')) and not(contains($citationString,' TS'))">
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
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <div>
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
    <xsl:template match="p[@class='jrnlCorrAff']" priority="5">
        <div class="corrAffAuthor">
            <xsl:variable name="corrEmail" select="./*[@class='jrnlCorrEmail']/node()"/>
			<xsl:variable name="corresName" select="./node() except(*[@class = 'jrnlCorrEmail'])"/>
            <xsl:variable name="corresName" select="replace($corresName, ',\s?$', '')"/>
           <!-- <p class="jrnlCorrAff">
                <xsl:if test="./@startPunc">
                    <xsl:value-of select="./@startPunc"/>
                </xsl:if>
               
			   <xsl:value-of select="$corresName"/>
            </p> -->
            <p class="jrnlCorrEmail">
                <xsl:text>Email: </xsl:text>
                <xsl:variable name="href">
                    <xsl:value-of select="concat('mailto:',$corrEmail)"/>
                </xsl:variable>
                <a href="{$href}">
                    <xsl:value-of select="$corrEmail"/>
                </a>
            </p>
        </div>
    </xsl:template>
    <xsl:template match="//img[@class='ORCID_IMAGE']" priority="5">
        <xsl:choose>
            <xsl:when test="./preceding-sibling::*[@class='jrnlContribID']|./following-sibling::*[@class='jrnlContribID']">
                <xsl:text> </xsl:text>
                <xsl:variable name="href">
                    <xsl:value-of select="concat('http://orcid.org/',./preceding-sibling::*[@class='jrnlContribID']/text())"/>
                    </xsl:variable>
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
         <xsl:if test="./node()">
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="@*"/>
                  <xsl:variable name="href" select="concat('http://orcid.org/',./text())"/>
                <a href="{$href}">
                    <xsl:apply-templates/>
                </a>
            </xsl:element>
        </xsl:if>
    </xsl:template>
    <xsl:template match="*[@class='back']//*[@class='jrnlBio']/p[@class='jrnlBiography']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>
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
    <xsl:template match="div[@class='jrnlOrcidGroup']/*[@class='jrnlOrcidAuthors']//*[@class='jrnlAuthorGroup']" priority="6">
        
        <xsl:choose>
            <xsl:when test="./child::*[@class='jrnlContribID'][./node()]">
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@* | node()"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='front']/*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlContribID']" priority="6"/>
    <xsl:template match="*[@class='front']/*[@class='jrnlAuthors']//p[@class='jrnlOrcid']" priority="5">
        <span>
            <xsl:apply-templates select="@* | node()"/>
        </span>
    </xsl:template>
    <xsl:template match="div[@class='front']//*[@class='jrnlAffGroup'][@removeAffLabel='true']" priority="5">
    	<xsl:element name="{name(.)}">
    	<xsl:apply-templates select="@*"/>
    	<xsl:choose>
    		<xsl:when test="count(.//*[@class='jrnlAff']) = 1">
    			<xsl:for-each select=".//*[@class='jrnlAff']">
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
    <xsl:template match="*[@class='back']//*[@class='jrnlJournalInfo']" priority="5"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <xsl:template match="//div[@class='body']/*[@class='jrnlConfFNGroup']" priority="5"/>
    <xsl:template match="//*[@class='jrnlBio'][./*[@class='jrnlFigBlock']]" priority="6">
         <xsl:element name="{./name()}">
             <xsl:apply-templates select="@*"/>
             <xsl:variable name="name" select="./*[@class='jrnlBiography']"/>
             <img class="">
                <xsl:attribute name="src">
                    <xsl:value-of select="./*[@class='jrnlFigBlock']//img/@src"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                    <xsl:value-of select="./*[@class='jrnlFigBlock']//img/@alt"/>
                </xsl:attribute>
            </img>
             <xsl:apply-templates select="$name"/>
         </xsl:element>
     </xsl:template>
	<!--<xsl:template match="@*[not(normalize-space())]"/>-->
</xsl:stylesheet>
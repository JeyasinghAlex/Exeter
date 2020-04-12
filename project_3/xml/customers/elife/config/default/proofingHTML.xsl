<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="template"/>
    <xsl:param name="journal"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="doi"/>
    <xsl:param name="fpage"/>
    <xsl:param name="pdfType"/>
    <xsl:param name="article">
        <emj>
            <type>Primary survey</type>
        </emj>
    </xsl:param>
    <xsl:variable name="journalList" as="element()*">
        <item>ebm</item>
        <item>ebn</item>
    </xsl:variable>
    <xsl:output method="xml" indent="no"/>
    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
     <xsl:template match="//div[@class='front']" priority="5">
        <div class="front" cmsID="{$cmsID}" doi="{$doi}" journal-id="{$journal}" fpage="{$fpage}" proof-type="{$proof}" watermark="{$watermark}">
        <xsl:apply-templates select="@*|node()"/> 
        <!--<xsl:if test="$pdfType != ''">
            <xsl:attribute name="prefix" select="$pdfType"/>
        </xsl:if>
            -->
            <!--<xsl:choose>
            <xsl:when test="contains($pdfType,'figure')">
                <xsl:attribute name="prefix" select="'figurePDF'"/>
            </xsl:when>
            <xsl:otherwise>
             <xsl:attribute name="prefix" select="./@prefix"/>
            </xsl:otherwise>
        </xsl:choose>
            <xsl:apply-templates select="@*[name()!='prefix']|node()"/> -->
        </div>
    </xsl:template>
    <xsl:template match="*[@*[contains(., 'Punc')]]|*[@*[contains(., removeString)]]">
        <xsl:variable name="class" select="./@class"/>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:value-of select="./@startPunc"/>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
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
        </xsl:element>
    </xsl:template>
    <xsl:template match="p[@class='jrnlSecPara']" priority="5">
        <xsl:choose>
            <xsl:when test="./p[@class='jrnlCodePara']">
                <p class="jrnlSecPara">
                    <xsl:apply-templates select="@*[name()!='class']|node()[not(@class='jrnlCodePara')]"/>
                </p>
                <xsl:apply-templates select="./p[@class='jrnlCodePara']"/>
            </xsl:when>
            <xsl:when test="node()!=''">
                <xsl:choose>
                    <xsl:when test="$template[contains(.,'template')]">
                        <xsl:choose>
                            <xsl:when test="not(./preceding::*[@class='jrnlSecPara'])">
                                <p class="jrnlSecPara">
                                    <xsl:attribute name="data-spl-style">
        								<xsl:value-of select="'DropCap-TXT'"/>
        							</xsl:attribute>
                                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                    <xsl:if test="//div[@class='front']//*[@class='jrnlBoxBlock'][@data-rel-box='true']">
        							    <span class="jrnlFirstCitation" data-rid="BX1"/>
        							</xsl:if>
                                </p>
                            </xsl:when>
                            <xsl:otherwise>
                                <p class="jrnlSecPara">
                                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                                </p>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                        <p class="jrnlSecPara">
                            <xsl:apply-templates select="@*[name()!='class']|node()"/>
                        </p>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
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
    <xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5"/>
    <xsl:template match="//div[@class='front']//*[@class='jrnlAbsPara'][not(./preceding::*[@class='jrnlAbsPara'])]" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <xsl:if test="../*[@class='jrnlAbsHead']">
                <span class="jrnlAbsHead">
                    <xsl:apply-templates select="../*[@class='jrnlAbsHead']/@*|../*[@class='jrnlAbsHead']/node()"/> 
                </span>
                <xsl:text> </xsl:text>
            </xsl:if>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="*[@class='jrnlEditors']/span[@class='jrnlAff'][@removeNode='true']" priority="5"/>
    <!--<xsl:template match="*[@class='jrnlGroupAuthorBlock']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <xsl:apply-templates select="./*[@class='jrnlGroupAuthorHead']"/>
            <xsl:for-each select="//*[@class='jrnlAuthorGroup'][./*[@class='jrnlGrpAuthRef']]">
                <div class="jrnlGroupAuthors">
                    <p class="jrnlCollaboration">
                        <xsl:value-of select="./*[@class='jrnlCollaboration']"/>
                    </p>
                    <xsl:for-each select="./*[@class='jrnlGrpAuthRef']">
                        <xsl:variable name="rid" select="@data-rid"/>
                        <xsl:variable name="contribGrpNode" select="//*[@class='jrnlGroupAuthors'][@id=$rid]"/>
                        <xsl:if test="$contribGrpNode//*[@class='jrnlRole']">
                            <xsl:element name="p">
                                <xsl:apply-templates select="$contribGrpNode/*[@class='jrnlRole']/@*"/>
                                 <xsl:apply-templates select="$contribGrpNode/*[@class='jrnlRole']/node()"/>
                            </xsl:element>
                        </xsl:if>
                        <p class="jrnlGrpAuthorBlock">
                            <xsl:for-each select="$contribGrpNode/*[@class='jrnlGroupAuthor']">
                                <span class="jrnlGroupAuthor">
                                    <span class="jrnlAuthor">
                                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                        <xsl:text> </xsl:text>
                                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                    </span>-->
                                    <!--<xsl:variable name="affID">
                                        <xsl:sequence select="replace(replace(./*[@class='jrnlAffRef']/@data-rid, '^\s*(.+?)\s*$', '$1'), '^ .*$', '')"/>
                                    </xsl:variable>-->
                                    <!--<xsl:text>: </xsl:text>
                                    <xsl:for-each select="./*[@class='jrnlAffRef']">
                                        <xsl:variable name="id" select="./@data-rid"/>
                                        <xsl:element name="span">
                                            <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/@*"/>
                                             <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/node()"/>
                                        </xsl:element>
                                        <xsl:text>; </xsl:text>
                                    </xsl:for-each>
                                </span>
                            </xsl:for-each>
                        </p>
                    </xsl:for-each>
                </div>
            </xsl:for-each>
        </xsl:element>
    </xsl:template> -->

    <xsl:template match="*[@class='jrnlDigestBlock']" priority="5">
	    <div class="jrnlBoxBlock" data-type="DIGEST">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </div>
    </xsl:template>
    <xsl:template match="*[@class='jrnlDigestBlock']//*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnleLifeDigestBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
    <xsl:template match="*[@class='jrnlBoxBlock']/*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnlBoxBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
    <xsl:template match="*[@class='jrnlTblBlock']/*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnlTblBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
    <xsl:template match="*[@class='jrnlFigBlock']/*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnlFigBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
    <xsl:template match="*[@class='jrnlVidBlock']/*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnlVidBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
	<xsl:template match="*[@class='floatBlock']//*[(matches(@class, 'jrnl(.*?)BlockGroup'))]//*[@class='jrnlSupplBlock']/*[@class='jrnlBlockDOI']" priority="5">
	    <p class="jrnlSupplBlockDOI">
	        <xsl:apply-templates select="@*[name()!='class']|node()"/>
	    </p>
    </xsl:template>
    <xsl:template match="*[@class='jrnlConFNBlock']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <!-- <xsl:apply-templates select="./*[@class='jrnlConHead']"/> -->
            <xsl:apply-templates select="./*[contains(@class,'jrnlConHead')]"/>
            <p class="jrnlConFNGroup">
                <xsl:variable name="authorCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
                <xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']]">
                    <xsl:variable name="position" select="position()"/>
                    <span class="jrnlAuthorGroup">
                        <xsl:if test="./*[@class='jrnlAuthor']">
                            <span class="jrnlAuthor">
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                <!--<xsl:text> </xsl:text>-->
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                            </span>
                            <xsl:text>, </xsl:text>
                            <span class="jrnlConFN">
                                <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                              <!--  <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@* | //*[@class='jrnlConFN'][@id=$conRefID]/node()"/>-->
                               <!-- <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@*"/>
                                <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/node()"/>-->
                                <xsl:variable name="conFNCount">
                                    <xsl:value-of select="count(//*[@class='jrnlConFN'][@id=$conRefID])"/>
                                </xsl:variable>
                                <xsl:for-each select="//*[@class='jrnlConFN'][@id=$conRefID]/node()">
                                    <xsl:apply-templates select="."/>
                                    <xsl:if test="position() &lt; $conFNCount">
                                        <xsl:text>, </xsl:text>
                                    </xsl:if>
                                </xsl:for-each>
                                <xsl:if test="$authorCount &gt; $position">
                                    <xsl:text>; </xsl:text>
                                </xsl:if>
                            </span>
                        </xsl:if>
                        <xsl:if test="./*[@class='jrnlCollaboration']">
                            <xsl:apply-templates select="./*[@class='jrnlCollaboration']"/>
                            <xsl:text>, </xsl:text>
                            <xsl:choose>
                                <xsl:when test="./*[@class='jrnlConRef']/@data-rid">
                                    <span class="jrnlConFN">
                                        <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                                        <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@* "/>
                                         <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/node()"/>
                                        <xsl:if test="$authorCount &gt; $position">
                                            <xsl:text>; </xsl:text>
                                        </xsl:if>
                                    </span>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:for-each select=".//*[@class='jrnlGrpAuthRef']">
                                        <xsl:variable name="grpAuthID" select="./@data-rid"/>
                                        <xsl:variable name="grpAuthCount" select="count(//*[@class='jrnlGroupAuthors'][@id=$grpAuthID]/*[@class='jrnlGroupAuthor'][./*[@class='jrnlConRef']])"/>
                                        <xsl:for-each select="//*[@class='jrnlGroupAuthors'][@id=$grpAuthID]/*[@class='jrnlGroupAuthor'][./*[@class='jrnlConRef']]">
                                            <xsl:variable name="pos" select="position()"/>
                                            <span class="jrnlAuthor">
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                                <xsl:text> </xsl:text>
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                            </span>
                                            <xsl:text>, </xsl:text>
                                            <span class="jrnlConFN">
                                                <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                                                <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@* | //*[@class='jrnlConFN'][@id=$conRefID]/node()"/>
                                                <xsl:if test="$authorCount &gt; $position or $grpAuthCount &gt; $pos">
                                                    <xsl:text>; </xsl:text>
                                                </xsl:if>
                                            </span>
                                        </xsl:for-each>
                                    </xsl:for-each>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:if>
                    </span>
                </xsl:for-each>
            </p>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="*[@class='jrnlConfFNBlock']" priority="5">
      
            <xsl:variable name="noneID" select="//*[@class='jrnlConfFN'][contains(translate(.,$uppercase,$smallcase),'no competing interest') or contains(translate(.,$uppercase,$smallcase),'none')]/@id"/>
           <!-- <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'][@data-rid=$noneID])"/>-->
           <xsl:variable name="noneCount" select="count($noneID)"/>
            <xsl:variable name="authorsCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
             <xsl:choose>
            <xsl:when test="$authorsCount = $noneCount">
            </xsl:when>
            <xsl:otherwise>
              <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <xsl:apply-templates select="./*[@class='jrnlConfHead']"/>
            <p class="jrnlConfFNGroup">
                <xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][(./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']) and ./*[@class='jrnlConfRef'][not(@data-rid=$noneID)]]">
                    <span class="jrnlAuthorGroup">
                        <xsl:if test="./*[@class='jrnlAuthor']">
                            <span class="jrnlAuthor">
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                <!--<xsl:text> </xsl:text>-->
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                            </span>
                        </xsl:if>
                        <xsl:apply-templates select="./*[@class='jrnlCollaboration']"/>
                        <xsl:text>: </xsl:text>
                        <span class="jrnlConfFN">
                            <xsl:variable name="confRefID" select="./*[@class='jrnlConfRef']/@data-rid"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/@*"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/node()"/>
                            <xsl:text>. </xsl:text>
                        </span>
                    </span>
                </xsl:for-each>
                <xsl:choose>
                    <xsl:when test="$authorsCount = $noneCount">
                        <xsl:choose>
                            <xsl:when test="$noneCount = 1">
                                <xsl:text>The author declares that no competing interests exist.</xsl:text>
                            </xsl:when>
                            <xsl:when test="$noneCount &gt; 1">
                                <xsl:text>The authors declare that no competing interests exist.</xsl:text>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:when test="$authorsCount &gt; $noneCount">
                        <xsl:choose>
                            <xsl:when test="$noneCount = 1">
                                <xsl:text>The other author declares that no competing interests exist.</xsl:text>
                            </xsl:when>
                            <xsl:when test="$noneCount &gt; 1">
                                <xsl:text>The other authors declare that no competing interests exist.</xsl:text>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                </xsl:choose>
            </p>
        </xsl:element>
        </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='jrnlCompInt'][@getconffn='true']" priority="5">
        <xsl:variable name="noneID" select="//*[@class='jrnlConfFN'][contains(translate(.,$uppercase,$smallcase),'no competing interest') or contains(translate(.,$uppercase,$smallcase),'none')]/@id"/>
           <!-- <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'][@data-rid=$noneID])"/>-->
           <xsl:variable name="noneCount" select="count($noneID)"/>
            <xsl:variable name="authorsCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
            <xsl:choose>
            <xsl:when test="$authorsCount != $noneCount">
                <p class="jrnlCompInt">
                    <span class="jrnlCompIntHead">Competing interest: </span>
                    <span class="jrnlCompIntPointer">See page</span>   
                </p>
            </xsl:when>
            <xsl:otherwise>
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="./@*"/>
                <xsl:apply-templates select="./*[@class='jrnlCompIntHead']"/>
                <span class="jrnlConfFN">
                    <xsl:choose>
                        <xsl:when test="$authorsCount = $noneCount">
                            <xsl:choose>
                                <xsl:when test="$noneCount = 1">
                                    <xsl:text>The author declares that no competing interests exist.</xsl:text>
                                </xsl:when>
                                <xsl:when test="$noneCount &gt; 1">
                                    <xsl:text>The authors declare that no competing interests exist.</xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:when test="$authorsCount &gt; $noneCount">
                            <xsl:choose>
                                <xsl:when test="$noneCount = 1">
                                    <xsl:text>The other author declares that no competing interests exist.</xsl:text>
                                </xsl:when>
                                <xsl:when test="$noneCount &gt; 1">
                                    <xsl:text>The other authors declare that no competing interests exist.</xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>
                    </span>
            </xsl:element>
        </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlConfFNPara'][not(//*[@class='jrnlConfFNBlock'])]" priority="5">
        <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'])"/>
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test="$noneCount = 1">
                    <xsl:text>The author declares that no competing interests exist.</xsl:text>
                </xsl:when>
                <xsl:when test="$noneCount &gt; 1">
                    <xsl:text>The authors declare that no competing interests exist.</xsl:text>
                </xsl:when>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
   <!-- <xsl:template match="//*[@class='jrnlOrcidGroup']//*[@class='jrnlGivenName']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlOrcidGroup']//*[@class='jrnlSuffix']" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>-->
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
            <xsl:if test="./*[@class='jrnlSuffix']">
                <xsl:text> </xsl:text>
                <xsl:apply-templates select="./*[@class='jrnlSuffix']"/>
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
    <xsl:template match="//img[@class='ORCID_IMAGE']" priority="5">
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
    </xsl:template>
    <xsl:template match="//*[@class='jrnlAppBlock']" priority="5">
        <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'])"/>
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./*[@class='jrnlAppHead1']">
                <xsl:element name="{./*[@class='jrnlAppHead1']/name()}">
                    <xsl:apply-templates select="./*[@class='jrnlAppHead1']/@*|./*[@class='jrnlAppHead1']/node()"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="./*[@class='jrnlBlockDOI']">
                <xsl:element name="{./*[@class='jrnlBlockDOI']/name()}">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'jrnlAppBlockDOI'"/>
                    </xsl:attribute>
                    <xsl:apply-templates select="./*[@class='jrnlBlockDOI']/@*[name()!='class']|./*[@class='jrnlBlockDOI']/node()"/>
                </xsl:element>
            </xsl:if>
            <xsl:if test="./*[not(@class='jrnlBlockDOI' or @class='jrnlAppHead1')]">
                <!--<div class="jrnlBoxBlock"> -->
                    <xsl:apply-templates/>
              <!--  </div> -->
            </xsl:if>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlAppBlock']/*[@class='jrnlAppHead1']|//*[@class='jrnlAppBlock']/*[@class='jrnlBlockDOI']" priority="5"/>
    <xsl:template match="//div[@class='body']//h3[@data-runon='true']" priority="5">
        <h3 class="jrnlHead3">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            </span>
            <xsl:text>: </xsl:text>
            <span>
                <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()"/>
            </span>
        </h3>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="6"/>
    <xsl:template match="div[@class='body'][../..//*[@class='jrnlDigestBlock']]/*[not(matches(@class, 'jrnl(.*?)Block'))][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <span class="jrnlFirstCitation">
                <xsl:attribute name="data-rid">
                    <xsl:value-of select="replace(//*[@class='jrnlDigestBlock'][1]/@id,'BLK_','')"/>
                </xsl:attribute>
            </span>
        </xsl:element>
    </xsl:template>
        <xsl:template match="//div[@type='main']//h1[@class='jrnlDigestCaption']" priority="5">
        <h1 class="jrnlDigestCaption">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            </span>
            <xsl:text> </xsl:text>
            <span>
                <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlDigestText']/@*|./following-sibling::*[1][@class='jrnlDigestText']/node()"/>
            </span>
      </h1>
    </xsl:template>
    <xsl:template match="//div[@type='main']//p[@class='jrnlDigestText'][./preceding-sibling::*[1][@class='jrnlDigestCaption']]" priority="6"/>
<!-- Moved this firstcitation template match to structure.xsl -->
<!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:if test="./@data-anchor = 'true' and not(contains(./@data-citation-string,'-S'))">
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
            <!--xsl:if test="./ancestor::*[@class='jrnlTblBlock']//p[@class='jrnlTblFoot']"-->
            <!--xsl:if test="../../p[@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../../p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if-->
            <xsl:if test="../following-sibling::p[@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../following-sibling::p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if>
        </tbody>
    </xsl:template>
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
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
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']" priority="5">
        <p class="jrnlRefText">
           <!-- <xsl:apply-templates select="@*|node()"/> -->
           <xsl:apply-templates select="@*"/>
           <xsl:variable name="countRefAuthor" select="count(.//*[@class='RefAuthor'])"/>
           <xsl:if test="./*[@class='RefAuthor'][position() eq 1]">
                <xsl:choose>
                    <xsl:when test="$countRefAuthor &lt; 20">
                        <xsl:for-each select="./*[@class='RefAuthor']">
                            <xsl:element name="{./name()}">
                                <xsl:apply-templates select="./@*|./node()"/>
                            </xsl:element>
                            <xsl:apply-templates select="./following-sibling::text()[1]"/>
                        </xsl:for-each>
                    </xsl:when>
                    <xsl:otherwise>
						<xsl:for-each select="./*[@class='RefAuthor']">
							<xsl:variable name="position" select="position()"/>
							<xsl:choose>
								<xsl:when test="$position &lt; 20">
									<xsl:element name="{./name()}">
										<xsl:apply-templates select="./@*|./node()"/>
									</xsl:element>
									 <xsl:apply-templates select="./following-sibling::text()[1]"/>
								</xsl:when>
								<xsl:when test="$position &gt; 20"/>
								<xsl:otherwise>
									<xsl:element name="{./name()}">
										<xsl:apply-templates select="./@*|./node()"/>
										<xsl:apply-templates select="./following-sibling::text()[1]"/>
										<span class="RefEtal">et al. </span>
									</xsl:element>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:for-each>
                    </xsl:otherwise>
                </xsl:choose>
           </xsl:if>
            <xsl:apply-templates select="node()except(span[@class='RefDOI'] | span[@class='RefPMID'] | *[@class='RefAuthor'] | //text()[./preceding-sibling::*[1][@class='RefAuthor']])"/>
            <xsl:if test=".//span[@class='RefDOI']|./@data-doi">
                <span class="RefDOI">
                    <xsl:text> DOI: </xsl:text>
                    <xsl:variable name="doiLink">
                        <xsl:choose>
                            <xsl:when test=".//span[@class='RefDOI']">
                                <xsl:value-of select=".//span[@class='RefDOI']"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="./@data-doi"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:variable name="doiLink" select="concat('https://doi.org/', replace($doiLink,'https://doi.org',''))"/>
                    <a href="{$doiLink}">
                        <xsl:value-of select="$doiLink"/>
                    </a>
                </span>
                <xsl:if test=".//span[@class='RefPMID']|./@data-pmid">
                    <xsl:text>, </xsl:text>
                 </xsl:if>
            </xsl:if>
            <xsl:if test=".//span[@class='RefPMID']|./@data-pmid">
                <span class="RefPMID">
                    <xsl:text>PMID: </xsl:text>
                    <xsl:variable name="pmidLink">
                        <xsl:choose>
                            <xsl:when test=".//span[@class='RefPMID']">
                                <xsl:value-of select=".//span[@class='RefPMID']"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="./@data-pmid"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:variable name="pmid">
                        <xsl:value-of select="tokenize($pmidLink,'/')[last()]"/>
                    </xsl:variable>
                    <a href="{$pmidLink}">
                        <xsl:value-of select="$pmid"/>
                    </a>
                </span>
            </xsl:if>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='back']//div[@class='jrnlAckGroup']//p[@class='jrnlAckParaGroup']" priority="5">
        <div>
            <xsl:apply-templates select="@*"/>
            <xsl:if test=".//span[@class='jrnlAckHead']">
                <p class="jrnlAckTitle">
                    <xsl:apply-templates select=".//span[@class='jrnlAckHead']/@*[name()!='class']|./span[@class='jrnlAckHead']/node()"/>
                </p>
            </xsl:if>
            <xsl:if test=".//span[@class='jrnlAckPara']">
                <p>
                    <xsl:apply-templates select=".//span[@class='jrnlAckPara']/@*|./span[@class='jrnlAckPara']/node()"/>
                </p>
            </xsl:if>
            <xsl:apply-templates select="node()except(span[@class='jrnlAckHead'] | span[@class='jrnlAckPara'])"/>
        </div>
    </xsl:template>
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefAccession' or @class='RefISBN' or @class='RefISSN']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test="@class='RefAccession'">
                    <xsl:text>Identifier: </xsl:text>
                </xsl:when>
                <xsl:when test="@class='RefISBN'">
                    <xsl:text>ISBN: </xsl:text>
                </xsl:when>
                <xsl:when test="@class='RefISSN'">
                    <xsl:text>ISSN: </xsl:text>
                </xsl:when>
            </xsl:choose>
            <xsl:apply-templates/>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefWebsite']" priority="5">
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
   <!-- <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefAuthor'][1]|//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefCollaboration'][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)] and position()=2">
                    <xsl:apply-templates select="@*"/>
                    <span class="RefFirstAuthor">
                        <xsl:value-of select="."/>
                    </span>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template> -->
     <xsl:template match="//div[@class='front']/div[@class='jrnlTVTR']/p[@class='jrnlCategory']|//div[@class='front']/div[@class='jrnlTRTR']/p[@class='jrnlCategory']" priority="5">
        <xsl:variable name="count">
            <xsl:value-of select="count(./*[@class='jrnlSubject'])"/>
        </xsl:variable>
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:for-each select="./node()">
                <xsl:variable name="pos">
                    <xsl:value-of select="position()"/>
                </xsl:variable>
                <xsl:apply-templates select="."/>
                <xsl:choose>
                    <xsl:when test="$pos = $count"/>
                    <xsl:otherwise>
                        <xsl:text> | </xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </p>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlCorrEmail']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <a href="mailto:{node()}">
                <xsl:apply-templates select="node()"/>
            </a>
            <xsl:text> </xsl:text>
        </xsl:element>
    </xsl:template>
	<xsl:template match="*[@class='jrnlFigBlock']|*[matches(@class, 'jrnl(.*?)Block')][@data-child-element]" priority="5" mode="jrnlFigBlock">
        <xsl:variable name="id" select="@id"/>
        <xsl:choose>
            <xsl:when test="@data-child-element or (count(./ancestor::*[@class='jrnlFigBlockGroup']) &gt; 0 and contains($id,'-S'))">
                <div>
                    <xsl:apply-templates select=" @* "/>
                    <xsl:choose>
                    <xsl:when test="$pdfType = 'figure'">
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
                        <xsl:apply-templates select="./*[matches(@class, 'jrnl(.*?)Caption')]"/>
                        <xsl:apply-templates select=" ./*[@class = 'jrnlBlockDOI']"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="./*[matches(@class, 'jrnl(.*?)Caption')][.//@class='label']"/>
                        <xsl:apply-templates select=" ./*[@class = 'jrnlBlockDOI']"/>
                    </xsl:otherwise>
                    </xsl:choose>
                </div>
            </xsl:when>
            <xsl:otherwise>
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
                    <xsl:apply-templates select=" ./*[@class != 'jrnlBlockDOI']"/>
                    <xsl:apply-templates select=" ./*[@class = 'jrnlBlockDOI']"/>
                    <xsl:choose>
                        <xsl:when test="$pdfType = 'figure'">
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:choose>
                                <xsl:when test="count(following-sibling::*) = 1">
                                    <xsl:choose>
                                       <xsl:when test="following-sibling::*[@class='jrnlFigBlock']">
                                             <p class="jrnlFigSupplCaption">The following figure supplement is available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption'][1]/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                        <xsl:when test="following-sibling::*[@class='jrnlSupplBlock']">
                                             <p class="jrnlFigSupplCaption">The following source code is available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption'][1]/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                        <xsl:when test="following-sibling::*[@class='jrnlVidBlock']">
                                            <p class="jrnlFigSupplCaption">The following video is available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption'][1]/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                    </xsl:choose>
                                </xsl:when>
                                <xsl:when test="count(following-sibling::*) &gt; 1">
                                    <xsl:choose>
                                        <xsl:when test="count(following-sibling::*[@class='jrnlFigBlock']) &gt; 0 and count(following-sibling::*[@class='jrnlSupplBlock']) &gt; 0 and count(following-sibling::*[@class='jrnlVidBlock']) &gt; 0">
                                            <p class="jrnlFigSupplCaption">The following video, source data, and figure supplements are available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption']/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                        <xsl:when test="count(following-sibling::*[@class='jrnlFigBlock']) &gt; 0 and count(following-sibling::*[@class='jrnlSupplBlock']) &gt; 0 ">
                                            <p class="jrnlFigSupplCaption">The following source data and figure supplements are available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption']/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                        <xsl:when test="count(following-sibling::*[@class='jrnlFigBlock']) &gt; 0 and count(following-sibling::*[@class='jrnlVidBlock']) &gt; 0 ">
                                            <p class="jrnlFigSupplCaption">The following video and figure supplements are available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption']/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                        <xsl:when test="count(following-sibling::*[@class='jrnlFigBlock']) &gt; 1">
                                            <p class="jrnlFigSupplCaption">The following figure supplements are available for <xsl:value-of select="replace(translate(./p[@class='jrnlFigCaption']/span[@class='label']/text(),$uppercase,$smallcase),'.$',':')"/>
                                            </p>
                                        </xsl:when>
                                    </xsl:choose>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:otherwise>
                    </xsl:choose>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='jrnlVidBlock'][not(@data-child-element)]" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:attribute name="data-column-span">
                <xsl:text>0</xsl:text>
            </xsl:attribute>
           <!-- <xsl:apply-templates select="./img"/> -->
           <xsl:for-each select="./img">
                <xsl:if test="./@class='jrnlFigure'">
                    <img>
                        <xsl:attribute name="src">
                            <xsl:value-of select="./@data-vid-img-src"/>
                             <!--<xsl:value-of select="substring-after(./@data-vid-img-src,'{.}..')"/> -->
                        </xsl:attribute>
                        <xsl:attribute name="data-vid-img-src">
                            <xsl:choose>
                                <xsl:when test="starts-with(./@data-vid-img-src, 'http')">
                                    <xsl:value-of select="concat('{.}../',substring-after(./@data-vid-img-src,'http://'))"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="./@data-vid-img-src"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                    </img>
                </xsl:if>
            </xsl:for-each>
            <xsl:apply-templates select="./*[@class='jrnlVidCaption']"/>
            <xsl:apply-templates select="./*[@class='jrnlBlockDOI']"/>
        </div>
    </xsl:template>
	<xsl:template match="//*[@class='floatBlock']/*[@class='jrnlBoxBlock']" priority="5">
		<div data-type="{./@data-type}">
            <xsl:apply-templates select="@*[name()!='data-type']|node()"/>
        </div>
	</xsl:template>
    <!--xsl:template match="//*[@class='body']/*[@class='jrnlBoxBlock']" priority="5">
        <div>
            <xsl:choose>
                <xsl:when test="count(preceding-sibling::*[@class!='jrnlBoxBlock']) = 0">
                    <xsl:choose>
                        <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'TYPE1'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:variable name="seq" select="count(preceding-sibling::*)"/>
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'KEY'"/>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="$seq > 0">
                                    <xsl:attribute name="data-stack">
                                        <xsl:value-of select="'true'"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise/>
                            </xsl:choose>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                </xsl:when>
                <xsl:when test="count(following-sibling::*[@class!='jrnlBoxBlock']) = 0">
                    <xsl:choose>
                        <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'TYPE1'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="data-type">KEY_BACK</xsl:attribute>
                            <xsl:attribute name="data-inline">
                                <xsl:value-of select="'true'"/>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="preceding-sibling::*[1][contains(@class, 'jrnlBoxBlock')][not(.//*[@class='label'])]">
                                    <xsl:attribute name="data-stack">
                                        <xsl:value-of select="'true'"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise/>
                            </xsl:choose>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                        <xsl:attribute name="data-type">
                            <xsl:value-of select="'TYPE1'"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select=" @* "/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates select=" ./*[@class != 'jrnlBlockDOI']"/>
            <xsl:apply-templates select=" ./*[@class = 'jrnlBlockDOI']"/>
        </div>
    </xsl:template-->
 <!--   <xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/> -->
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
         <!--   <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each> -->
            <!--    </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>-->
     <!--   </xsl:element>
    </xsl:template> 
    <xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/> -->
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
           <!-- <xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each> -->
                <!--</xsl:when>
                <xsl:otherwise/>
            </xsl:choose>-->
      <!--  </xsl:element>
    </xsl:template>  -->
    <xsl:template match="//*[@class='jrnlLicense']/*[@class='jrnlLicensePara']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:for-each select="./node()">
                <xsl:choose>
                    <xsl:when test="self::*">
                        <xsl:apply-templates select="."/>
                    </xsl:when>
                    <xsl:when test="self::text()">
                        <xsl:value-of select="replace(.,'This is an Open Access article distributed','')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
        </xsl:element>
    </xsl:template>
    <!--<xsl:template match="//td[contains(@*, data-cell-width-tablesetter)]" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*[not(contains(name(),'data-cell-width-tablesetter'))]"/>
            <xsl:attribute name="data-cell-width-tablesetter">
                <xsl:value-of select="sum(./@*[contains(name(),'data-cell-width-tablesetter')])"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>-->
    <xsl:template match="//*[@class='sub-article']/*[@class='sub-article-id']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:variable name="link" select="concat(@startPunc,.)"/>
            <a href="{$link}">
                <xsl:value-of select="$link"/>
            </a>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlMajorDatasets']" priority="5">
		<div>
		<xsl:apply-templates select="@*"/>
		<xsl:apply-templates select="./*[@class='jrnlDatasetHead']"/>
		<xsl:for-each select="./p[not(@class)][not(@fn-type='hidden')][. != '']">
			    <xsl:variable name="current" select="."/>
		        <p class="jrnlDatasetCaption">
                    <xsl:apply-templates select="./@*"/>
                    <xsl:apply-templates select="./node()"/>
                </p>
			<xsl:if test="./following-sibling::*[1][@class='jrnlMajorDataset']">
				<table class="jrnlDatasetTbl">
					<thead>
						<tr>
							<th width="81.29">
								<p class="jrnDatasetTblHead">Author(s)</p>
							</th>
							<th width="40.64">
								<p class="jrnDatasetTblHead">Year</p>
							</th>
							<th width="101.61">
								<p class="jrnDatasetTblHead">Dataset title</p>
							</th>
							<th width="81.29">
								<p class="jrnDatasetTblHead">Dataset URL</p>
							</th>
							<th width="101.61">
								<p class="jrnDatasetTblHead">Database, license and accessibility information</p>
							</th>
						</tr>
					</thead>
					<tbody>
						<!--<xsl:apply-templates select=".//*[@class='jrnlMajorDataset']" mode="dataset"/> -->
						<xsl:apply-templates select=".//following-sibling::*[@class='jrnlMajorDataset'][./preceding-sibling::p[not(@class)][1] = $current]" mode="dataset"/>
					</tbody>
				</table>
			</xsl:if>
			</xsl:for-each>
		</div>
	</xsl:template>
	<!--xsl:template match="//*[@class='jrnlMajorDataset'][./*[@class='jrnlDatasets'][@data-content-type='generated-dataset']][1]|//*[@class='jrnlMajorDataset'][./*[@class='jrnlDatasets'][@data-content-type='existing-dataset']][1]" priority="5">
        <xsl:variable name="contentType" select="./*[@class='jrnlDatasets'][1]/@data-content-type"/>
        <table>
            <thead>
                <tr>
                    <th>Author(s)</th>
                    <th>Year</th>
                    <th>Dataset title</th>
                    <th>Dataset URL</th>
                    <th>Database, license and accessibility information</th>
                </tr>
            </thead>
            <tbody>
                <xsl:apply-templates select=".|./following-sibling::*[@class='jrnlMajorDataset'][./*[@class='jrnlDatasets'][@data-content-type=$contentType]]" mode="dataset"/>
            </tbody>
        </table>  
    </xsl:template-->
    <xsl:template match="//*[@class='jrnlMajorDataset']" mode="dataset">
    <xsl:if test=".//node()">
        <tr>
            <td>
                <xsl:apply-templates select=".//*[@class='jrnlDataAuthors']"/>
            </td>
            <td>
                <p class="jrnlYear">
                    <xsl:apply-templates select=".//*[@class='jrnlYear']"/>
                </p>
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test=".//*[@class='jrnlDataTitle']">
                        <xsl:apply-templates select=".//*[@class='jrnlDataTitle']"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select=".//*[@class='jrnlSource']"/>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
                <xsl:choose>
                    <xsl:when test=".//*[@class='jrnlDataTitle']">
                        <xsl:apply-templates select=".//*[@class='jrnlSource']"/>
                        <xsl:text>, </xsl:text>
                        <xsl:apply-templates select=".//*[@class='jrnlPubIDLink']"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select=".//*[@class='jrnlExtLink']"/>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
            <td>
                <xsl:apply-templates select=".//*[@class='jrnlComment']"/>
            </td>
        </tr>
        </xsl:if>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlMajorDataset']//*[@class='jrnlDataAuthors']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:for-each select="./*">
                <xsl:apply-templates select="."/>
                <xsl:choose>
                    <xsl:when test="count(./following-sibling::*) &gt; 0">
                        <xsl:text>, </xsl:text>
                    </xsl:when>
                    <xsl:otherwise/>
                </xsl:choose>
            </xsl:for-each>
        </p>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlMajorDataset']//*[@class='jrnlDataAuthors']/*[@class='jrnlGivenName']" priority="5">
        <xsl:text> </xsl:text>
        <xsl:apply-templates select="."/>
    </xsl:template>
    <!--xsl:template match="//*[@class='jrnlMajorDataset'][./*[@class='jrnlDatasets'][@data-content-type='generated-dataset']][position()>1]|//*[@class='jrnlMajorDataset'][./*[@class='jrnlDatasets'][@data-content-type='existing-dataset']][position()>1]" priority="5"/-->
    <xsl:template match="//*[contains(@class,'jrnlFundingGroup')][./*[@class='award-group']]" priority="5">
        <xsl:variable name="contentType" select="./*[@class='jrnlDatasets'][1]/@data-content-type"/>
        <div class="jrnlFundingGroup">
            <table class="jrnlFunderTbl">
                <thead>
                    <tr>
                        <th width="100">
                            <p class="jrnlFunderTblHead">Funder</p>
                        </th>
                        <th width="100">
                            <p class="jrnlFunderTblHead">Grant reference number</p>
                        </th>
                        <th width="100">
                            <p class="jrnlFunderTblHead">Author</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:apply-templates/>
                </tbody>
            </table>
        </div>
    </xsl:template>
    <xsl:template match="//*[contains(@class,'jrnlFundingGroup')]/*[@class='award-group']" priority="5">
        <tr class="award-group">
            <td class="institution" data-instID="{./*[@class='institution-id']}">
                <p class="jrnlFunderTblBody">
                    <xsl:value-of select="./*[@class='jrnlInstitutionGroup']/*[@class='institution']"/>
                </p>
            </td>
            <td class="jrnlAwardID">
                <p class="jrnlFunderTblBody">
                    <xsl:value-of select="./*[@class='jrnlInstitutionGroup']/*[@class='jrnlAwardID']"/>
                </p>
            </td>
            <td class="jrnlAwardRecipients">
                <p class="jrnlFunderTblBody">
                   <!-- <xsl:apply-templates select="./*[@class='jrnlAwardRecipients']/*"/>-->
                   <xsl:for-each select="./*[@class='jrnlAwardRecipients']//span[not(@class)]">
                        <xsl:choose>
                            <xsl:when test="not(preceding-sibling::span)">
                                <xsl:apply-templates select="./node()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="'&#xA;'"/>
                                <xsl:apply-templates select="./node()"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                </p>
            </td>
        </tr>
    </xsl:template>
    <xsl:template match="//*[contains(@class,'jrnlFundingGroup')]/*[@class='jrnlFundingStatement']" priority="5">
        <xsl:choose>
            <xsl:when test="./preceding-sibling::*[@class='award-group']">
            <tr class="jrnlFundingStatement">
                <td colspan="3">
                    <p class="jrnlFundingStatement">
                        <xsl:apply-templates/>
                    </p>
                </td>
            </tr>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <!-- To process float block label text -->
    <xsl:template match="//*[matches(@class, 'jrnl(.*?)Block')]//*[@class='label']" priority="5">
        <span class="label">
            <xsl:choose>
                <xsl:when test="$pdfType = 'figure'">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
                        <xsl:when test="matches(.,'Figure ([0-9]+)—|Table ([0-9]+)—')">
                            <xsl:choose>
                                <xsl:when test="matches(.,'Figure ([0-9]+)—Video|Table ([0-9]+)—Video')">
                                    <xsl:apply-templates select="@*|node()"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:apply-templates select="@*"/>
                                    <xsl:variable name="label" select="replace(.,'^Figure ([0-9]+)—|^Table ([0-9]+)—','')"/>
                                    <xsl:sequence select="concat(upper-case(substring($label,1,1)), substring($label, 2))"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:when test="matches(.,'^Video ([0-9]+)—')">
                            <xsl:apply-templates select="@*"/>
                            <xsl:variable name="label" select="replace(.,'^Video ([0-9]+)—','Video ')"/>
                            <xsl:sequence select="concat(upper-case(substring($label,1,1)), substring($label, 2))"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates select="@*|node()"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </span>
        <xsl:if test="./node()">
            <xsl:text> </xsl:text>
        </xsl:if>
    </xsl:template>
    <!-- For Magazine -->
    <xsl:template match="*[@class='jrnlGroupAuthorBlock']" priority="5">
    <xsl:element name="{./name()}">
        <xsl:apply-templates select="./@*"/>
        <xsl:apply-templates select="./*[@class='jrnlGroupAuthorHead']"/>
        <xsl:for-each select="//*[@class='jrnlAuthorGroup'][./*[@class='jrnlGrpAuthRef']]">
            <div class="jrnlGroupAuthors">
                <p class="jrnlCollaboration">
                <xsl:value-of select="./*[@class='jrnlCollaboration']"/>
                </p>
            <xsl:for-each select="./*[@class='jrnlGrpAuthRef']">
                <xsl:variable name="rid" select="@data-rid"/>
                <xsl:variable name="contribGrpNode" select="//*[@class='jrnlGroupAuthors'][@id=$rid]"/>
                
            <!-- <xsl:element name="p">
            <xsl:apply-templates select="$contribGrpNode//*[@class='jrnlRole']/@*"/>
            <xsl:apply-templates select="$contribGrpNode//*[@class='jrnlRole']"/>
            </xsl:element> -->
                <xsl:choose>
                    <xsl:when test="$contribGrpNode//*[@class='jrnlRole']">
                        <div class="jrnlGrpAuthorRoleBlock">
                            <xsl:for-each select="$contribGrpNode//*[@class='jrnlGroupAuthor']">
                                <xsl:if test="$contribGrpNode//*[@class='jrnlGroupAuthor']/*[@class='jrnlRole']"> 
                                <xsl:variable name="role">
                                <xsl:for-each select="./child::*[@class='jrnlRole']">
                                    <xsl:value-of select="./text()"/>
                                </xsl:for-each>
                                </xsl:variable>
                                <xsl:variable name="prevrole">
                                <xsl:for-each select="./preceding-sibling::*[@class='jrnlGroupAuthor'][1]/child::*[@class='jrnlRole']">
                                <xsl:value-of select="./text()"/>
                            </xsl:for-each>
                                </xsl:variable>
                            <xsl:choose>
                                <xsl:when test="$role=$prevrole"/>
                                <xsl:otherwise>
                                    <p class="jrnlRole">
                                        <xsl:apply-templates select="./*[@class='jrnlRole']"/>
                                    </p>
                                    <p class="jrnlGrpAuthorBlock">
                                    <xsl:for-each select="$contribGrpNode//*[@class='jrnlGroupAuthor']"> 
                                        <xsl:if test=".//*[@class='jrnlRole']/text()=$role"> 
                                        <span class="jrnlGroupAuthor">
                                            <span class="jrnlAuthor">
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                                <xsl:text> </xsl:text>
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                            </span>
                                        <!--<xsl:variable name="affID">
                                        <xsl:sequence select="replace(replace(./*[@class='jrnlAffRef']/@data-rid, '^\s*(.+?)\s*$', '$1'), '^ .*$', '')"/>
                                        </xsl:variable>-->
                                        <xsl:text>: </xsl:text>
                                            <xsl:for-each select="./*[@class='jrnlAffRef']">
                                                <xsl:variable name="id" select="./@data-rid"/>
                                                <xsl:element name="span">
                                                    <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/@*"/>
                                                    <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/node()except(//sup[@class='jrnlAffLabel'])"/>
                                                </xsl:element>
                                                <xsl:text>; </xsl:text>
                                            </xsl:for-each>
                                        </span>
                                        </xsl:if>
                                        <xsl:if test=".//*[@class='jrnlContribID']">
                                            <span class="jrnlContribIDGroup">
                                                <xsl:apply-templates select="//*[@class='jrnlContribIDGroup']/img"/>
                                                <xsl:apply-templates select=".//*[@class='jrnlContribID']"/>
                                            </span>
                                        </xsl:if>
                                    </xsl:for-each>
                                    </p>
                                </xsl:otherwise>
                            </xsl:choose>
                            </xsl:if>
                        </xsl:for-each>
                    </div>
                </xsl:when>
                <xsl:otherwise>
                    <p class="jrnlGrpAuthorBlock">
                        <xsl:for-each select="$contribGrpNode//*[@class='jrnlGroupAuthor']">
                            <span class="jrnlGroupAuthor">
                                <span class="jrnlAuthor">
                                    <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                    <xsl:text> </xsl:text>
                                    <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                </span>
                                <!--<xsl:variable name="affID">
                                <xsl:sequence select="replace(replace(./*[@class='jrnlAffRef']/@data-rid, '^\s*(.+?)\s*$', '$1'), '^ .*$', '')"/>
                                </xsl:variable>-->
                                <xsl:text>: </xsl:text>
                                <xsl:for-each select="./*[@class='jrnlAffRef']">
                                    <xsl:variable name="id" select="./@data-rid"/>
                                        <xsl:element name="span">
                                            <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/@*"/>
                                            <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/node()except(//sup[@class='jrnlAffLabel'])"/>
                                        </xsl:element>
                                    <xsl:text>; </xsl:text>
                                </xsl:for-each>
                            </span>
                            <xsl:if test=".//*[@class='jrnlContribID']">
                                <span class="jrnlContribIDGroup">
                                    <xsl:apply-templates select="//*[@class='jrnlContribIDGroup']/img"/>
                                    <xsl:apply-templates select=".//*[@class='jrnlContribID']"/>
                                </span>
                            </xsl:if>
                        </xsl:for-each>
                    </p>
                </xsl:otherwise>
                </xsl:choose>
                </xsl:for-each>
            </div>
        </xsl:for-each>
    </xsl:element>
</xsl:template>
<xsl:template match="*[@class='jrnlAuthorsBlock']" priority="5">
    <xsl:element name="{./name()}">
        <xsl:apply-templates select="./@*"/>
        <xsl:for-each select=".//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAffRef']]">
            <div class="jrnlAuthorGroup">
            <xsl:for-each select="./*[@class='jrnlAffRef']">
                <xsl:variable name="rid" select="@data-rid"/>
                <xsl:variable name="contribGrpNode" select="//*[@class='jrnlAffGroup']//*[@class='jrnlAff'][@id=$rid]"/>
                
            <!-- <xsl:element name="p">
            <xsl:apply-templates select="$contribGrpNode//*[@class='jrnlRole']/@*"/>
            <xsl:apply-templates select="$contribGrpNode//*[@class='jrnlRole']"/>
            </xsl:element> -->
           
                    <p class="jrnlAuthorAffBlock">
                            <xsl:if test="//*[@class='jrnlAffGroup']//*[@class='jrnlAff'][@id=$rid]"> 
                                <span class="jrnlAuthorGroup">
                                    <span class="jrnlAuthor">
                                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                        <xsl:text> </xsl:text>
                                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                    </span>
                                <!--<xsl:variable name="affID">
                                <xsl:sequence select="replace(replace(./*[@class='jrnlAffRef']/@data-rid, '^\s*(.+?)\s*$', '$1'), '^ .*$', '')"/>
                                </xsl:variable>-->
                                    <xsl:for-each select="./*[@class='jrnlAffRef']">
                                        <xsl:variable name="id" select="./@data-rid"/>
                                        <xsl:element name="span">
                                            <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/@*"/>
                                            <xsl:apply-templates select="//*[@class='jrnlAff'][@id=$id][not(@removeNode)]/node()except(//sup[@class='jrnlAffLabel'])"/>
                                        </xsl:element>
                                    </xsl:for-each>
                                </span>
                                </xsl:if>
                            </p>
                </xsl:for-each>
            </div>
        </xsl:for-each>
    </xsl:element>
</xsl:template>
<!-- For Magazine - Display AuthorGroup, aff with ContribID, Present address, DeceasedFN in BACK -->
<xsl:template match="*[@class='back']/*[@class='jrnlAuthors'][@template='true']" priority="5">
    <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <xsl:for-each select=".//*[@class='jrnlAuthorGroup'][@id]">
                <div class="jrnlAuthorGroupBlock">
                <p class="jrnlAuthorBlock">
                    <span class="jrnlAuthor">
                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                        <xsl:text> </xsl:text>
                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                        <xsl:text> </xsl:text>
                        <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSuffix']"/>
                    </span>
                    <xsl:for-each select="./*[@class='jrnlAffRef']">
                        <xsl:variable name="affid" select="./@data-rid"/>
                       <xsl:variable name="affnode" select="//*[@class='front']//*[@class='jrnlEditors']//*[@class='jrnlAff']"/>
                    <xsl:element name="span">
                        <xsl:apply-templates select="//*[@class='front']//*[@class='jrnlEditors']//*[@class='jrnlAff'][@id=$affid][not(@removeNode)]/@*"/>
                        <xsl:apply-templates select="//*[@class='front']//*[@class='jrnlEditors']//*[@class='jrnlAff'][@id=$affid][not(@removeNode)]/node()except(//sup[@class='jrnlAffLabel'])"/>
                    </xsl:element>
                </xsl:for-each>
                </p>
                <xsl:apply-templates select=".//*[@class='jrnlContribIDGroup']"/>
                <xsl:for-each select="./*[@class='jrnlPresentAddrRef']">
                        <xsl:variable name="addrid" select="./@data-rid"/>
                       <xsl:variable name="addrnode" select="//*[@class='front']//*[@class='jrnlPresentGrp']//*[@class='jrnlPresentAddrFNPara']"/>
                    <xsl:element name="p">
                        <xsl:apply-templates select="$addrnode[@id=$addrid]/@*"/>
                        <span class="jrnlPresentHead">
                            <xsl:value-of select="'Present address: '"/>
                        </span>
                        <xsl:apply-templates select="$addrnode[@id=$addrid]/node()"/>
                    </xsl:element>
                </xsl:for-each>
                <xsl:for-each select="./*[@class='jrnlDeceasedPara']">
                        <xsl:variable name="decrid" select="./@id"/>
                    <xsl:if test="preceding-sibling::*[@class='jrnlFNRef'][@data-rid=$decrid] | following-sibling::*[@class='jrnlFNRef'][@data-rid=$decrid]">
                    <xsl:element name="p">
                        <xsl:apply-templates select="@*|node()"/>
                    </xsl:element>
                    </xsl:if>
                </xsl:for-each>
                <!--<xsl:for-each select="./*[@class='jrnlFNRef']">
                        <xsl:variable name="decrid" select="./@data-rid"/>
                       <xsl:variable name="decnode" select="//*[@class='back']//*[@class='jrnlAuthorGroup']//*[@class='jrnlDeceasedPara']"/>
                    <xsl:element name="p">
                        <xsl:apply-templates select="$decnode[@id=$decrid]/@*"/>
                        <xsl:apply-templates select="$decnode[@id=$decrid]/node()[1]"/>
                    </xsl:element>
                </xsl:for-each>-->
                
                </div>
            </xsl:for-each>
    </xsl:element>  
</xsl:template>
 <!--<xsl:template match="*[contains(@class,'jrnlConFNGroup')][@template='true']" priority="5">
        <div class="jrnlConFNBlock">     
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="./@*"/>
                <xsl:apply-templates select="./*[contains(@class,'jrnlConHead')]"/>
                <xsl:variable name="authorCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
                <xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']]">
                    <xsl:variable name="position" select="position()"/>
                    <span class="jrnlAuthorGroup">
                        <xsl:if test="./*[@class='jrnlAuthor']">
                            <span class="jrnlAuthor">
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                               
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                            </span>
                            <xsl:text>, </xsl:text>
                            <span class="jrnlConFN">
                                <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                                <xsl:variable name="conFNCount">
                                    <xsl:value-of select="count(//*[@class='jrnlConFN'][@id=$conRefID])"/>
                                </xsl:variable>
                                <xsl:for-each select="//*[@class='jrnlConFN'][@id=$conRefID]/node()">
                                    <xsl:apply-templates select="."/>
                                    <xsl:if test="position() < $conFNCount">
                                        <xsl:text>, </xsl:text>
                                    </xsl:if>
                                </xsl:for-each>
                                <xsl:if test="$authorCount > $position">
                                    <xsl:text>; </xsl:text>
                                </xsl:if>
                            </span>
                        </xsl:if>
                        <xsl:if test="./*[@class='jrnlCollaboration']">
                            <xsl:apply-templates select="./*[@class='jrnlCollaboration']"/>
                            <xsl:text>, </xsl:text>
                            <xsl:choose>
                                <xsl:when test="./*[@class='jrnlConRef']/@data-rid">
                                    <span class="jrnlConFN">
                                        <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                                        <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@* "/>
                                         <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/node()"/>
                                        <xsl:if test="$authorCount > $position">
                                            <xsl:text>; </xsl:text>
                                        </xsl:if>
                                    </span>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:for-each select=".//*[@class='jrnlGrpAuthRef']">
                                        <xsl:variable name="grpAuthID" select="./@data-rid"/>
                                        <xsl:variable name="grpAuthCount" select="count(//*[@class='jrnlGroupAuthors'][@id=$grpAuthID]/*[@class='jrnlGroupAuthor'][./*[@class='jrnlConRef']])"/>
                                        <xsl:for-each select="//*[@class='jrnlGroupAuthors'][@id=$grpAuthID]/*[@class='jrnlGroupAuthor'][./*[@class='jrnlConRef']]">
                                            <xsl:variable name="pos" select="position()"/>
                                            <span class="jrnlAuthor">
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                                <xsl:text> </xsl:text>
                                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                                            </span>
                                            <xsl:text>, </xsl:text>
                                            <span class="jrnlConFN">
                                                <xsl:variable name="conRefID" select="./*[@class='jrnlConRef']/@data-rid"/>
                                                <xsl:apply-templates select="//*[@class='jrnlConFN'][@id=$conRefID]/@* | //*[@class='jrnlConFN'][@id=$conRefID]/node()"/>
                                                <xsl:if test="$authorCount > $position or $grpAuthCount > $pos">
                                                    <xsl:text>; </xsl:text>
                                                </xsl:if>
                                            </span>
                                        </xsl:for-each>
                                    </xsl:for-each>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:if>
                    </span>
                </xsl:for-each>
           </xsl:element>
           </div>
    </xsl:template>  -->
    <xsl:template match="*[@class='back']//*[contains(@class,'jrnlConFNGroup')][@template='true']" priority="5">
        <xsl:element name="{./name()}">
			<xsl:apply-templates select="./@*"/>
			<xsl:apply-templates select="./*[contains(@class,'jrnlConHead')]"/>
			<xsl:for-each select="//*[@class='front']/*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlConRef']]">
			    <span class="jrnlAuthorGroup">
                        <span class="jrnlAuthor">
                            <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                            <!--<xsl:text> </xsl:text>-->
                            <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                        </span>
                        <xsl:text>, </xsl:text>
                </span>
			</xsl:for-each>
			<xsl:apply-templates select="./*[@class='jrnlConFN']"/>
		</xsl:element>
    </xsl:template>
    <!-- For Magazine template1-4 -->
    <xsl:template match="*[contains(@class,'jrnlConfFNGroup')][@template='true']" priority="5">
		<xsl:variable name="noneID" select="//*[@class='jrnlConfFN'][contains(translate(.,$uppercase,$smallcase),'no competing interest') or contains(translate(.,$uppercase,$smallcase),'none')]/@id"/>
	   <!-- <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'][@data-rid=$noneID])"/>-->
		<xsl:variable name="noneCount" select="count($noneID)"/>
		<xsl:variable name="authorsCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
		<xsl:choose>
    		<xsl:when test="$authorsCount = $noneCount and ./@movefront='true'">
    		</xsl:when>
    		<xsl:otherwise>
				<xsl:element name="{./name()}">
					<xsl:apply-templates select="./@*"/>
					<xsl:apply-templates select="./*[contains(@class,'jrnlConfHead')]"/>
    				<xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][(./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']) and ./*[@class='jrnlConfRef'][not(@data-rid=$noneID)]]">
    					<span class="jrnlAuthorGroup">
    						<xsl:if test="./*[@class='jrnlAuthor']">
    							<span class="jrnlAuthor">
    								<xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
    								<!--<xsl:text> </xsl:text>-->
    								<xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
    							</span>
    						</xsl:if>
    						<xsl:apply-templates select="./*[@class='jrnlCollaboration']"/>
    						<xsl:text>: </xsl:text>
    						<span class="jrnlConfFN">
    							<xsl:variable name="confRefID" select="./*[@class='jrnlConfRef']/@data-rid"/>
    							<xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/@*"/>
    							<xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/node()"/>
    							<xsl:text>. </xsl:text>
    						</span>
    					</span>
    				</xsl:for-each>
    				<xsl:choose>
    					<xsl:when test="$authorsCount = $noneCount">
    						<xsl:choose>
    							<xsl:when test="$noneCount = 1">
    								<xsl:text>The author declares that no competing interests exist.</xsl:text>
    							</xsl:when>
    							<xsl:when test="$noneCount &gt; 1">
    								<xsl:text>The authors declare that no competing interests exist.</xsl:text>
    							</xsl:when>
    						</xsl:choose>
    					</xsl:when>
    					<xsl:when test="$authorsCount &gt; $noneCount">
    						<xsl:choose>
    							<xsl:when test="$noneCount = 1">
    								<xsl:text>The other author declares that no competing interests exist.</xsl:text>
    							</xsl:when>
    							<xsl:when test="$noneCount &gt; 1">
    								<xsl:text>The other authors declare that no competing interests exist.</xsl:text>
    							</xsl:when>
    						</xsl:choose>
    					</xsl:when>
    				</xsl:choose>
    		</xsl:element>
    	</xsl:otherwise>
	</xsl:choose>
</xsl:template>
    <xsl:template match="*[contains(@class,'jrnlConfFN')][@get-compt='true']" priority="5">
        <p class="TEMPLATE3_jrnlConfFNGroup">
            <xsl:apply-templates select="./@*[name()!='class']"/>
            <span class="TEMPLATE3_jrnlConfHead" data-edited="true">Competing interests: </span>
            
                <xsl:variable name="noneID" select="//*[@class='jrnlConfFN'][contains(translate(.,$uppercase,$smallcase),'no competing interest') or contains(translate(.,$uppercase,$smallcase),'none')]/@id"/>
               <!-- <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'][@data-rid=$noneID])"/>-->
               <xsl:variable name="noneCount" select="count($noneID)"/>
                <xsl:variable name="authorsCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
                <span class="jrnlConfFN">
                    <xsl:choose>
                        <xsl:when test="$authorsCount = $noneCount">
                            <xsl:choose>
                                <xsl:when test="$noneCount = 1">
                                    <xsl:text>The author declares that no competing interests exist.</xsl:text>
                                </xsl:when>
                                <xsl:when test="$noneCount &gt; 1">
                                    <xsl:text>The authors declare that no competing interests exist.</xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                        <xsl:when test="$authorsCount &gt; $noneCount">
                            <xsl:choose>
                                <xsl:when test="$noneCount = 1">
                                    <xsl:text>The other author declares that no competing interests exist.</xsl:text>
                                </xsl:when>
                                <xsl:when test="$noneCount &gt; 1">
                                    <xsl:text>The other authors declare that no competing interests exist.</xsl:text>
                                </xsl:when>
                            </xsl:choose>
                        </xsl:when>
                    </xsl:choose>
                </span>
                <xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][(./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']) and ./*[@class='jrnlConfRef'][not(@data-rid=$noneID)]]">
                    
                        <span class="jrnlConfFN">
                            <xsl:variable name="confRefID" select="./*[@class='jrnlConfRef']/@data-rid"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/@*"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/node()"/>
                            <xsl:text>. </xsl:text>
                        </span>
                </xsl:for-each>
          </p>
    </xsl:template>
    <!-- for magazine template 5-->
    <xsl:template match="*[@class='jrnlConfFNGroupBlock']" priority="5">
        <p class="jrnlConfFNGroup">
            <xsl:apply-templates select="./*[@class='jrnlConfHead']"/>
            <xsl:variable name="noneID" select="//*[@class='jrnlConfFN'][contains(translate(.,$uppercase,$smallcase),'no competing interest') or contains(translate(.,$uppercase,$smallcase),'none')]/@id"/>
           <!-- <xsl:variable name="noneCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']/*[@class='jrnlConfRef'][@data-rid=$noneID])"/>-->
           <xsl:variable name="noneCount" select="count($noneID)"/>
            <xsl:variable name="authorsCount" select="count(//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']])"/>
                <xsl:for-each select="//*[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup'][(./*[@class='jrnlAuthor'] or ./*[@class='jrnlCollaboration']) and ./*[@class='jrnlConfRef'][not(@data-rid=$noneID)]]">
                    <span class="jrnlAuthorGroup">
                        <xsl:if test="./*[@class='jrnlAuthor']">
                            <span class="jrnlAuthor">
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                                <xsl:text> </xsl:text>
                                <xsl:apply-templates select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                            </span>
                        </xsl:if>
                        <xsl:apply-templates select="./*[@class='jrnlCollaboration']"/>
                        <xsl:text>: </xsl:text>
                        <span class="jrnlConfFN">
                            <xsl:variable name="confRefID" select="./*[@class='jrnlConfRef']/@data-rid"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/@*"/>
                            <xsl:apply-templates select="//*[@class='jrnlConfFN'][@id=$confRefID]/node()"/>
                            <xsl:text>. </xsl:text>
                        </span>
                    </span>
                </xsl:for-each>
                <xsl:choose>
                    <xsl:when test="$authorsCount = $noneCount">
                        <xsl:choose>
                            <xsl:when test="$noneCount = 1">
                                <xsl:text>The author declares that no competing interests exist.</xsl:text>
                            </xsl:when>
                            <xsl:when test="$noneCount &gt; 1">
                                <xsl:text>The authors declare that no competing interests exist.</xsl:text>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:when test="$authorsCount &gt; $noneCount">
                        <xsl:choose>
                            <xsl:when test="$noneCount = 1">
                                <xsl:text>The other author declares that no competing interests exist.</xsl:text>
                            </xsl:when>
                            <xsl:when test="$noneCount &gt; 1">
                                <xsl:text>The other authors declare that no competing interests exist.</xsl:text>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                </xsl:choose>
            </p>
    </xsl:template>
    <xsl:template match="//div[@type='main']" priority="6">
        <div type="main">
                    <xsl:for-each select="//*[@class='body']//*[@class='jrnlBoxBlock']|//*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']">
                        <div class="floatBlock">
                            <xsl:apply-templates select="@*[name()!='class']"/>
                        <xsl:element name="{./name()}">
                            <xsl:variable name="type">
                        <xsl:choose>
                            <xsl:when test="./@data-type-old">
                                <xsl:value-of select="@data-type-old"/>
                            </xsl:when>
                            <xsl:otherwise>TYPE1</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when test="count(preceding-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="key">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:variable name="seq" select="count(preceding-sibling::*)"/>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$key"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-position">
                                        <xsl:value-of select="'top'"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-column-start">
                                        <xsl:value-of select="'0'"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="$seq &gt; 0">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                            </xsl:attribute>
                                        </xsl:when>
                                        <xsl:otherwise/>
                                    </xsl:choose>
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream' and name()!='data-type'] "/>
                        </xsl:when>
                        <xsl:when test="count(following-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="keyBack">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY_BACK</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$keyBack"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-inline">
                                        <xsl:value-of select="'true'"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="preceding-sibling::*[1][contains(@class, 'jrnlBoxBlock')][not(.//*[@class='label'])]">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                            </xsl:attribute>
                                        </xsl:when>
                                        <xsl:otherwise/>
                                    </xsl:choose>
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream' and name()!='data-type'] "/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                                <xsl:attribute name="data-type">
                                    <xsl:value-of select="$type"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:apply-templates select=" @*[name()!='data-type']"/>
                        </xsl:otherwise>
                    </xsl:choose>
                        <xsl:apply-templates select="./node()"/>
                        </xsl:element>
                        </div>
                    </xsl:for-each>
                    <xsl:for-each select="//*[@class='front']//*[@class='jrnlBoxBlock'][@data-rel-box='true']">
                        <xsl:variable name="boxid" select="concat('BLK_BX',position())"/>
                        <div class="floatBlock" id="{$boxid}" data-stream-name="{concat('a_BX',position())}">
                            <xsl:element name="{./name()}">
                            <xsl:apply-templates select="./@*[name()='class']"/>
                                <xsl:attribute name="data-type">
                                    <xsl:value-of select="'KEY'"/>
                                </xsl:attribute>
                                <xsl:attribute name="id">
                                    <xsl:value-of select="$boxid"/>
                                </xsl:attribute>
                                <xsl:attribute name="data-position">
                                    <xsl:value-of select="'top'"/>
                                </xsl:attribute>
                                <xsl:attribute name="data-column-start">
                                    <xsl:value-of select="'0'"/>
                                </xsl:attribute>
                                <xsl:apply-templates select="./node()"/>
                            </xsl:element>
                        </div>
                    </xsl:for-each>
					<xsl:for-each select="//*[@class='jrnlBlockQuote'and @data-type='pull-quote']">
						<xsl:variable name="pid" select="concat('BLK_BXQ',position())"/>
						<div class="floatBlock" id="{$pid}" data-stream-name="{concat('a_BXQ',position())}" data-id="{concat('BXQ',position())}">
							<div class="jrnlPullQuoteBlock" id="{$pid}" data-id="{concat('BXQ',position())}" data-stream-name="{concat('a_BXQ',position())}" data-type="pull-quote">
								<p class="jrnlPullQuoteBlock">
									<xsl:apply-templates select="@*[name()!='class']|node()"/>
								</p>
							</div>
						</div>
                    </xsl:for-each>
                <xsl:apply-templates/>
        </div>
    </xsl:template>
    <!-- Remove boxblock for body part-->
    <xsl:template match="//*[@class='body' or @class='back' or @class='front']//*[@class='jrnlBoxBlock']" priority="6"/>
    <xsl:template match="//*[@class='back']/*[contains(@class,'jrnlEthicsFNHead')]" priority="5">
        <xsl:choose>
            <xsl:when test="$template[contains(.,'template')]">
                <p class="jrnlEthicsFNParaFirst">
                    <span>
                        <xsl:apply-templates select="./@* | ./node()"/>
                        <xsl:text>: </xsl:text>
                    </span>
                    <span class="jrnlEthicsFNPara">
                        <xsl:apply-templates select="//*[@class='jrnlEthicsFNPara'][1]/node()"/>
                    </span>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlEthicsFNPara']" priority="5">
    <xsl:choose>
            <xsl:when test="$template[contains(.,'template')]">
				<xsl:choose>
					<xsl:when test="./preceding-sibling::*[@class='jrnlEthicsFNPara']">
						<p class="jrnlEthicsFNPara">
							<xsl:apply-templates/>
						</p>
					</xsl:when>
					<xsl:otherwise/>
				</xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='jrnlFigBlock'][not(@data-child-element='true')]/*[@class='jrnlFigCaption'][not(./preceding-sibling::*[@class='jrnlFigCaption'])]" priority="5">
        <xsl:element name="{name(.)}">
        <xsl:apply-templates select=" @* "/>
        <xsl:apply-templates select="./node()"/>
            <xsl:if test="following-sibling::*[@class='jrnlFigCaption']">
                <xsl:for-each select="following-sibling::*[@class='jrnlFigCaption']">
                <xsl:text> </xsl:text>
                    <span class="jrnlFigCaption">
                        <xsl:apply-templates select="./node()"/>
                    </span>
                </xsl:for-each>
            </xsl:if>
        </xsl:element>
    </xsl:template>
     <!--If figure pdf then child node caption runon -->
     <xsl:template match="*[@class='jrnlFigBlock'][@data-child-element='true']/*[@class='jrnlFigCaption'][not(./preceding-sibling::*[@class='jrnlFigCaption'])]" priority="5">
      <xsl:choose>
        <xsl:when test="$pdfType = 'figure'">
            <xsl:element name="{name(.)}">
            <xsl:apply-templates select=" @* "/>
            <xsl:apply-templates select="./node()"/>
                <xsl:if test="following-sibling::*[@class='jrnlFigCaption']">
                    <xsl:for-each select="following-sibling::*[@class='jrnlFigCaption']">
                    <xsl:text> </xsl:text>
                        <span class="jrnlFigCaption">
                            <xsl:apply-templates select="./node()"/>
                        </span>
                    </xsl:for-each>
                </xsl:if>
            </xsl:element>
        </xsl:when>
        <xsl:otherwise>
             <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
              </xsl:element>
        </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="*[@class='jrnlSupplBlock'][@data-child-element='true']/*[@class='jrnlSupplCaption'][not(./preceding-sibling::*[@class='jrnlSupplCaption'])]" priority="5">
      <xsl:choose>
        <xsl:when test="$pdfType = 'figure'">
            <xsl:element name="{name(.)}">
            <xsl:apply-templates select=" @*[name()!='class'] "/>
            <xsl:attribute name="class">jrnlFloatSupplCaption</xsl:attribute>
            <xsl:apply-templates select="./node()"/>
                <xsl:if test="following-sibling::*[@class='jrnlSupplCaption']">
                    <xsl:for-each select="following-sibling::*[@class='jrnlSupplCaption']">
                    <xsl:text> </xsl:text>
                        <span class="jrnlFloatSupplCaption">
                        <xsl:apply-templates select="./@*[name()!='class'] "/>
                            <xsl:apply-templates select="./node()"/>
                        </span>
                    </xsl:for-each>
                </xsl:if>
            </xsl:element>
        </xsl:when>
        <xsl:otherwise>
             <xsl:element name="{./name()}">
                    <xsl:apply-templates select="./@*[name()!='class'] "/>
            <xsl:attribute name="class">jrnlFloatSupplCaption</xsl:attribute>
            <xsl:apply-templates select="./node()"/>
              </xsl:element>
        </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	
    <xsl:template match="*[@class='jrnlVidBlock'][not(@data-child-element='true')]/*[@class='jrnlVidCaption'][not(./preceding-sibling::*[@class='jrnlVidCaption'])]" priority="5">
        <xsl:element name="{name(.)}">
        <xsl:apply-templates select=" @* "/>
        <xsl:apply-templates select="./node()"/>
            <xsl:if test="following-sibling::*[@class='jrnlVidCaption']">
                <xsl:for-each select="following-sibling::*[@class='jrnlVidCaption']">
                <xsl:text> </xsl:text>
                    <span class="jrnlVidCaption">
                        <xsl:apply-templates select="./node()"/>
                    </span>
                </xsl:for-each>
            </xsl:if>
        </xsl:element>
    </xsl:template>
     <xsl:template match="div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote'][not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])]]" priority="7">
         <xsl:choose>
            <xsl:when test="$template[contains(.,'template')]">
            <xsl:element name="{name(.)}">
                <xsl:apply-templates select="@*|node()"/>
                <xsl:choose>
                    <xsl:when test="not(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))])"> 
                      <xsl:for-each select="preceding-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
                           <xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote'and @data-type='pull-quote']) + 1"/>
                          <!--   <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/> -->
                            
						    <span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
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
	<xsl:template match="div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']]" priority="7"><!--|div[@class='body']/*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBlockQuote' and @data-type='margin']]-->
    <xsl:element name="{name(.)}">
        <!--<xsl:apply-templates select="@*|node()"/> -->
        <xsl:apply-templates select="@*"/>
        <xsl:if test="./@class='jrnlSecPara'">
        <xsl:choose>
            <xsl:when test="not(./preceding::*[@class='jrnlSecPara'])">
                    <xsl:attribute name="data-spl-style">
						<xsl:value-of select="'DropCap-TXT'"/>
					</xsl:attribute>
            </xsl:when>
        </xsl:choose>
        </xsl:if>
        <xsl:apply-templates select="node()"/>  
        <xsl:choose>
			<xsl:when test="$template[contains(.,'template')]">
				<xsl:variable name="current" select="generate-id(.)"/>
				<xsl:for-each select="./following-sibling::*[@class='jrnlBlockQuote' and @data-type='pull-quote']">
				<xsl:variable name="blockId" select="count(preceding::*[@class='jrnlBlockQuote' and @data-type='pull-quote']) + 1"/>
					<xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
								<span class="jrnlFirstCitation" data-rid="{concat('BXQ',$blockId)}"/>
					</xsl:if>
				</xsl:for-each>
			</xsl:when>
        </xsl:choose>
    </xsl:element>
</xsl:template>
<xsl:template match="//*[@class='body']//*[@class='jrnlBlockQuote' and @data-type='pull-quote']" priority="5">
        <xsl:choose>
            <xsl:when test="$template[contains(.,'template')]"/>
            <xsl:otherwise>
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
         </xsl:choose>
    </xsl:template> 
    <xsl:template match="//div[@class='back']//*[@class='jrnlFootNoteFN']" priority="5">
        <xsl:element name="{name()}">
             <xsl:variable name="class">
                <xsl:choose>
                    <xsl:when test="$template[contains(.,'template')]">
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
                    <xsl:when test="$template[contains(.,'template')]">
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
    <xsl:template match="*[@class='back']//*[@class='jrnlBio']/p[@class='jrnlBiography']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>
  <xsl:template match="*[@class='back']//*[@class='jrnlAuthorBioBlock']//*[@class='jrnlEmail'][@removeEmail='true']" priority="5">
    <xsl:choose>
        <xsl:when test="./parent::*[@class='jrnlAuthorGroup'][@corresp='yes']">
            <xsl:element name="{name()}">
               <xsl:apply-templates select="@*|node()"/>
           </xsl:element>
        </xsl:when>
        <xsl:otherwise>
        </xsl:otherwise>
    </xsl:choose>
    </xsl:template> 
    <xsl:template match="div[@class='front']//*[@class='jrnlAffGroup'][@removeAffLabel='true']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test="count(.//*[@class='jrnlAff'])=1">
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
    <xsl:template match="*[@class='jrnlReviewers']/span[@class='jrnlAff']" priority="6"/>
    <xsl:template match="*[@class='jrnlAffGroup'][@removeNode='true']" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock'][not(@data-child-element='true')]//p[@class='jrnlFigCaption'][preceding-sibling::*[@class='jrnlFigCaption']]" priority="5"/>
    <!-- remove figcaption if figurepdf is figure bz figcaption for child is run on-->
    <xsl:template match="*[@class='jrnlFigBlock'][@data-child-element='true']//p[@class='jrnlFigCaption'][preceding-sibling::*[@class='jrnlFigCaption']]" priority="5">
       <xsl:choose>
        <xsl:when test="$pdfType = 'figure'"/>
         <xsl:otherwise>
           <xsl:element name="{name()}">
               <xsl:apply-templates select="@*|node()"/>
           </xsl:element>
         </xsl:otherwise>
        </xsl:choose>
     </xsl:template>
    <xsl:template match="*[@class='jrnlVidBlock'][not(@data-child-element='true')]//p[@class='jrnlVidCaption'][preceding-sibling::*[@class='jrnlVidCaption']]" priority="5"/>
	<xsl:template match="*[@class='jrnlSupplBlock'][@data-child-element='true']//p[@class='jrnlSupplCaption'][./preceding-sibling::*[@class='jrnlSupplCaption']]" priority="5"/>
<xsl:template match="*[@class='jrnlEditors']/span[@class='jrnlAff']" priority="6"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
     <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <!--<xsl:template match="*[@class='jrnlRefText']//*[@class='RefDOI']|*[@class='jrnlRefText']//*[@class='RefPMID']" priority="5"/> -->
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//p[@class='jrnlTblFoot']" priority="5"/>
    <!--<xsl:template match="@*[not(normalize-space())]"/>
    <xsl:template match="//div[matches(@class, 'jrnl(Fig|Tbl|Box|Vid)Block')][name((ancestor::*[matches(@class, 'jrnl(Fig|Tbl|Box|Vid)BlockGroup') or @class='jrnlAppBlock' or @class='jrnlBoxBlock'])[last()]) = '']|//*[matches(@class, 'jrnl(Fig|Tbl|Box|Vid)BlockGroup')][name((ancestor::*[@class='jrnlAppBlock'])[last()]) = '' or @data-orientation='landscape']|//*[@class='jrnlDigestBlock']|//*[@class='jrnlFootNoteFN']" priority="6"/>-->
    <!-- figblock without fig group appply mode jrnlFigBlockchild -->
    <xsl:template match="*[@class='floatBlock'][./*[@class='jrnlFigBlock']]" priority="5">
       <xsl:element name="{name()}">
                <xsl:apply-templates select="@*"/>
                <xsl:apply-templates select="." mode="jrnlFigBlock"/>
       </xsl:element>
   </xsl:template>
    
    <!--  for each figblock in fig group apply mode figchild(with floatblock) if pdf type is figure-->
     <xsl:template match="//*[@class='floatBlock']/*[@class='jrnlFigBlockGroup']//*[@class='jrnlFigBlock']" priority="5">
        <xsl:choose>
        <xsl:when test="$pdfType = 'figure'">
          <div class="floatBlock">
            <xsl:apply-templates select="." mode="jrnlFigBlock"/>
           </div>
       </xsl:when>
       <xsl:otherwise>
      <xsl:apply-templates select="." mode="jrnlFigBlock"/>
      </xsl:otherwise>
       </xsl:choose>
     </xsl:template>
      <!-- to remove floatblock for jrnlFigBlockGroup if pdfptype is figure -->
     <xsl:template match="*[@class='floatBlock'][./*[@class='jrnlFigBlockGroup']]" priority="5">
      <xsl:choose>
        <xsl:when test="$pdfType = 'figure'">
             <xsl:apply-templates/>
        </xsl:when>
        <xsl:otherwise>
           <xsl:element name="{name()}">
               <xsl:apply-templates select="@*|node()"/>
           </xsl:element>
         </xsl:otherwise>
      </xsl:choose>
    </xsl:template>
    <!-- to remove fig group for jrnlFigBlockGroup if pdfptype is figure -->
    <xsl:template match="//*[@class='jrnlFigBlockGroup']" priority="5">
      <xsl:choose>
        <xsl:when test="$pdfType = 'figure'">
           <xsl:apply-templates/>
        </xsl:when>
        <xsl:otherwise>
           <xsl:element name="{name()}">
               <xsl:apply-templates select="@*|node()"/>
           </xsl:element>
         </xsl:otherwise>
      </xsl:choose>
    </xsl:template>
    <!-- inline figure -->
    <xsl:template match="*[@class='jrnlFigBlock'][@data-inline='true']" priority="5">
        <xsl:apply-templates select="." mode="jrnlFigBlock"/>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlArtTitle'][./following-sibling::*[1][@class='sub-article-id']]" priority="5">
        <p class="sub-article">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            <xsl:text> </xsl:text>
            </span>
            <span class="jrnlSubArticleID" data-spl-style="jrnlSubArticleID">
                <xsl:for-each select="./following-sibling::*[1][@class='sub-article-id']">
                  <xsl:variable name="link" select="./node()"/>
                    <a href="{$link}">
                        <xsl:apply-templates select="./node()"/>
                    </a>
                </xsl:for-each>
             </span>
        </p>
    </xsl:template>
    <xsl:template match="//*[@class='sub-article-id'][./preceding-sibling::*[1][@class='jrnlArtTitle']]" priority="5"/>
	<xsl:template match="*[@class='jrnlFigBlock']//*[@class='jrnlFigCaption']//*[@class='jrnlTitle']" priority="5">
        <xsl:element name="{name()}">
            <xsl:choose>
                    <xsl:when test="$template[contains(.,'template')]">
                        <xsl:apply-templates select="@*"/>
                        <xsl:attribute name="data-spl-style">
            				<xsl:value-of select="'jrnlFigTitle'"/>
            			</xsl:attribute>
        			</xsl:when>
        			<xsl:otherwise>
            			<xsl:apply-templates select="@*"/>
        			</xsl:otherwise>
        		</xsl:choose>
            <xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:template>
	<!--<xsl:template match="*[(matches(@class, 'jrnl(.*?)BlockGroup'))]//*[@class='jrnlSupplBlock']//*[@class='jrnlSupplCaption']" priority="5">
        <p class="jrnlFloatSupplCaption">
            <xsl:apply-templates select="@*[name()!='class']|node()"/>
        </p>
    </xsl:template>-->
	<xsl:template match="*[@class='jrnlTblBlock']//*[@class='jrnlTblCaption']" priority="5">
        <xsl:element name="{name()}">
            <xsl:apply-templates select="@*"/>
                <xsl:if test="./node()='Key resources table'">
                    <xsl:attribute name="data-spl-style">
        				<xsl:value-of select="'jrnlKeyResourceTblHead'"/>
        			</xsl:attribute>
        		</xsl:if>
			<xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:template>
	<xsl:template match="h1[./following-sibling::*[1][@class='jrnlTblBlock']//*[@class='jrnlTblCaption'][./node()='Key resources table']]" priority="5">
       <xsl:element name="{name()}">
            <xsl:apply-templates select="@*"/>
                <xsl:attribute name="data-spl-style">
    				<xsl:value-of select="'jrnlMnMHead'"/>
    			</xsl:attribute>
            <xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:template>
	<xsl:template match="table[parent::*[@class='jrnlTblBlock']//*[@class='jrnlTblCaption'][./node()='Key resources table']]" priority="5">
       <xsl:element name="{name()}">
            <xsl:attribute name="class">
				<xsl:value-of select="'KeyResourcesTbl'"/>
			</xsl:attribute>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:element>
    </xsl:template>
	<xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]|div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <xsl:if test="count(./preceding-sibling::*[1][@class!='jrnlBoxBlock']) = 0">
                <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                </xsl:for-each>
            </xsl:if>
            <xsl:if test="count(./following-sibling::*[1][@class!='jrnlBoxBlock']) = 0">
                <xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                 <xsl:variable name="fs" select="./following-sibling::*[1]/@class"/>
                    <xsl:if test="(matches($fs,'jrnlBoxBlock'))or not($fs)">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                    </xsl:if>
                </xsl:for-each>
            </xsl:if> 
    </xsl:element>
    </xsl:template>
</xsl:stylesheet>
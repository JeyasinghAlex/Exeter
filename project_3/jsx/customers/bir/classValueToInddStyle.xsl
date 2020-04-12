<?xml version="1.0" encoding="UTF-8"?>
<!--
Tool name: classValueToInddStyle.xsl
Description: 
            1) This XSL will convert the HTML files received from kriya to InDesign comply XML. 
            2) Also applying "aid" style and constructing CALS table. 
            3) The "aid" styles are defined based on the parapraph, character, cell, table styles already available in the InDesign template.
Developer name: Augustine K
Date: 18-Aug-2016
Revision details 
Description: 
            1) 
            2)  
            3) 
Developer name: Augustine K
Date: 
-->
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:html="http://www.w3.org/TR/REC-html40"
	xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/" xmlns:aid5="http://ns.adobe.com/AdobeInDesign/5.0/" xmlns:xlink="http://www.w3.org/1999/xlink">
<xsl:template match="@* | node()">
  <xsl:copy>
	<xsl:apply-templates select="@* | node()"/>
  </xsl:copy>
</xsl:template>
<!--main root node - starts-->	
<!--collecting front-->	
<xsl:template match="div[@class='WordSection1']">
  <root xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/" xmlns:aid5="http://ns.adobe.com/AdobeInDesign/5.0/">
	 <xsl:apply-templates />
     <xsl:apply-templates select="//div[@class='floatBlock']"  mode="floatMode" />
     <doc>
        <xsl:attribute name="id" select="@data-artID"/>
         <xsl:apply-templates select="//div[@class='front']"  mode="rootMode" />
         <xsl:apply-templates select="//div[@class='body']"  mode="rootMode" />
         <xsl:apply-templates select="//div[@class='back']"  mode="rootMode" />
     </doc>
  </root>
</xsl:template>
<xsl:template match="//div[@class='front']|//div[@class='body']|//div[@class='back']|div[@id='queryDivNode']|//div[@class='floatBlock']" />
<xsl:template match="//div[@class='front']|//div[@class='body']|//div[@class='back']|div[@id='queryDivNode']" mode="rootMode">
    <xsl:choose>
        <xsl:when test=".=''"/>
        <xsl:otherwise>
          <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
          </xsl:copy>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="//div[@class='floatBlock']" mode="floatMode">
    <floatBlock>
            <xsl:apply-templates select="@* | node()"/>
    </floatBlock>
</xsl:template>

<!--main root node - ends-->
<!--Adding paragraph return to nodes starts-->
<xsl:template name="Entermark">
<xsl:text>
</xsl:text>
</xsl:template>
<!--Adding paragraph return to nodes ends-->
<xsl:template match="//div[@class='jrnlVidBlock']">
    <xsl:choose>
        <xsl:when test="ancestor::div[@class='body']">
        </xsl:when>
        <xsl:otherwise>
        <div>
            <xsl:apply-templates select="@* | node()"/>
        </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//div[@class='jrnlFootNoteFN']">
    <xsl:choose>
        <xsl:when test="ancestor::div[@class='back']">
        </xsl:when>
        <xsl:otherwise>
        <div>
            <xsl:apply-templates select="@* | node()"/>
        </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//div[@class='jrnlAppBlock']"/><!---->
<xsl:template match="//div[@class='jrnlFigBlock']">
    <xsl:choose>
        <xsl:when test="ancestor::div[@class='front']">
        </xsl:when>
        <xsl:when test="ancestor::div[@class='body']">
        </xsl:when>
        <xsl:when test="ancestor::div[@class='back']">
        </xsl:when>
        <xsl:otherwise>
        <div>
            <xsl:apply-templates select="@* | node()"/>
        </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//div[@class='jrnlTblBlock']">
    <xsl:choose>
        <xsl:when test="ancestor::div[@class='body']">
        </xsl:when>
        <xsl:when test="ancestor::div[@class='back']">
        </xsl:when>
        <xsl:otherwise>
        <div>
            <xsl:apply-templates select="@* | node()"/>
        </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//div[@class='jrnlBoxBlock']">
    <xsl:choose>
        <xsl:when test="ancestor::div[@class='body']">
        </xsl:when>
        <xsl:when test="ancestor::div[@class='back']">
        </xsl:when>
        <xsl:otherwise>
        <div>
            <xsl:apply-templates select="@* | node()"/>
        </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//p|//h1|//h2|//h3|//h4|//h5|//h6"> 
<xsl:if test="@class">
    <xsl:variable name="className">
      <xsl:value-of select="@class"/>   
   </xsl:variable>
   <xsl:variable name="nodeName">
        <xsl:value-of select ="name(.)"/>
   </xsl:variable>
       <xsl:variable name="precedingNodeClassName">
            <xsl:value-of select="preceding-sibling::*[1]/@class"/>   
       </xsl:variable>
      <xsl:variable name="StyleName">
        <xsl:variable name="stringValue" select="."/>
        <xsl:if test="$className = 'jrnlSecPara'">
            <xsl:if test="ancestor::div[@class='body']/preceding-sibling::div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='body']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="ancestor::jrnlTitlePage">
                  <xsl:text>TTL_PG_TXT</xsl:text>
               </xsl:when>
               <xsl:when test="@data-spl-style"><!--If the requirement is any specific style for paragraphs, then we could use that style name in this attribute and should be matched on template-->
                  <xsl:value-of select="@data-spl-style"/>
               </xsl:when>
               <xsl:when test="ancestor::tr|ancestor::TR and (ancestor::table[@class='APP_TBL'])">
                    <xsl:text>APP_TB</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::tr|ancestor::TR and not(ancestor::table[@class='APP_TBL'])">
                    <xsl:text>TB</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlSeriesPage and not(preceding-sibling::p[@class='jrnlSecPara'])">
                  <xsl:text>SR_PAGE_FIRST</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlSeriesPage">
                  <xsl:text>SR_PAGE_TXT</xsl:text>
               </xsl:when>
               <xsl:when test="parent::jrnlCopyRightPage and not(preceding-sibling::p[@class='jrnlSecPara'])">
                  <xsl:text>CY_PG_TXT_FIRST</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlCopyRightPage and (position()=5 or position()=10 or position()=11 or position()=12 or position()=13)">
                  <xsl:text>CY_PG_TXT_SPACE</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlCopyRightPage and not(following-sibling::p[@class='jrnlSecPara'])">
                  <xsl:text>CY_PG_TXT_DISC</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlCopyRightPage">
                  <xsl:text>CY_PG_TXT</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlDedPage and not(preceding-sibling::p[@class='jrnlSecPara'])">
                  <xsl:text>DED_PG_TXT_FIRST</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::jrnlDedPage">
                  <xsl:text>DED_PG_TXT</xsl:text>
               </xsl:when>
               <xsl:when test="not(preceding-sibling::p[@class='jrnlSecPara']) and not(preceding-sibling::h1[@class='jrnlHead1'])">
                  <xsl:text>TXT_CHAP_FIRST</xsl:text>
               </xsl:when>
               <xsl:when test="$precedingNodeClassName = 'jrnlSecParaAuthors' or $precedingNodeClassName = 'jrnlHead1' or $precedingNodeClassName = 'jrnlHead2' or $precedingNodeClassName = 'jrnlHead3' or $precedingNodeClassName = 'jrnlHead4' or $precedingNodeClassName = 'jrnlDispEqn' or $precedingNodeClassName = 'jrnlHead1' or @data-no-indent='true'">
                  <xsl:text>TXT</xsl:text>
               </xsl:when>
               <xsl:when test="$precedingNodeClassName = 'jrnlBlockQuote' or $precedingNodeClassName = 'jrnlExtract'" >
                  <xsl:text>TXT_CONT</xsl:text>
               </xsl:when>   			
               <xsl:when test="$precedingNodeClassName = 'jrnlTblBlock' or $precedingNodeClassName = 'jrnlFigBlock'">
                  <xsl:text>TXI</xsl:text>
               </xsl:when>   			
               <xsl:when test="preceding-sibling::*[1][name()='ol'] or preceding-sibling::*[1][name()='ul'] ">
                  <xsl:text>TXT_AFTER_LIST</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>TXI</xsl:text><!--<xsl:text>TXI</xsl:text>-->
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlArtTitle'"><!--Book frontmatter title styles-->
            <xsl:if test="parent::div[@class='front']/@prefix">
                    <xsl:value-of select="./parent::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="following-sibling::jrnlArtSubTitle">
                  <xsl:text>CHAP_TTL_SUB</xsl:text>
               </xsl:when>   			                
               <xsl:when test="ancestor::jrnlHalfTitlePage">
                  <xsl:text>HALF_TTL</xsl:text>
               </xsl:when>   			
               <xsl:when test="ancestor::jrnlTitlePage">
                  <xsl:text>BK_TTL</xsl:text>
               </xsl:when>   			                
               <xsl:when test="ancestor::jrnlContribPage or  ancestor::jrnlForewordPage or ancestor::jrnlPrefacePage or ancestor::jrnlAckPage">
                  <xsl:text>FM_TTL</xsl:text>
               </xsl:when>   			                
               <xsl:when test="ancestor::jrnlTOCPage">
                  <xsl:text>TOC_TTL</xsl:text>
               </xsl:when>   			                
               <xsl:otherwise>
                  <xsl:text>jrnlArtTitle</xsl:text><!--<xsl:text>TXI</xsl:text>-->
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlHead1'">
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="preceding-sibling::*[1][name() = 'ol']">
                  <xsl:text>jrnlHead1_After_OL</xsl:text>
               </xsl:when>
               <xsl:when test="preceding-sibling::*[1][name() = 'ul']">
                  <xsl:text>jrnlHead1_After_UL</xsl:text>
               </xsl:when>
               <xsl:when test="not(preceding-sibling::*[1][@class])">
                  <xsl:text>jrnlHead1_First</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlHead1</xsl:text><!--<xsl:text>TXI</xsl:text>-->
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlAbsPara'">
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="not(following-sibling::*[1]) and not(string(ancestor::div[@class='front']/following-sibling::div[@class='body'])) and not(string(ancestor::div[@class='front']/following-sibling::div[@class='back']))">
                  <xsl:text>jrnlAbsPara_NBM</xsl:text>
               </xsl:when>
               <xsl:when test="not(following-sibling::*[1]) and not(string(ancestor::div[@class='front']/following-sibling::div[@class='body']))">
                  <xsl:text>jrnlAbsPara_BM</xsl:text>
               </xsl:when>
               <xsl:when test="not(following-sibling::*[1]) or (not(following-sibling::*[1]) and not(preceding-sibling::*[1]))">
                  <xsl:text>jrnlAbsParaLast</xsl:text>
               </xsl:when>
               <xsl:when test="not(preceding-sibling::*[1]) or preceding-sibling::*[1]/@class='jrnlAbsHead'">
                  <xsl:text>jrnlAbsParaFirst</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlAbsPara</xsl:text><!--<xsl:text>TXI</xsl:text>-->
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlHead2'">
            <xsl:variable name="precedingNodeClassName" select="preceding-sibling::*[1]/@class"/>
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="preceding-sibling::*[1][name() = 'ol']">
                  <xsl:text>jrnlHead2_After_OL</xsl:text>
               </xsl:when>
               <xsl:when test="preceding-sibling::*[1][name() = 'ul']">
                  <xsl:text>jrnlHead2_After_UL</xsl:text>
               </xsl:when>
               <xsl:when test="$precedingNodeClassName = 'jrnlHead1'">
                  <xsl:text>jrnlHead2_H1</xsl:text>
               </xsl:when>

               <xsl:otherwise>
                  <xsl:text>jrnlHead2</xsl:text><!--<xsl:text>TXI</xsl:text>-->
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlHead3'">
            <xsl:variable name="precedingNodeClassName" select="preceding-sibling::*[1]/@class"/>
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="preceding-sibling::*[1][name() = 'ol']">
                  <xsl:text>jrnlHead3_After_OL</xsl:text>
               </xsl:when>
               <xsl:when test="preceding-sibling::*[1][name() = 'ul']">
                  <xsl:text>jrnlHead3_After_UL</xsl:text>
               </xsl:when>
               <xsl:when test="$precedingNodeClassName = 'jrnlHead2'">
                  <xsl:text>jrnlHead3_H2</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlHead3</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlHead4'">
            <xsl:variable name="precedingNodeClassName" select="preceding-sibling::*[1]/@class"/>
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="preceding-sibling::*[1][name() = 'ol']">
                  <xsl:text>jrnlHead4_After_OL</xsl:text>
               </xsl:when>
               <xsl:when test="preceding-sibling::*[1][name() = 'ul']">
                  <xsl:text>jrnlHead4_After_UL</xsl:text>
               </xsl:when>
               <xsl:when test="$precedingNodeClassName = 'jrnlHead3'">
                  <xsl:text>jrnlHead4_H3</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlHead4</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlAuthors'">
            <xsl:if test="@data-prefix">
                <xsl:value-of select="./@data-prefix"/>
                <xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix">
                        <xsl:value-of select="./ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlAuthors</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlAuthors</xsl:text>
                </xsl:when>
               <xsl:when test="ancestor::jrnlTitlePage">
                  <xsl:text>TTL_PG_jrnlAuthors</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlAuthors</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlEPubDate'">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlEPubDate</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix">
                        <xsl:value-of select="./ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlEPubDate</xsl:text>
                </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlEPubDate</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlReDate'">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlReDate</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix">
                        <xsl:value-of select="./ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlReDate</xsl:text>
                </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlReDate</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlAcDate'">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlAcDate</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix">
                        <xsl:value-of select="./ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlAcDate</xsl:text>
                </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlAcDate</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlRevDate'">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlRevDate</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix">
                        <xsl:value-of select="./ancestor::div[@class='back']/preceding-sibling::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlRevDate</xsl:text>
                </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlRevDate</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlDOI'">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='front']/@prefix">
                        <xsl:value-of select="ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
                        <xsl:text>jrnlDOI</xsl:text>
                </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlDOI</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlAff'">
            <xsl:if test="@data-prefix">
                <xsl:value-of select="./@data-prefix"/>
                <xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="ancestor::jrnlTitlePage">
                  <xsl:text>TTL_PG_jrnlAff</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlAff</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlTblHead'">
            <xsl:text>jrnlTblHead</xsl:text>
            <xsl:choose>
                <xsl:when test="ancestor::td[@align='center'] or ancestor::th[@align='center']">
                    <xsl:text>_CTR</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::td[@align='right'] or ancestor::th[@align='right']">
                    <xsl:text>_RGT</xsl:text>
                </xsl:when>
               <xsl:otherwise/>
            </xsl:choose>
            <xsl:if test="ancestor::thead[@data-font-size]">
                  <xsl:text>_</xsl:text><xsl:value-of select="ancestor::thead[@data-font-size]/@data-font-size"/>
            </xsl:if>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlTblBody'">
            <xsl:choose>
               <xsl:when test="//ancestor::thead/parent::table[@class='jrnlKeyPoints'] and not(ancestor::div[@class='jrnlTblBlock'])">
                  <xsl:text>jrnlKeyPointsHead</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::thead">
                  <xsl:text>jrnlTblHead</xsl:text>
               </xsl:when>
               <xsl:when test="ancestor::tr[@data-p-thead='true']">
                  <xsl:text>jrnlTblHead</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlTblBody</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
            <xsl:choose>
                <xsl:when test="ancestor::td[@align='center']">
                    <xsl:text>_CTR</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::td[@align='right']">
                    <xsl:text>_RGT</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::th[@align='center']">
                    <xsl:text>_CTR</xsl:text>
                </xsl:when>
                <xsl:when test="ancestor::th[@align='right']">
                    <xsl:text>_RGT</xsl:text>
                </xsl:when>
               <xsl:otherwise/>
            </xsl:choose>
            <xsl:if test="ancestor::tbody[@data-font-size]">
                  <xsl:text>_</xsl:text><xsl:value-of select="ancestor::tbody[@data-font-size]/@data-font-size"/>
            </xsl:if>
         </xsl:if>   
        <xsl:if test="$className = 'jrnlEqnPara'">
            <xsl:choose>
               <xsl:when test="not(preceding-sibling::*[1]/@class='jrnlEqnPara') and not(following-sibling::*[1]/@class='jrnlEqnPara') and not(following-sibling::*[1]/@class='jrnlEqnPara') and (following-sibling::*[1]/@class='jrnlHead1' or following-sibling::*[1]/@class='jrnlHead2' or following-sibling::*[1]/@class='jrnlHead3' or following-sibling::*[1]/@class='jrnlHead4' or  following-sibling::*[1]/@class='jrnlHead5' or  following-sibling::*[1]/@class='jrnlHead6' or  following-sibling::*[1]/@class='jrnlRefHead' or  following-sibling::*[1]/@class='jrnlAckHead')">
                  <xsl:text>EQN-O-BEFORE-HEAD</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1]/@class='jrnlEqnPara') and not(following-sibling::*[1]/@class='jrnlEqnPara') and (preceding-sibling::*[1]/@class='jrnlHead1' or preceding-sibling::*[1]/@class='jrnlHead2' or preceding-sibling::*[1]/@class='jrnlHead3' or preceding-sibling::*[1]/@class='jrnlHead4' or preceding-sibling::*[1]/@class='jrnlHead5' or preceding-sibling::*[1]/@class='jrnlHead6' or preceding-sibling::*[1]/@class='jrnlRefHead' or preceding-sibling::*[1]/@class='jrnlAckHead')">
                  <xsl:text>EQN-O-AFTER-HEAD</xsl:text>
               </xsl:when>   			
                <xsl:when test="not(preceding-sibling::*[1]/@class='jrnlEqnPara') and not(following-sibling::*[1]/@class='jrnlEqnPara')">
                  <xsl:text>EQN-O</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1]/@class='jrnlEqnPara') and following-sibling::*[1]/@class='jrnlEqnPara'">
                  <xsl:text>EQN-T</xsl:text>
               </xsl:when>   			
               <xsl:when test="preceding-sibling::*[1]/@class='jrnlEqnPara' and not(following-sibling::*[1]/@class='jrnlEqnPara')">
                  <xsl:text>EQN-B</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>EQN</xsl:text>
               </xsl:otherwise>   			            
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlExtract'">
            <xsl:choose>
               <xsl:when test="not(preceding-sibling::*[1][name()='jrnlExtract']) and not(following-sibling::*[1][name()='jrnlExtract']) and not(following-sibling::*[1][name()='jrnlExtract']) and (following-sibling::*[1][name()='jrnlHead1'] or following-sibling::*[1][name()='jrnlHead2'] or following-sibling::*[1][name()='jrnlHead3'] or following-sibling::*[1][name()='jrnlHead4'] or following-sibling::*[1][name()='jrnlHead5'] or following-sibling::*[1][name()='jrnlHead6'] or following-sibling::*[1][name()='jrnlRefHead'] or following-sibling::*[1][name()='jrnlAckHead'])">
                  <xsl:text>EXT-O-BEFORE-HEAD</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][name()='jrnlExtract']) and not(following-sibling::*[1][name()='jrnlExtract']) and (preceding-sibling::*[1][name()='jrnlHead1'] or preceding-sibling::*[1][name()='jrnlHead2'] or preceding-sibling::*[1][name()='jrnlHead3'] or preceding-sibling::*[1][name()='jrnlHead4'] or preceding-sibling::*[1][name()='jrnlHead5'] or preceding-sibling::*[1][name()='jrnlHead6'] or preceding-sibling::*[1][name()='jrnlRefHead'] or preceding-sibling::*[1][name()='jrnlAckHead'])">
                  <xsl:text>EXT-O-AFTER-HEAD</xsl:text>
               </xsl:when>   			
                <xsl:when test="not(preceding-sibling::*[1][name()='jrnlExtract']) and not(following-sibling::*[1][name()='jrnlExtract'])">
                  <xsl:text>EXT-O</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][name()='jrnlExtract']) and following-sibling::*[1][name()='jrnlExtract']">
                  <xsl:text>EXT-T</xsl:text>
               </xsl:when>   			
               <xsl:when test="preceding-sibling::*[1][name()='jrnlExtract'] and not(following-sibling::*[1][name()='jrnlExtract'])">
                  <xsl:text>EXT-B</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>EXT</xsl:text>
               </xsl:otherwise>   			            
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlEqualContribFN'">
            <xsl:if test="@data-prefix">
                <xsl:value-of select="./@data-prefix"/>
                <xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="not(preceding-sibling::*[1][@class='jrnlEqualContribFN'])">
                  <xsl:text>jrnlEqualContribFN</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>jrnlEqualContribFN-B</xsl:text>
               </xsl:otherwise>   			            
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlBlockQuote'">
            <xsl:if test="parent::div[@class='jrnlBoxBlock']">
                <xsl:text>BOX_</xsl:text>
            </xsl:if>
            <xsl:if test="ancestor::div[@class='jrnlTblBlock']">
                <xsl:text>TBL_</xsl:text>
            </xsl:if>
            <xsl:choose>
               <xsl:when test="@data-spl-style"><!--If the requirement is any specific style for paragraphs, then we could use that style name in this attribute and should be matched on template-->
                  <xsl:value-of select="@data-spl-style"/>
               </xsl:when>
               <xsl:when test="(preceding-sibling::*[1][@class='jrnlHead1']) or (preceding-sibling::*[1][@class='jrnlHead2']) or (preceding-sibling::*[1][@class='jrnlHead3']) or (preceding-sibling::*[1][@class='jrnlHead4']) and following-sibling::*[1][@class='jrnlBlockQuote']">
                  <xsl:text>QUOTE-SPL-NO_SPACE</xsl:text>
               </xsl:when>   			
               <xsl:when test="(preceding-sibling::*[1][@class='jrnlHead1']) or (preceding-sibling::*[1][@class='jrnlHead2']) or (preceding-sibling::*[1][@class='jrnlHead3']) or (preceding-sibling::*[1][@class='jrnlHead4']) and not(following-sibling::*[1][@class='jrnlBlockQuote'])">
                  <xsl:text>QUOTE-SPL</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][@class='jrnlBlockQuote']) and not(following-sibling::*[1][@class='jrnlBlockQuote']) and (preceding-sibling::*[1][@class='jrnlHead1'] or preceding-sibling::*[1][@class='jrnlHead2'] or preceding-sibling::*[1][@class='jrnlHead3'] or preceding-sibling::*[1][@class='jrnlHead4'] or preceding-sibling::*[1][@class='jrnlHead5'] or preceding-sibling::*[1][@class='jrnlHead6'] or preceding-sibling::*[1][@class='jrnlRefHead'] or preceding-sibling::*[1][@class='jrnlAckHead'])">
                  <xsl:text>QUOTE-O-AFTER-HEAD</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][@class='jrnlBlockQuote']) and not(following-sibling::*[1][@class='jrnlBlockQuote'])">
                  <xsl:text>QUOTE-O</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][@class='jrnlBlockQuote']) and following-sibling::*[1][@class='jrnlBlockQuote']">
                  <xsl:text>QUOTE-T</xsl:text>
               </xsl:when>   			
               <xsl:when test="following-sibling::*[1][@class='jrnlHead1'] or following-sibling::*[1][@class='jrnlHead2'] or following-sibling::*[1][@class='jrnlHead3'] or following-sibling::*[1][@class='jrnlHead4'] or following-sibling::*[1][@class='jrnlHead5'] or following-sibling::*[1][@class='jrnlHead6'] or following-sibling::*[1][@class='jrnlRefHead'] or following-sibling::*[1][@class='jrnlAckHead']">
                  <xsl:text>QUOTE-BEFORE-HEAD</xsl:text>
               </xsl:when>   			
               <xsl:when test="preceding-sibling::*[1][@class='jrnlBlockQuote'] and not(following-sibling::*[1][@class='jrnlBlockQuote']) and not(following-sibling::*[1][@class='jrnlHead1']) and not(following-sibling::*[1][@class='jrnlHead2']) and not(following-sibling::*[1][@class='jrnlHead3']) and not(following-sibling::*[1][@class='jrnlHead4']) and not(following-sibling::*[1][@class='jrnlHead5']) and not(following-sibling::*[1][@class='jrnlHead6']) and not(following-sibling::*[1][@class='jrnlRefHead']) and not(following-sibling::*[1][@class='jrnlAckHead'])">
                  <xsl:text>QUOTE-B</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>QUOTE</xsl:text>
               </xsl:otherwise>   			            
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlDialogue'">
            <xsl:choose>
               <xsl:when test="not(preceding-sibling::*[1][name()='jrnlDialogue']) and not(following-sibling::*[1][name()='jrnlDialogue'])">
                  <xsl:text>DIA-O</xsl:text>
               </xsl:when>   			
               <xsl:when test="not(preceding-sibling::*[1][name()='jrnlDialogue']) and following-sibling::*[1][name()='jrnlDialogue']">
                  <xsl:text>DIA-T</xsl:text>
               </xsl:when>   			
               <xsl:when test="following-sibling::*[1][name()='jrnlHead1'] or following-sibling::*[1][name()='jrnlHead2'] or following-sibling::*[1][name()='jrnlHead3'] or following-sibling::*[1][name()='jrnlHead4'] or following-sibling::*[1][name()='jrnlHead5'] or following-sibling::*[1][name()='jrnlHead6'] or following-sibling::*[1][name()='jrnlRefHead'] or following-sibling::*[1][name()='jrnlAckHead']">
                  <xsl:text>DIA</xsl:text>
               </xsl:when>   			
               <xsl:when test="preceding-sibling::*[1][name()='jrnlDialogue'] and not(following-sibling::*[1][name()='jrnlDialogue'])">
                  <xsl:text>DIA-B</xsl:text>
               </xsl:when>   			
               <xsl:otherwise>
                  <xsl:text>DIA</xsl:text>
               </xsl:otherwise>   			            
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlBoxText'">
            <xsl:variable name="precedingNodeClassName" select="preceding-sibling::*[1]/@class"/>
            <xsl:choose>
               <xsl:when test="@data-spl-style">
                  <xsl:value-of select="@data-spl-style"/>
               </xsl:when>
               <xsl:when test ="$precedingNodeClassName = 'jrnlHead1' or not($precedingNodeClassName = 'jrnlBoxText') or ./@data-no-indent='true'">
                  <xsl:text>BOX_TXT</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>BOX_TXI</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlFN'">
            <xsl:choose>
               <xsl:when test ="parent::div[@class='jrnlFNGroup']">
                  <xsl:text>jrnlFNGroup</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlFN</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlArtType'">
            <xsl:choose>
               <xsl:when test ="ancestor::div[@class='front']/@prefix">
                <xsl:value-of select="./ancestor::div[@class='front']/@prefix"/><xsl:text>_</xsl:text><xsl:text>jrnlArtType</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>jrnlArtType</xsl:text>
               </xsl:otherwise>								
            </xsl:choose>
        </xsl:if>
        <xsl:if test="$className = 'jrnlRefText'"><!--clasifying ref list-->
                <xsl:text>jrnlRefText</xsl:text>
               <xsl:variable name="listCount" select="count(parent::div[@class='back']/child::p[@class='jrnlRefText'])" />
      			<xsl:choose>
      				<xsl:when test="not(preceding-sibling::p[@class='jrnlRefText']) and (following-sibling::p[@class='jrnlRefText'])">     				  
					<xsl:text>-T</xsl:text>
					<!--Two digit lists-->			
      				  <xsl:if test="$listCount &gt; 9 and ($listCount &lt; 100)">
      				     <xsl:text>2</xsl:text>   
      				  </xsl:if>
      	           <!--Three digit lists-->			      				  
      				  <xsl:if test="$listCount &gt; 99 and $listCount &lt; 999">
      				     <xsl:text>3</xsl:text>   
      				  </xsl:if>
      				</xsl:when>
                  <xsl:when test="preceding-sibling::p[@class='jrnlRefText'] and not(following-sibling::p[@class='jrnlRefText'])">    				  
      	           <xsl:text>-B</xsl:text>
      	           <!--Two digit lists-->			
      				  <xsl:if test="$listCount &gt; 9 and ($listCount &lt; 100)">
      				     <xsl:text>2</xsl:text>   
      				  </xsl:if>
      	           <!--Three digit lists-->			      				  
      				  <xsl:if test="$listCount &gt; 99 and $listCount &lt; 999">
      				     <xsl:text>3</xsl:text>   
      				  </xsl:if>
      				</xsl:when>
                  <xsl:when test="not(preceding-sibling::p[@class='jrnlRefText']) and not(following-sibling::p[@class='jrnlRefText'])">     				  
      	            <xsl:text>-O</xsl:text>					
      				</xsl:when>
      				<xsl:otherwise>
      	           <xsl:choose>
      	           <!--Two digit lists-->			      	           
         				  <xsl:when test="$listCount &gt; 9 and not($listCount &gt; 100)">
                           <xsl:if test="count(preceding-sibling::p[@class='jrnlRefText']) &gt;= 9">
                              <xsl:text>2-1</xsl:text>   
                           </xsl:if>
                           <xsl:if test="count(preceding-sibling::p[@class='jrnlRefText']) &lt; 9">
                              <xsl:text>2-0</xsl:text>   
                           </xsl:if>                                                
         				  </xsl:when>
      	           <!--Three digit lists-->			      				        	                  	                     				  
         				  <xsl:otherwise>
                           <xsl:if test="count(preceding-sibling::p[@class='jrnlRefText']) &gt;= 99">
                              <xsl:text>3-2</xsl:text>   
                           </xsl:if>
                           <xsl:if test="count(preceding-sibling::p[@class='jrnlRefText']) &lt; 99 and not(count(preceding-sibling::p[@class='jrnlRefText']) &lt; 9)">
                              <xsl:text>3-1</xsl:text>   
                           </xsl:if>                                                
                           <xsl:if test="count(preceding-sibling::p[@class='jrnlRefText']) &lt; 9 and $listCount &gt; 100">
                              <xsl:text>3-0</xsl:text>   
                           </xsl:if>                                                
         				  </xsl:otherwise>         				  
      	           </xsl:choose>
                  </xsl:otherwise>
            </xsl:choose>
        </xsl:if>   
    </xsl:variable>
    <xsl:variable name="stringValue" select="."/>
    <xsl:choose>
       <xsl:when test="$StyleName = 'jrnlTblBody' or $StyleName = 'jrnlTblHead'">
           <xsl:element name="{$nodeName}">
            <xsl:attribute name="aid:pstyle" select="$StyleName"/>
            <xsl:attribute name="pstyle" select="$StyleName"/>
            <xsl:if test="@align and $StyleName = 'jrnlTblHead'">
                <xsl:attribute name="align" select="@align"/>
            </xsl:if>
            <xsl:if test="./ancestor::td[@align] and $StyleName = 'jrnlTblBody'">
                <xsl:attribute name="align" select="./ancestor::td/@align"/>
            </xsl:if>
            <xsl:if test="./ancestor::td[@data-align]">
                    <xsl:attribute name="data-align" select="./ancestor::td/@data-align"/>
                    <xsl:attribute name="char-align-width" select="./ancestor::td/@char-align-width"/>
                    <xsl:attribute name="data-align-left-width" select="./ancestor::td/@data-align-left-width"/>
            </xsl:if>
            <xsl:if test="./ancestor::td[@data-align-right-width]">
                    <xsl:attribute name="data-align-right-width" select="./ancestor::td/@data-align-right-width"/>
            </xsl:if>
             <xsl:apply-templates/>
            </xsl:element>        
       </xsl:when>
        <xsl:when test="not($StyleName = '')">
           <xsl:element name="{$nodeName}">
              <xsl:attribute name="aid:pstyle" select="$StyleName"/>
              <xsl:attribute name="pstyle" select="$StyleName"/>
                <xsl:choose>
                    <xsl:when test="./child::span[@class='jrnlAbsPara']">
                        <xsl:attribute name="data-word-spacing" select="./child::span[@class='jrnlAbsPara']/@data-word-spacing"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="data-word-spacing" select="@data-word-spacing"/>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:attribute name="START_PAGE" select="//*/@data-article-page-number"/>
                <xsl:attribute name="data-short-page" select="//*/@data-short-page"/>
                <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                <xsl:if test="$StyleName = 'QUOTE-O' or $StyleName = 'EXT-O' or $StyleName = 'DIA-O' and not(@data-top-gap='')">
                    <xsl:attribute name="data-bottom-gap" select="@data-bot-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="$StyleName = 'QUOTE-B' or $StyleName = 'EXT-B' or $StyleName = 'DIA-B' and not(@data-bot-gap='')">
                    <xsl:attribute name="data-bottom-gap" select="@data-bot-gap"/>
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="$StyleName = 'EXT-B' and not(@data-bot-gap='')">
                    <xsl:attribute name="data-bottom-gap" select="@data-bot-gap"/>
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="$StyleName = 'DIA-B' and not(@data-bot-gap='')">
                    <xsl:attribute name="data-bottom-gap" select="@data-bot-gap"/>
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="$StyleName = 'EXT-B' and not(@data-bot-gap='')">
                    <xsl:attribute name="data-bottom-gap" select="@data-bot-gap"/>
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="$StyleName = 'QUOTE-T' or $StyleName = 'EXT-T' or $StyleName = 'DIA-T'">
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="@data-move-aff">
                    <xsl:attribute name="data-move-aff" select="@data-move-aff"/>
                </xsl:if>
               <xsl:if test="starts-with($StyleName, 'jrnlRef')">
                    <xsl:attribute name="data-word-spacing" select="@data-word-spacing"/>
                    <xsl:attribute name="id" select="@id"/>                
                    <xsl:attribute name="linkAttrib"><xsl:text>jrnlRefText</xsl:text></xsl:attribute>
                    <xsl:attribute name="pstyle" select="$className"/>
                    <xsl:if test="@data-balance-frame">
                        <xsl:attribute name="data-balance-frame" select="@data-balance-frame"/>
                    </xsl:if>
               </xsl:if>
                <xsl:if test="$StyleName = 'jrnlArtTitle'">
                    <xsl:attribute name="jrnlTitle" select="@jrnlTitle"/>
                    <xsl:attribute name="RRH" select="./following-sibling::p[@class='jrnlRRH']"/>
                    <xsl:attribute name="VRH" select="./following-sibling::p[@class='jrnlLRH']"/>
                    <xsl:attribute name="iss_mon" select="following-sibling::div[@class='jrnlStubBlock']/p[@class='jrnlPubDate']/span[@class='jrnlMonth']"/>
                    <xsl:attribute name="iss_year" select="following-sibling::div[@class='jrnlStubBlock']/p[@class='jrnlPubDate']/span[@class='jrnlYear']"/>
                    <xsl:attribute name="vol_num" select="following-sibling::div[@class='jrnlStubBlock']//span[@class='jrnlVolume']"/>
                    <xsl:attribute name="iss_num" select="following-sibling::div[@class='jrnlStubBlock']//span[@class='jrnlIssue']"/>
                    <xsl:attribute name="START_PAGE" select="following-sibling::div[@class='jrnlMetaInfo']//span[@class='jrnlFPage']"/>
                    <xsl:attribute name="jrnl_Abbr" select="following-sibling::div[@class='jrnlMetaInfo']//span[@class='jrnlAbbrTitle']"/>
                </xsl:if>
             <xsl:apply-templates/>        
            </xsl:element>        
        </xsl:when>        
        <xsl:otherwise>
           <xsl:element name="{$nodeName}">
             <xsl:choose>
               <xsl:when test="$className = 'jrnlAbsPara'">
                    <xsl:attribute name="aid:pstyle" select="$className"/>
                    <xsl:attribute name="pstyle" select="$className"/>
               </xsl:when>
                <xsl:when test="$className = 'jrnlArtTitle' and (ancestor::jrnlIntroPage or ancestor::jrnlTOCPage)">
                    <xsl:attribute name="aid:pstyle" select="concat('Intro_', $className)"/>
                    <xsl:attribute name="pstyle" select="concat('Intro_', $className)"/>
                    <xsl:attribute name="data-word-spacing" select="@data-word-spacing"/>                    
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>                    
                </xsl:when>
               <xsl:when test="$StyleName = 'jrnlFigCaption'">
                    <figCaption>
                        <xsl:attribute name="aid:pstyle">
                            <xsl:text>jrnlFigCaption</xsl:text>
                        </xsl:attribute>	     
                        <xsl:attribute name="pstyle">
                            <xsl:text>jrnlFigCaption</xsl:text>
                        </xsl:attribute>	     
                    </figCaption>
                    <xsl:if test="ancestor::div[@data-inline='true'] or following-sibling::p[@class='jrnlFigFoot'] or following-sibling::img">
                        <xsl:call-template name="Entermark" /> 
                    </xsl:if>
               </xsl:when>       
                <xsl:otherwise>
                    <xsl:attribute name="data-word-spacing" select="@data-word-spacing"/>
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="START_PAGE" select="//*/@data-article-page-number"/>
                    <xsl:attribute name="aid:pstyle" select="$className"/>
                    <xsl:attribute name="pstyle" select="$className"/>
                </xsl:otherwise>                            
             </xsl:choose>   
             <xsl:apply-templates/>        
            </xsl:element>        
        </xsl:otherwise>
   </xsl:choose>
    <xsl:choose>
        <xsl:when test="$className = 'jrnlTblFoot'">
            <xsl:if test="following-sibling::*">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlTblBody'">
            <xsl:if test="following-sibling::*">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlTblBodyBold'">
            <xsl:if test="following-sibling::*">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlSecPara' and ancestor::table">
            <xsl:if test="following-sibling::*">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlBoxText' and parent::jrnlBoxBlock">
            <xsl:if test="following-sibling::*">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlTblFoot'">
            <xsl:if test="ancestor::body or ancestor::back">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
        </xsl:when>
        <xsl:when test="$className = 'jrnlBlockQuote' and count(./following-sibling::*)=0 and ancestor::table">
        </xsl:when>
        <xsl:when test="$className = 'jrnlRefText' and count(./following-sibling::*)=0">
        </xsl:when>
        <xsl:when test="$className = 'jrnlRefText' and ./following-sibling::*[1]/@class='jrnlAppBlock'">
        </xsl:when>
        <xsl:when test="$className = 'jrnlRefText' and following-sibling::*[1]/@class='jrnlFootNoteFN'">
        </xsl:when>
        <xsl:when test="$className = 'jrnlFootNotePara' and count(./following-sibling::*)=0">
        </xsl:when>
        <xsl:when test="./parent::div[@class='jrnlSTRH']">
        </xsl:when>
        <xsl:when test="count(./following-sibling::*)=0 and ancestor::div[@class='front'] and count(ancestor::div[@class='front']/following-sibling::*) = 0 and count(parent::div/following-sibling::*) = 0">
        </xsl:when>
        <xsl:when test="count(./following-sibling::*)=0 and ancestor::div[@class='body'] and count(ancestor::div[@class='body']/following-sibling::*) = 0">
        </xsl:when>
        <xsl:when test="count(./following-sibling::*)=0 and ancestor::div[@class='body'] and count(ancestor::div[@class='body']/following-sibling::div[@class='back']/child::*) = 0">
        </xsl:when>
        <xsl:when test="count(./following-sibling::*)=0 and ancestor::div[@class='back'] and count(parent::div/following-sibling::*) = 0">
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="Entermark" /> 
        </xsl:otherwise>
    </xsl:choose>
</xsl:if>
</xsl:template>
<xsl:template match="//p[@class='jrnlJT']" >
<div>
    <p>
        <xsl:attribute name="pstyle" select="@class"/>
        <xsl:attribute name="aid:pstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
        <xsl:call-template name="Entermark" /> 
    </p>
</div>
</xsl:template> 
<xsl:template match="//p[@class='jrnlJVH']" >
<div>
    <p>
        <xsl:attribute name="pstyle" select="@class"/>
        <xsl:attribute name="aid:pstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
        <xsl:call-template name="Entermark" /> 
    </p>
</div>
</xsl:template> 
<xsl:template match="//p[@class='jrnlARH']" >
    <xsl:choose>
        <xsl:when test="parent::div[@class='jrnlSTRH']">
            <p>
                <xsl:attribute name="pstyle" select="@class"/>
                <xsl:attribute name="aid:pstyle" select="@class"/>
                <xsl:apply-templates  select="@* | node()"/>
                <xsl:call-template name="Entermark" /> 
            </p>
        </xsl:when>
        <xsl:otherwise>
            <div>
                <p>
                    <xsl:attribute name="pstyle" select="@class"/>
                    <xsl:attribute name="aid:pstyle" select="@class"/>
                    <xsl:apply-templates  select="@* | node()"/>
                    <xsl:call-template name="Entermark" /> 
                </p>
            </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template> 
<xsl:template match="//p[@class='jrnlSTRH']" >
<div>
    <p>
        <xsl:attribute name="pstyle" select="@class"/>
        <xsl:attribute name="aid:pstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
        <xsl:call-template name="Entermark" /> 
    </p>
</div>
</xsl:template> 
<xsl:template match="//p[@class='jrnlRRH']" >
    <xsl:choose>
        <xsl:when test="parent::div[@class='jrnlSTRH']">
            <p>
                <xsl:attribute name="pstyle" select="@class"/>
                <xsl:attribute name="aid:pstyle" select="@class"/>
                <xsl:apply-templates  select="@* | node()"/>
                <xsl:call-template name="Entermark" /> 
            </p>
        </xsl:when>
        <xsl:otherwise>
            <div>
                <p>
                    <xsl:attribute name="pstyle" select="@class"/>
                    <xsl:attribute name="aid:pstyle" select="@class"/>
                    <xsl:apply-templates  select="@* | node()"/>
                    <xsl:call-template name="Entermark" /> 
                </p>
            </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template> 
<xsl:template match="//p[@class='jrnlLRH']" >
    <xsl:choose>
        <xsl:when test="parent::div[@class='jrnlSTLH']">
            <p>
                <xsl:attribute name="pstyle" select="@class"/>
                <xsl:attribute name="aid:pstyle" select="@class"/>
                <xsl:apply-templates  select="@* | node()"/>
                <xsl:call-template name="Entermark" /> 
            </p>
        </xsl:when>
        <xsl:otherwise>
            <div>
                <p>
                    <xsl:attribute name="pstyle" select="@class"/>
                    <xsl:attribute name="aid:pstyle" select="@class"/>
                    <xsl:apply-templates  select="@* | node()"/>
                    <xsl:call-template name="Entermark" /> 
                </p>
            </div>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template> 
<xsl:template match="//p[@class='jrnlCRRH']" >
<div>
    <p>
        <xsl:attribute name="pstyle" select="@class"/>
        <xsl:attribute name="aid:pstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
        <xsl:call-template name="Entermark" /> 
    </p>
</div>
</xsl:template> 
<xsl:template match="//p[@class='jrnlCLRH']" >
<div>
    <p>
        <xsl:attribute name="pstyle" select="@class"/>
        <xsl:attribute name="aid:pstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
        <xsl:call-template name="Entermark" /> 
    </p>
</div>
</xsl:template> 
<!--'p' in list item-->
<xsl:template match = "//li/p">
    <xsl:choose>   
         <xsl:when test="not(preceding-sibling::p) and not(following-sibling::p)">
          <xsl:apply-templates/>        
         </xsl:when>
         <xsl:when test="position() = 1">
            <xsl:apply-templates/>        
         </xsl:when>
        <xsl:otherwise>
            <xsl:variable name="subLevelPTag">
                   <xsl:choose>
                        <xsl:when test="count(ancestor::ul)=1">
                            <xsl:text>UL_listPara</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ul)=2">
                            <xsl:text>UL_listPara_2</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ul)=3">
                            <xsl:text>UL_listPara_3</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ul)=4">
                            <xsl:text>UL_listPara_5</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ol)=1">
                            <xsl:text>OL_listPara</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ol)=2">
                            <xsl:text>OL_listPara_2</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ol)=3">
                            <xsl:text>OL_listPara_3</xsl:text>
                        </xsl:when>
                        <xsl:when test="count(ancestor::ol)=4">
                            <xsl:text>OL_listPara_5</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>listPara_5+</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
          </xsl:variable>           
            <xsl:call-template name="Entermark" /> 
            <p>
                    <xsl:attribute name="data-word-spacing" select="@data-word-spacing"/>
                  <xsl:attribute name="aid:pstyle">
                        <xsl:value-of select="$subLevelPTag"/>
                  </xsl:attribute>  
                  <xsl:attribute name="pstyle">
                        <xsl:value-of select="$subLevelPTag"/>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
            </p>         
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<!--soft line break-->
<xsl:template match = "//br">
      <xsl:text>&#x2028;</xsl:text>
</xsl:template>
<!---->
<xsl:template match = "//uri">
    <a>
          <xsl:attribute name="href" select="@xlink:href"/>  
          <xsl:apply-templates/>
    </a>
</xsl:template>
<xsl:template match = "//diffmod">
          <xsl:apply-templates/>        
</xsl:template>
<xsl:template match = "//span[@class='jrnlAuthor']">
    <xsl:choose>
        <xsl:when test = "ancestor::p[@class='jrnlAuthors'] or ancestor::p[@class='jrnlAuthor']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlAuthorAuthorGroup</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test = "ancestor::p[@class='jrnlStubToCite']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlAuthorStubToCite</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:otherwise>
                  <xsl:apply-templates/>        
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match = "//span[@class='LETTER_jrnlCorrAffHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlDegrees']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubToCite_jrnlAbbrTitle']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubToCite_jrnleLocation']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlExtLink']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubToCite_jrnlVolume']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubToCite_jrnlTitle']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubMeta_jrnleLocation']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubMeta_jrnlVolume']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='stubMeta_jrnlTitle']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnleLocation']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlKeywordHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlDOI']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlCorrEmail']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlNoteHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlYearGroup']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlMonospace']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlCambria_Regular']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlArial_Unicode_MS_Regular']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlSymbol_Medium']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlSymbol_Bold']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFontCambria_Regular']">
   <span>
         <xsl:attribute name="aid:cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
         <xsl:attribute name="cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
       <xsl:apply-templates/>
   </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFontMSMincho_Regular']">
   <span>
         <xsl:attribute name="aid:cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
         <xsl:attribute name="cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
       <xsl:apply-templates/>
   </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFontGothic_Regular']">
   <span>
         <xsl:attribute name="aid:cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
         <xsl:attribute name="cstyle">
               <xsl:value-of select="@class"/>
         </xsl:attribute>  
       <xsl:apply-templates/>
   </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFontITC_Zapf_Dingbats_Medium']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlITC_Zapf_Dingbats_Medium']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlDisclaimerHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlPatientHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlRole']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlCorrNoticeHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlSocialHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlAuthorNoteHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlCorrAffHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlEthicsHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlPresentationHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlCollabHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlConHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlPeerReviewHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlDataSharingHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlAbsTitle']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFundHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlAckHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlFNHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlConfHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlLicenseHead']">
    <span>
          <xsl:attribute name="aid:cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
          <xsl:attribute name="cstyle">
                <xsl:value-of select="@class"/>
          </xsl:attribute>  
        <xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlAbbrTitle']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlVolume']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:if test="(ancestor::p[@class='jrnlRRH'] or ancestor::p[@class='jrnlLRH'] or ancestor::p[@class='jrnlCRRH'] or ancestor::p[@class='jrnlCLRH']) and ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:text>RH_</xsl:text>
            </xsl:if>
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:if test="ancestor::div[@class='WordSection1']//div[@class='front']/@prefix">
                    <xsl:value-of select="./ancestor::div[@class='WordSection1']//div[@class='front']/@prefix"/><xsl:text>_</xsl:text>
            </xsl:if>
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlEtal']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlTitle']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlConfFNHead']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<xsl:template match = "//span[@class='jrnlHandlingEditorHead']">
    <span>
      <xsl:attribute name="aid:cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
      <xsl:attribute name="cstyle">
            <xsl:value-of select="@class"/>
      </xsl:attribute>  
	<xsl:apply-templates/>
    </span>
</xsl:template>
<!---->
<!--bold nested with bold-->
<xsl:template match = "//b|//strong">
    <xsl:choose>
        <xsl:when test="parent::*[@data-spl-style]">
            <span>
                  <xsl:attribute name="aid:cstyle">
                    <xsl:value-of select="./parent::*[@data-spl-style]/@data-spl-style"/>
                      <xsl:text>Bold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlHandlingEdFN']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHandlingEdFNBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlFigFoot']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlFigFootBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::li//ancestor::div[@class='jrnlBoxBlock']">
            <jrnlBoxListBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxListBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxListBold>     
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlBoxText']">
            <jrnlBoxTextBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxTextBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxTextBold>     
        </xsl:when>
        <xsl:when test="parent::li//ancestor::div[@class='jrnlBoxBlock']">
            <jrnlAbsParaBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxTextBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlAbsParaBold>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlBoxText']">
            <jrnlAbsParaBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxTextBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlAbsParaBold>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlAbsPara']">
            <jrnlAbsParaBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlAbsParaBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlAbsParaBold>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlFigCaption']">
            <jrnlFigCaption>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlFigCaptionBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlFigCaption>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblCaption']">
            <jrnlTblCaptionBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblCaptionBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblCaptionBold>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblBody']">
            <jrnlTblBodyBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblBodyBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblBodyBold>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlBoxCaption']">
            <jrnlBoxCaptionBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxCaptionBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxCaptionBold>     
        </xsl:when>
        <xsl:when test="ancestor::ul or ancestor::ol">
            <span>
                <xsl:choose>
                    <xsl:when test="child::em">
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListBoldItalic</xsl:text>
                          </xsl:attribute>                      
                    </xsl:when>
                    <xsl:when test="parent::em">
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListBoldItalic</xsl:text>
                          </xsl:attribute>                      
                    </xsl:when>
                    <xsl:otherwise>
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListBold</xsl:text>
                          </xsl:attribute>                      
                    </xsl:otherwise>
                </xsl:choose>
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblHead']">
            <jrnlTblHeadBold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblHeadBold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblHeadBold>     
        </xsl:when>
        <xsl:when test = "ancestor::h1[@class='jrnlHead1']">
            <jrnlHead1Bold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead1Bold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead1Bold>     
        </xsl:when>
        <xsl:when test = "ancestor::h2[@class='jrnlHead2']">
            <jrnlHead2Bold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead2Bold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead2Bold>     
        </xsl:when>
        <xsl:when test = "ancestor::h3[@class='jrnlHead3']">
            <jrnlHead3Bold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead3Bold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead3Bold>     
        </xsl:when>
        <xsl:when test = "ancestor::h4[@class='jrnlHead4']">
            <jrnlHead4Bold>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead4Bold</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead4Bold>     
        </xsl:when>
        <xsl:otherwise>
            <bold>
                  <xsl:apply-templates/>        
             </bold>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match = "//b//b|//strong//strong|//strong//b|//b//strong|//sub//sub|//sup//sup|//sc//sc|//u//u">
          <xsl:apply-templates/>        
</xsl:template>
<!--italic nested with italic-->
<xsl:template match = "//em">
    <xsl:choose>
        <xsl:when test="./parent::span[@class='jrnlArtTitle']/parent::p[@class='stubJrnlArtTitle']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>stubJrnlArtTitleItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="./parent::span[@class='jrnlOrgRefPara']">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlOrgRefFNItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="parent::*[@data-spl-style]">
            <span>
                  <xsl:attribute name="aid:cstyle">
                    <xsl:value-of select="./parent::*[@data-spl-style]/@data-spl-style"/>
                      <xsl:text>Italic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlEqualContribFN']">
            <jrnlEqualContribFNItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlEqualContribFNItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlEqualContribFNItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@data-spl-style='jrnlBl-Para']">
            <jrnlFigFootItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBl-ParaItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlFigFootItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlFigFoot']">
            <jrnlFigFootItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlFigFootItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlFigFootItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblFoot']">
            <jrnlTblFootItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblFootItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblFootItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlConfFN']">
            <jrnlConfFNItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlConfFNItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlConfFNItalic>     
        </xsl:when>
        <xsl:when test="ancestor::span[@class='RefJournalTitle']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>RefJournalTitleItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="ancestor::span[@class='RefJournalTitle']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>RefJournalTitleItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::span[@class='RefComments']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>RefCommentsItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::span[@class='jrnlBibRef'] and ancestor::p[@class='jrnlTblBody']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblBibRefItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::span[@class='jrnlBibRef']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBibRefItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@data-spl-style='JrnlScanPara']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>JrnlScanParaItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlAckGroup']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlAckGroupItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlSecParaSPL']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlSecParaSPLItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::span[@class='jrnlArtTitle']/parent::p[@class='jrnlStubToCite']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlStubToCiteItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::li//ancestor::div[@class='jrnlBoxBlock']">
            <jrnlBoxListItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxListItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxListItalic>     
        </xsl:when>
        <xsl:when test="ancestor::div[@class='jrnlBoxBlock']">
            <jrnlBoxTextItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxTextItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxTextItalic>     
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlBoxText']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxTextItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlArtTitle']">
            <jrnlArtTitleItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlArtTitleItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlArtTitleItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlKwdGroup']">
            <jrnlBoxBlockListItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlKwdGroupItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxBlockListItalic>     
        </xsl:when>
        <xsl:when test="ancestor::div[@class='jrnlBoxBlock'] and ancestor::li">
            <span>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxBlockListItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::ul or ancestor::ol">
            <span>
                <xsl:choose>
                    <xsl:when test="child::strong">
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListBoldItalic</xsl:text>
                          </xsl:attribute>                      
                    </xsl:when>
                    <xsl:when test="parent::strong">
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListBoldItalic</xsl:text>
                          </xsl:attribute>                      
                    </xsl:when>
                    <xsl:otherwise>
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>jrnlListItalic</xsl:text>
                          </xsl:attribute>                      
                    </xsl:otherwise>
                </xsl:choose>
                  <xsl:apply-templates/>        
             </span>     
        </xsl:when>
        <xsl:when test="ancestor::span[@class='RefArticleTitle']">
            <jrnlAbsParaItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>RefArticleTitleItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlAbsParaItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlAbsPara']">
            <jrnlAbsParaItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlAbsParaItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlAbsParaItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlFigCaption']">
            <jrnlFigCaptionItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlFigCaptionItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlFigCaptionItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblCaption']">
            <jrnlTblCaptionItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblCaptionItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblCaptionItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlBoxCaption']">
            <jrnlBoxCaptionItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlBoxCaptionItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlBoxCaptionItalic>     
        </xsl:when>
        <xsl:when test="ancestor::thead">
            <jrnlTblBodyItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblBodyBoldItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblBodyItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblBody']">
            <jrnlTblBodyItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblBodyItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblBodyItalic>     
        </xsl:when>
        <xsl:when test="ancestor::p[@class='jrnlTblHead']">
            <jrnlTblHeadItalic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlTblHeadItalic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlTblHeadItalic>     
        </xsl:when>
<!--italic inside head levels-->
        <xsl:when test = "ancestor::h1[@class='jrnlHead1']">
            <jrnlHead1Italic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead1Italic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead1Italic>     
        </xsl:when>
        <xsl:when test = "ancestor::h2[@class='jrnlHead2']">
            <jrnlHead2Italic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead2Italic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead2Italic>     
        </xsl:when>
        <xsl:when test = "ancestor::h3[@class='jrnlHead3']">
            <jrnlHead3Italic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead3Italic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead3Italic>     
        </xsl:when>
        <xsl:when test = "ancestor::h4[@class='jrnlHead4']">
            <jrnlHead4Italic>
                  <xsl:attribute name="aid:cstyle">
                      <xsl:text>jrnlHead4Italic</xsl:text>
                  </xsl:attribute>  
                  <xsl:apply-templates/>        
             </jrnlHead4Italic>     
        </xsl:when>
        <xsl:otherwise>
            <italic>
                  <xsl:apply-templates/>        
             </italic>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match = "//em//em">
          <xsl:apply-templates/>        
</xsl:template>
<!---->
<!--bold inside head levels-->
<xsl:template match = "//h1[@class='jrnlRefHead']/strong">
    <jrnlRefHeadBold>
          <xsl:attribute name="aid:cstyle">
              <xsl:text>jrnlRefHeadBold</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>        
     </jrnlRefHeadBold>     
</xsl:template>
<xsl:template match = "//h1[@class='jrnlHead1']/strong">
    <jrnlHead1Bold>
          <xsl:attribute name="aid:cstyle">
              <xsl:text>jrnlHead1Bold</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>        
     </jrnlHead1Bold>     
</xsl:template>
<xsl:template match = "//h2[@class='jrnlHead2']/strong">
    <jrnlHead2Bold>
          <xsl:attribute name="aid:cstyle">
              <xsl:text>jrnlHead2Bold</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>        
     </jrnlHead2Bold>     
</xsl:template>
<xsl:template match = "//h3[@class='jrnlHead3']/strong">
    <jrnlHead3Bold>
          <xsl:attribute name="aid:cstyle">
              <xsl:text>jrnlHead3Bold</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>        
     </jrnlHead3Bold>     
</xsl:template>
<xsl:template match = "//h4[@class='jrnlHead4']/strong">
    <jrnlHead4Bold>
          <xsl:attribute name="aid:cstyle">
              <xsl:text>jrnlHead4Bold</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>        
     </jrnlHead4Bold>     
</xsl:template>
<!---->
<xsl:template match="//span[@class='jrnlBibRef']">
        <jrnlBibRef aid:cstyle="jrnlBibRef">
        <xsl:choose>
            <xsl:when test="ancestor::p[@class='jrnlBoxCaption']">
                <xsl:attribute name="aid:cstyle">
                    <xsl:if test="@data-no-sup">
                            <xsl:text>NO_SUP_</xsl:text>
                    </xsl:if>
                    <xsl:text>jrnlBibRefBoxCaption</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="ancestor::p[@class='jrnlFigCaption']">
                <xsl:attribute name="aid:cstyle">
                    <xsl:if test="@data-no-sup">
                            <xsl:text>NO_SUP_</xsl:text>
                    </xsl:if>
                    <xsl:text>jrnlBibRefFigCaption</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:when test="ancestor::p[@class='jrnlTblCaption']">
                <xsl:attribute name="aid:cstyle">
                    <xsl:if test="@data-no-sup">
                            <xsl:text>NO_SUP_</xsl:text>
                    </xsl:if>
                    <xsl:text>jrnlBibRefTblCaption</xsl:text>
                </xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="aid:cstyle">
                    <xsl:if test="@data-no-sup">
                            <xsl:text>NO_SUP_</xsl:text>
                    </xsl:if>
                    <xsl:value-of select="@class"/>
                </xsl:attribute>
            </xsl:otherwise>
        </xsl:choose>
          <xsl:attribute name="data-citation-string" select="@data-citation-string"/>
          <xsl:attribute name="cstyle" select="@class"/>
            <xsl:apply-templates/>
        </jrnlBibRef>
</xsl:template> 
<xsl:template match="//span[@class='jrnlVidRef']">
    <span>
        <xsl:attribute name="aid:cstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
    </span>
</xsl:template> 
<xsl:template match="//span[@class='jrnlFigRef']">
    <span>
        <xsl:attribute name="aid:cstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
    </span>
</xsl:template> 
<xsl:template match="//span[@class='jrnlTblRef']">
    <span>
        <xsl:attribute name="aid:cstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
    </span>
</xsl:template> 
<xsl:template match="//span[@class='jrnlBoxRef']">
    <span>
        <xsl:attribute name="aid:cstyle" select="@class"/>
        <xsl:apply-templates  select="@* | node()"/>
    </span>
</xsl:template> 
<xsl:template match="//span[@class='txtCiteHead']">
        <span aid:cstyle="txtCiteHead">
          <xsl:attribute name="aid:cstyle" select="@class"/>
          <xsl:attribute name="cstyle" select="@class"/>
            <xsl:apply-templates/>
        </span>
</xsl:template> 
<!--character style for 'jrnlAffRef'-->
<xsl:template match = "//sup[@class='jrnlAffRef']">
    <jrnlAffRef aid:cstyle="jrnlAffRef">
          <xsl:apply-templates/>
    </jrnlAffRef>  
</xsl:template>
<xsl:template match = "//p[@class='jrnlTblBody']//em//sup|//p[@class='jrnlTblBody']//sup//em">
    <span aid:cstyle="jrnlTblBodyItalicSup">
          <xsl:attribute name="cstyle">
              <xsl:text>jrnlTblBodyItalicSup</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>
    </span>  
</xsl:template>
<xsl:template match = "//p[@class='jrnlTblFoot']//em//sup|//p[@class='jrnlTblFoot']//sup//em">
    <span aid:cstyle="jrnlTblFootItalicSup">
          <xsl:attribute name="cstyle">
              <xsl:text>jrnlTblFootItalicSup</xsl:text>
          </xsl:attribute>  
          <xsl:apply-templates/>
    </span>  
</xsl:template>
<!---->

<!--underline tag changed to uline-->
<xsl:template match = "//u">
    <uline>
          <xsl:apply-templates/>        
     </uline> 
</xsl:template>
<!---->
<!--force align-->
<xsl:template match = "//span[@class='forceJustify']">
    <forceJustify>
              <xsl:text>&#x2028;</xsl:text>
     </forceJustify>     
</xsl:template>
<!---->
<!--Reference character styles-->
<xsl:template match = "node()[starts-with(@class, 'Ref')]">
   <xsl:variable name="className">
      <xsl:value-of select="@class"/>   
   </xsl:variable>
   <xsl:variable name="nodeName">
        <xsl:value-of select ="name(.)"/>
   </xsl:variable>
   <xsl:choose>
        <xsl:when test="$className = 'RefSlNo'">
           <xsl:element name="{$nodeName}">
              <xsl:attribute name="aid:cstyle">
                    <xsl:value-of select="@class"/>
              </xsl:attribute>  
              <xsl:attribute name="cstyle">
                    <xsl:value-of select="@class"/>
              </xsl:attribute>  
            <xsl:text>&#x0009;</xsl:text><xsl:apply-templates/><xsl:text>&#x0009;</xsl:text>
           </xsl:element>
        </xsl:when>
        <xsl:when test="not($className = 'RefVolume')">
           <xsl:element name="{$nodeName}">
                  <xsl:attribute name="aid:cstyle" select="$className"/>
                  <xsl:apply-templates/>        
           </xsl:element>
        </xsl:when>
        <xsl:otherwise>
            <xsl:choose>
                <xsl:when test="preceding-sibling::RefJournalTitle">
                    <RefVolume_Jrnl>
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>RefVolume_Jrnl</xsl:text>
                          </xsl:attribute>  
                          <xsl:apply-templates/>        
                     </RefVolume_Jrnl>     
                </xsl:when>
                <xsl:otherwise>
                    <RefVolume_Book>
                          <xsl:attribute name="aid:cstyle">
                              <xsl:text>RefVolume_Book</xsl:text>
                          </xsl:attribute>  
                          <xsl:apply-templates/>        
                     </RefVolume_Book>     
                </xsl:otherwise>
            </xsl:choose>
        </xsl:otherwise>
   </xsl:choose>   
 </xsl:template>
<!--Processing Figures-->
<xsl:template match="//img">
    <xsl:choose>
        <xsl:when test="./@class='jrnlFigure' and ancestor::div[@class='jrnlVidBlock']" /><!--commenting video image info-->
        <xsl:when test="./@class='jrnlVideoFile' and ancestor::div[@class='jrnlVidBlock']">
            <fig>
                <xsl:attribute name="aid:pstyle">
                    <xsl:text>FIG</xsl:text>
                </xsl:attribute>	     
                <xsl:attribute name="pstyle">
                    <xsl:text>FIG</xsl:text>
                </xsl:attribute>	     
            <figure>
                <xsl:attribute name="width" select="@data-width"/>
                <xsl:attribute name="height" select="@data-height"/>
                <xsl:attribute name="poster-path" select="replace(preceding-sibling::img[@class='jrnlFigure']/@data-vid-img-src, '(\{\.\})(.*)$', '$2')"/>
                <xsl:attribute name="href">
                <xsl:variable name="figurePath" select="replace(@data-vid-src, '(\{\.\})(.*)$', '$2')"/>
                <xsl:value-of select="$figurePath"/>
        <!--			<xsl:value-of select="concat('../graphics/', @alt)"/>-->
                </xsl:attribute>
                <xsl:apply-templates/>
            </figure>	
            <xsl:if test="ancestor::floatblock[@data-inline='true'] or following-sibling::p[@class='jrnlFigFoot'] or following-sibling::p[@class='jrnlVidCaption']">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
            <xsl:if test="not(following-sibling::p)">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
            </fig>
        </xsl:when>
        <xsl:when test="./ancestor::div[@class='jrnlFigBlock']">
            <fig>
                <xsl:attribute name="aid:pstyle">
                    <xsl:text>FIG</xsl:text>
                </xsl:attribute>	     
                <xsl:attribute name="pstyle">
                    <xsl:text>FIG</xsl:text>
                </xsl:attribute>	     
            <figure>
                <xsl:attribute name="width" select="@data-width"/>
                <xsl:attribute name="height" select="@data-height"/>
                <xsl:attribute name="href">
                <xsl:variable name="figurePath" select="replace(@src, '(\{\.\})(.*)$', '$2')"/>
                <xsl:value-of select="$figurePath"/>
        <!--			<xsl:value-of select="concat('../graphics/', @alt)"/>-->
                </xsl:attribute>
                <xsl:apply-templates/>
            </figure>	
            <xsl:if test="ancestor::floatblock[@data-inline='true'] or following-sibling::p[@class='jrnlFigFoot'] or following-sibling::p[@class='jrnlFigCaption']">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
            <xsl:if test="not(following-sibling::p)">
                <xsl:call-template name="Entermark" /> 
            </xsl:if>
            </fig>
        </xsl:when>
        <xsl:when test="ancestor::div[@class='back']">
            <pFig>
                <xsl:attribute name="pstyle"  select="concat('FIG_INLINE_CENTER',@class)" />
                <xsl:attribute name="aid:pstyle" select="concat('FIG_INLINE_CENTER',@class)" />
            <figure>
                <xsl:attribute name="width" select="@data-width"/>
                <xsl:attribute name="height" select="@data-height"/>
                <xsl:attribute name="aid:pstyle" select="concat('FIG_INLINE_CENTER',@class)" />
                <xsl:attribute name="pstyle">
                    <xsl:text>FIG_INLINE_CENTER</xsl:text>
                </xsl:attribute>	     
                <xsl:attribute name="href">
                <xsl:variable name="figurePath" select="replace(@src, '(\{\.\})(.*)$', '$2')"/>
                <xsl:value-of select="$figurePath"/>
                </xsl:attribute>
                <xsl:apply-templates/>
            </figure>
            <xsl:choose>
                <xsl:when test="count(./following-sibling::*)=0 and ancestor::div[@class='back'] and count(parent::div/following-sibling::*) = 0">
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="Entermark" /> 	
                </xsl:otherwise>
            </xsl:choose>
            </pFig>
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlEqnPara']">
            <xsl:text>&#0009;</xsl:text>
            <matchEqn>
                <xsl:choose>
                    <xsl:when test="not(@data-eq-depth = 0)">
                        <xsl:attribute name="cstyle"  select="concat('jrnlMathBaselineShift_',@data-eq-depth)" />
                        <xsl:attribute name="aid:cstyle" select="concat('jrnlMathBaselineShift_',@data-eq-depth)"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="cstyle"><xsl:text>jrnlMathBaselineShift</xsl:text></xsl:attribute>
                        <xsl:attribute name="aid:cstyle"><xsl:text>jrnlMathBaselineShift</xsl:text></xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
                <inline-equation>
                    <xsl:attribute name="cstyle"  select="@class" />
                    <xsl:attribute name="data-eq-height" select="@data-eq-height"/>
                    <xsl:attribute name="data-eq-totalheight" select="@data-eq-totalheight"/>
                    <xsl:attribute name="href">
                    <xsl:variable name="figurePath" select="replace(@src, '(\{\.\})(.*)$', '$2')"/>
                        <xsl:value-of select="$figurePath"/>
                    </xsl:attribute>
                </inline-equation>
            </matchEqn>
                <xsl:text>&#0009;</xsl:text>
        </xsl:when>
        <xsl:when test="parent::p[@class='jrnlSecPara'] or ancestor::p[@class='jrnlTblFoot'] or ancestor::p[@class='jrnlTblBody'] or parent::p[@class='jrnlListPara']">
            <matchEqn>
                <xsl:choose>
                    <xsl:when test="not(@data-eq-depth = 0)">
                        <xsl:attribute name="cstyle"  select="concat('jrnlMathBaselineShift_',@data-eq-depth)" />
                        <xsl:attribute name="aid:cstyle" select="concat('jrnlMathBaselineShift_',@data-eq-depth)"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="cstyle"><xsl:text>jrnlMathBaselineShift</xsl:text></xsl:attribute>
                        <xsl:attribute name="aid:cstyle"><xsl:text>jrnlMathBaselineShift</xsl:text></xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
                <inline-equation>
                    <xsl:attribute name="cstyle"  select="@class" />
                    <xsl:attribute name="data-eq-height" select="@data-eq-height"/>
                    <xsl:attribute name="data-eq-totalheight" select="@data-eq-totalheight"/>
                    <xsl:attribute name="href">
                    <xsl:variable name="figurePath" select="replace(@src, '(\{\.\})(.*)$', '$2')"/>
                        <xsl:value-of select="$figurePath"/>
                    </xsl:attribute>
                </inline-equation>
            </matchEqn>
        </xsl:when>
        <xsl:otherwise>
            <pFig>
                    <xsl:attribute name="class" select="@class" />
                <figure>
                    <xsl:attribute name="aid:pstyle">
                        <xsl:text>FIG_INLINE</xsl:text>
                    </xsl:attribute>	     
                    <xsl:attribute name="pstyle">
                        <xsl:text>FIG_INLINE</xsl:text>
                    </xsl:attribute>	     
                    <xsl:attribute name="class" select="@class" />
                    <xsl:attribute name="href">
                    <xsl:variable name="figurePath" select="replace(@src, '(\{\.\})(.*)$', '$2')"/>
                    <xsl:value-of select="$figurePath"/>
            <!--			<xsl:value-of select="concat('../graphics/', @alt)"/>-->
                    </xsl:attribute>
                    <xsl:apply-templates/>
                </figure>
            </pFig>            
            <xsl:choose>
                <xsl:when test="count(./following-sibling::*)=0 and (ancestor::td or ancestor::th)">
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="Entermark" /> 	
                </xsl:otherwise>
            </xsl:choose>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="//jrnlHead1/label">
     <label>
		<xsl:apply-templates/><xsl:text>&#x2003;</xsl:text>
     </label>
</xsl:template>
<xsl:template match="//jrnlHead2/label">
     <label>
		<xsl:apply-templates/><xsl:text>&#x0009;</xsl:text>
     </label>
</xsl:template>
<xsl:template match="//jrnlNoteText/label">
    <label>
		<xsl:apply-templates/><xsl:text>&#x0009;</xsl:text>
     </label>
</xsl:template>
<xsl:template match="//p[@class='jrnlVidCaption']/span[@class='label']">
     <label aid:cstyle="videoLabel">
		<xsl:apply-templates/>
     </label>
</xsl:template>
<xsl:template match="//p[@class='jrnlFigCaption']/span[@class='label']">
     <label aid:cstyle="figLabel">
		<xsl:apply-templates/>
     </label>
</xsl:template>
<xsl:template match="//p[@class='jrnlTblCaption']/span[@class='label']">
     <label aid:cstyle="tblLabel">
		<xsl:apply-templates/>
     </label>
</xsl:template>
<xsl:template match="//p[@class='jrnlBoxCaption']/span[@class='label']">
     <label aid:cstyle="boxLabel">
		<xsl:apply-templates/>
     </label>
</xsl:template>
<xsl:template match="//jrnlTblCaption">
    <p>
        <xsl:attribute name="aid:pstyle">
        <xsl:text>jrnlTblCaption</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="pstyle">
        <xsl:text>jrnlTblCaption</xsl:text>
        </xsl:attribute>
        <xsl:apply-templates/>
    <xsl:call-template name="Entermark" /> 
    </p>
</xsl:template>

<!--Character Styles-->
<xsl:template match="//query">
    <query><!--aid:cstyle="CommentChar"-->
        <xsl:attribute name="id" select="@rid"/>
        <xsl:apply-templates/>
     </query>   
</xsl:template>
<!--Processing HTML tables to Indesign tables starts-->      
<!--<xsl:template match="div[@id='queryDivNode']" /><nullifying query table-->
<xsl:template match="//table">
  <xsl:variable name="colspanCt">
      <xsl:if test="count(./tbody/tr[1]/td) = 1">
            <xsl:choose>
               <xsl:when test="./tbody/tr[1]/td[@colspan]">
         			<xsl:value-of select="./tbody/tr[1]/td/@colspan - 1"/>               
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>0</xsl:text>
               </xsl:otherwise>
   			</xsl:choose>
      </xsl:if>
      <xsl:if test="count(./tbody/tr[1]/td) &gt; 1">      
		<xsl:for-each select="./tbody/tr[1]">
			<xsl:value-of select="sum(./td/@colspan) - count(./td/@colspan)"/>
		</xsl:for-each>
		</xsl:if>
	</xsl:variable>
  
	<xsl:variable name="colsCt">
		<xsl:value-of select="count(./tbody/tr[1]/td) + $colspanCt"/>
	</xsl:variable>
	

	<xsl:variable name="rowsCt">
		<xsl:value-of select="count(./thead/tr) + count(./tbody/tr)"/>
	</xsl:variable>
	
	<xsl:variable name="styleValue">
	  <xsl:choose>
	     <xsl:when test="ancestor::div[@class='jrnlFootnote']">
   		<xsl:value-of select="concat('FN_',./@class)"/>	     
	     </xsl:when>
	     <xsl:when test="not(ancestor::div[@class='floatBlock'])">
   		<xsl:value-of select="@class"/>	     
	     </xsl:when>
           <xsl:when test="parent::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and parent::div[@class='jrnlTblBlock']/preceding-sibling::*[1]/@class='jrnlTblBlock' and not(preceding-sibling::p[@class='jrnlTblCaption'])">
                <xsl:text>jrnlTblBlock_STACK</xsl:text>
	     </xsl:when>
	     <xsl:otherwise>
   		<!--<xsl:value-of select="./@class"/>-->
   		<xsl:text>jrnlTblBlock</xsl:text>
	     </xsl:otherwise>
	  </xsl:choose>
	</xsl:variable>
    <xsl:choose>
        <xsl:when test="parent::div[@id='queryDivNode']">
           <p>
               <Table xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/" aid:table="table" aid:trows="{$rowsCt}" aid:tcols="{$colsCt}" aid5:tablestyle="{$styleValue}" class="{$styleValue}">
                        <xsl:apply-templates/>
               </Table>
            </p>  
        </xsl:when>
        <xsl:otherwise>
           <pFig>
               <xsl:choose>
                    <xsl:when test="not(parent::div[@class='jrnlTblBlock'])">
                        <xsl:attribute name="aid:pstyle">
                            <xsl:text>TBL_INLINE</xsl:text>
                        </xsl:attribute>	     
                        <xsl:attribute name="pstyle">
                            <xsl:text>TBL_INLINE</xsl:text>
                        </xsl:attribute>	     
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="aid:pstyle">
                            <xsl:text>FIGURE</xsl:text>
                        </xsl:attribute>	     
                        <xsl:attribute name="pstyle">
                            <xsl:text>FIGURE</xsl:text>
                        </xsl:attribute>	     
                    </xsl:otherwise>
               </xsl:choose>
            <Table xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/" aid:table="table" aid:trows="{$rowsCt}" aid:tcols="{$colsCt}" aid5:tablestyle="{$styleValue}" class="{$styleValue}"><!--aid5:tablestyle="{$styleValue}" class="{$styleValue}">-->
                    <xsl:attribute name="reduceTheadFontSize">
                        <xsl:value-of select="./thead/@data-font-size"/>
                    </xsl:attribute>	     
                    <xsl:attribute name="reduceTbodyFontSize">
                        <xsl:value-of select="./tbody/@data-font-size"/>
                    </xsl:attribute>	     
                    <xsl:apply-templates/>
               </Table>
                    <xsl:if test="parent::div[@class='jrnlTblBlock']">
                        <xsl:call-template name="Entermark" /> 
                    </xsl:if>
            </pFig>  
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>


<xsl:template match="col|colgroup|tr|tbody|thead">
		<xsl:apply-templates/>
</xsl:template>

<xsl:template match="td">
	<Cell aid:table="cell">
        <xsl:if test="@data-table-background-color">
            <xsl:attribute name="data-table-background-color" select="@data-table-background-color"/>
        </xsl:if>
        <xsl:if test="parent::tr/parent::thead">
            <xsl:attribute name="aid:theader" />
        </xsl:if>
	  <xsl:if test="@rowspan &gt; 1">
	     <xsl:attribute name="aid:crows" select="@rowspan"/>	  
	  </xsl:if>
	  <xsl:if test="not(@rowspan &gt; 1)">
	     <xsl:attribute name="aid:crows" select="count(.)"/>	  
	  </xsl:if>
	  <xsl:if test="@colspan &gt; 1">
	     <xsl:attribute name="aid:ccols" select="@colspan"/>	  
	  </xsl:if>
	  <xsl:if test="not(@colspan &gt; 1)">
	     <xsl:attribute name="aid:ccols" select="count(.)"/>	  
	  </xsl:if>
	  <xsl:if test="count(./preceding-sibling::td)>0 and (string(.) != '')">
   	  <xsl:choose>
   	     <xsl:when test="matches(., '^[A-Za-z0-9\p{L}\p{Lu}\p{Ll}]')">
   	        <!--<xsl:attribute name="glyph" select="0"/>-->
   	     </xsl:when>
   	     <xsl:otherwise>
               <xsl:attribute name="glyph" select="1"/>	     
   	     </xsl:otherwise>
   	  </xsl:choose>
	  </xsl:if>
<!--	  <xsl:attribute name="aid:ccolwidth">since we have changed to logic to pull cell width through table setter this attribute has been commented on 28-Jun-2016
	     <xsl:value-of select="@width" />
	  </xsl:attribute> 	  -->
	  <xsl:attribute name="aid:ccolwidth">
          <xsl:choose>
            <xsl:when test="count(ancestor::table//td/@data-cell-width-tablesetter)>0 or count(ancestor::table//td/@data-cell-width-tablesetter)>0">
                <xsl:value-of select="@data-cell-width-tablesetter" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="@width" />
            </xsl:otherwise>
          </xsl:choose>
	  </xsl:attribute> 	  
	  <xsl:attribute name="glyphWidth">
	     <xsl:value-of select="@glyphwidth" />
	  </xsl:attribute>
	  <xsl:attribute name="align">	  
	     <xsl:value-of select="@align"/>
	  </xsl:attribute> 	  	   	  
        <xsl:variable name="followingTRCount">
            <xsl:value-of select="count(parent::tr/following-sibling::tr)"/>               
        </xsl:variable>
        <xsl:variable name="cellFill">
            <xsl:choose>
                <xsl:when test="parent::tr/@data-fill='true'">
                    <xsl:text>_FILL</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="valignStyle">        
            <xsl:choose>
                <xsl:when test="./@valign='center'">
                    <xsl:text>_CTR</xsl:text>
                </xsl:when>
                <xsl:when test="./@valign='bottom'">
                    <xsl:text>_BTM</xsl:text>
                </xsl:when>
               <xsl:otherwise/>
            </xsl:choose>
        </xsl:variable>
      <xsl:choose>
      <xsl:when test="ancestor::thead">
            <xsl:attribute name="aid5:cellstyle" select="concat('TCH',$valignStyle,$cellFill)">
            </xsl:attribute>
        </xsl:when>
      <xsl:when test="parent::tr[@data-p-thead='true']">
            <xsl:attribute name="aid5:cellstyle" select="concat('TCH',$valignStyle,$cellFill)">
            </xsl:attribute>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and (@data-cell-border='no-border')">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBF_NB',$valignStyle,$cellFill)"/>
            <xsl:attribute name="borderStyle"><xsl:text>TBF_NB</xsl:text></xsl:attribute>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and (@data-cell-border='dotted-border')">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBF_DB',$valignStyle,$cellFill)"/>
            <xsl:attribute name="borderStyle"><xsl:text>TBF_DB</xsl:text></xsl:attribute>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and ancestor::tbody/parent::table[@class='jrnlKeyPoints']">
            <xsl:attribute name="aid5:cellstyle" select="concat('keyPointsBody_first',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and @rowspan">
            <xsl:variable name="rowSpanCount">
                <xsl:value-of select="@rowspan"/>
            </xsl:variable>
            <xsl:choose>
                <!--td with row span and followed by footnote-->
                <xsl:when test="($rowSpanCount) = $followingTRCount and parent::tr/following-sibling::tr[$rowSpanCount]//p[@class='jrnlTblFoot']">
                    <xsl:choose>
                        <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBFL_STACK',$valignStyle,$cellFill)"/>                            
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBFL',$valignStyle,$cellFill)"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <!--td with row span and not followed by footnote-->
                <xsl:when test="($rowSpanCount - 1) = $followingTRCount and count(parent::tr/following-sibling::tr) = ($rowSpanCount -1)">
                    <xsl:choose>
                        <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBFL_STACK',$valignStyle,$cellFill)"/>                            
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBFL',$valignStyle,$cellFill)"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>                
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBF',$valignStyle,$cellFill)"/>
                </xsl:otherwise>                
            </xsl:choose>                    
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and count(parent::tr/following-sibling::tr) = 0">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFL_STACK',$valignStyle,$cellFill)"/>                            
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFL',$valignStyle,$cellFill)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0 and count(parent::tr/following-sibling::tr) = 1 and (parent::tr/following-sibling::tr/td/p[@class='jrnlTblFoot'])">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFL_STACK',$valignStyle,$cellFill)"/>                            
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFL',$valignStyle,$cellFill)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:when test="count(parent::tr/preceding-sibling::tr) = 0">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBF',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:when test="parent::tr/preceding-sibling::*[1][@data-p-thead='true'] and not(count(parent::tr/following-sibling::tr) = 0)">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBF',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:when test="count(parent::tr/following-sibling::tr) = 0 and ancestor::tbody/parent::table[@class='jrnlKeyPoints']">
            <xsl:attribute name="aid5:cellstyle" select="concat('keyPointsBody_last',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:when test="./p[@class='jrnlTblFoot']">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFN_STACK',$valignStyle,$cellFill)"/>                            
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBFN',$valignStyle,$cellFill)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:when test="@rowspan">
            <xsl:variable name="rowSpanCount">
                <xsl:value-of select="@rowspan"/>
            </xsl:variable>
            <xsl:choose>
                <!--td with row span and followed by footnote-->
                <xsl:when test="($rowSpanCount) = $followingTRCount and parent::tr/following-sibling::tr[$rowSpanCount]//p[@class='jrnlTblFoot']">
                    <xsl:choose>
                        <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBL_STACK',$valignStyle,$cellFill)"/>                            
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBL',$valignStyle,$cellFill)"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <!--td with row span and not followed by footnote-->
                <xsl:when test="($rowSpanCount - 1) = $followingTRCount and count(parent::tr/following-sibling::tr) = ($rowSpanCount -1)">
                    <xsl:choose>
                        <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBL_STACK',$valignStyle,$cellFill)"/>                            
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="aid5:cellstyle" select="concat('TBL',$valignStyle,$cellFill)"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>                
                    <xsl:attribute name="aid5:cellstyle"  select="concat('TB',$valignStyle,$cellFill)"/>
                </xsl:otherwise>                
            </xsl:choose>                    
        </xsl:when>
        <xsl:when test="parent::tr/following-sibling::*[1][name()='tr']//p[@class='jrnlTblFoot']">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBL_STACK',$valignStyle,$cellFill)"/>                            
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBL',$valignStyle,$cellFill)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:when test="count(parent::tr/following-sibling::*[1][name()='tr']) = 0 ">
            <xsl:choose>
                <xsl:when test="ancestor::div[@class='jrnlTblBlock']/parent::div[@class='jrnlTblBlockGroup'] and ancestor::div[@class='jrnlTblBlock']/following-sibling::*[1]/@class='jrnlTblBlock' and not(ancestor::table/following-sibling::*[1]/@class='jrnlTblCaption')">
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBL_STACK',$valignStyle,$cellFill)"/>                            
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle" select="concat('TBL',$valignStyle,$cellFill)"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:when>
        <xsl:when test="@data-cell-border='no-border'">
            <xsl:attribute name="aid5:cellstyle" select="concat('TB_NB',$valignStyle,$cellFill)"/>
            <xsl:attribute name="borderStyle"><xsl:text>TB_NB</xsl:text></xsl:attribute>
        </xsl:when>
        <xsl:when test="@data-cell-border='dotted-border'">
            <xsl:attribute name="aid5:cellstyle" select="concat('TB_DB',$valignStyle,$cellFill)"/>
            <xsl:attribute name="borderStyle"><xsl:text>TB_DB</xsl:text></xsl:attribute>
        </xsl:when>
        <xsl:when test="parent::tr/preceding-sibling::*[1][@data-p-thead='true']">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBF',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:when test="parent::tr/following-sibling::*[1][@data-p-thead='true']">
            <xsl:attribute name="aid5:cellstyle" select="concat('TBL',$valignStyle,$cellFill)"/>
        </xsl:when>
        <xsl:otherwise>
                    <xsl:attribute name="aid5:cellstyle"  select="concat('TB',$valignStyle,$cellFill)"/>
        </xsl:otherwise>
      </xsl:choose>
	  <xsl:apply-templates/>
	</Cell>	
</xsl:template>

<xsl:template match="th">
	<Cell aid:table="cell" aid:theader="">
        <xsl:if test="@data-table-background-color">
            <xsl:attribute name="data-table-background-color" select="@data-table-background-color"/>
        </xsl:if>
	  <xsl:if test="@rowspan &gt; 1">
	     <xsl:attribute name="aid:crows" select="@rowspan"/>	  
	  </xsl:if>
	  <xsl:if test="not(@rowspan &gt; 1)">
	     <xsl:attribute name="aid:crows" select="count(.)"/>	  
	  </xsl:if>
	  <xsl:if test="@colspan &gt; 1">
	     <xsl:attribute name="aid:ccols" select="@colspan"/>	  
	  </xsl:if>
	  <xsl:if test="not(@colspan &gt; 1)">
	     <xsl:attribute name="aid:ccols" select="count(.)"/>	  
	  </xsl:if>	
	  <xsl:attribute name="aid:ccolwidth">
	     <xsl:value-of select="@width" />
	  </xsl:attribute>   
	  <xsl:attribute name="align">	  
	     <xsl:value-of select="@align"/>
	  </xsl:attribute>
        <xsl:variable name="cellFill">
            <xsl:choose>
                <xsl:when test="parent::tr/@data-fill='true'">
                    <xsl:text>_FILL</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="valignStyle">        
            <xsl:choose>
                <xsl:when test="./@valign='center'">
                    <xsl:text>_CTR</xsl:text>
                </xsl:when>
                <xsl:when test="./@valign='bottom'">
                    <xsl:text>_BTM</xsl:text>
                </xsl:when>
               <xsl:otherwise/>
            </xsl:choose>
        </xsl:variable>
 	  <xsl:choose>
            <xsl:when test="//ancestor::thead/parent::table[@class='jrnlKeyPoints']">
                <xsl:attribute name="aid5:cellstyle" select="concat('keyPointsHead',$valignStyle,$cellFill)"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="aid5:cellstyle" select="concat('TCH',$valignStyle,$cellFill)"/>
            </xsl:otherwise>
        </xsl:choose>
	  <xsl:apply-templates/> 	  
	</Cell>	
</xsl:template>
<!--Processing HTML tables to Indesign tables ends-->      

<xsl:template match="//copyRightBlock">
      <Table class="CYP_BLOCK" xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/" aid:table="table" aid:trows="1" aid:tcols="1" aid5:tablestyle="CYP_BLOCK">
          <Cell aid:table="cell" aid:crows="1" aid:ccols="1" aid:ccolwidth="264">
             <xsl:apply-templates/>        
          </Cell>	
        </Table>     
</xsl:template>

<xsl:template name="jrnlFNRef">
    <jrnlFNRef>
    <sup>
	  <xsl:apply-templates/> 	          
      </sup>
    </jrnlFNRef>
</xsl:template>

<xsl:template name="colWidth">
    <xsl:param name="currPostion" />
    <xsl:param name="max" />
</xsl:template>



<!--<xsl:call-template name="colWidth">
   <xsl:with-param name="currPostion">
      <xsl:value-of select="position()"/>   
   </xsl:with-param>
</xsl:call-template>
 -->
<!--Styling list starts-->
<!--Processing list tag starts-->  
<xsl:template match="ul|ol">
    <xsl:choose>
        <xsl:when test="parent::li">
               <xsl:call-template name="Entermark" />   	         	         
               <xsl:apply-templates/>
        </xsl:when>
        <xsl:otherwise>
               <xsl:apply-templates/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="//li">
      <xsl:variable name="precedingNodeClassName" select="parent::ol/preceding-sibling::*[1]/@style | parent::ol/preceding-sibling::*[1]/@class"/>            
   	<xsl:if test="parent::ol">
   	  <nl>   	     
            <xsl:attribute name="data-word-spacing" select="./p[@class='jrnlListPara']/@data-word-spacing"/>
   	     <xsl:variable name="precedingBlockType">
                <xsl:choose>
                 <xsl:when test="parent::ol/@class='EXM'">
                    <xsl:text>EXM_</xsl:text>
                 </xsl:when>
                    <xsl:when test="ancestor::table">
                        <xsl:text>TBL_</xsl:text>
                    </xsl:when>
                    <xsl:when test="ancestor::div[@class='jrnlAbsGroup']">
                        <xsl:text>ABS_</xsl:text>
                    </xsl:when>
                    <xsl:when test="ancestor::div[@class='jrnlBoxBlock']">
                        <xsl:text>BOX_</xsl:text>
                    </xsl:when>
                    <xsl:otherwise/>
                </xsl:choose>            
            </xsl:variable>
   	     <xsl:variable name="appliedStyleType" select="parent::ol/@class | parent::ol/@type"/><!--Current list style style-->
   	     <xsl:variable name="styleType">
            <xsl:choose>   	        
   	        <xsl:when test="$appliedStyleType = 'lower-alpha' or $appliedStyleType = 'customNumber'">
   	           <xsl:text>AL</xsl:text><!--lower alpha list-->
   	        </xsl:when>
   	        <xsl:when test="$appliedStyleType = 'upper-alpha'">
   	           <xsl:text>UAL</xsl:text><!--upper alpha list-->
   	        </xsl:when>
   	        <xsl:when test="$appliedStyleType = 'lower-roman'">
   	           <xsl:text>LR</xsl:text><!--lower roman list-->
   	        </xsl:when>
   	        <xsl:when test="$appliedStyleType = 'upper-roman'">
   	           <xsl:text>UR</xsl:text><!--upper roman list-->
   	        </xsl:when>
   	        <xsl:otherwise>
   	           <xsl:text>NL</xsl:text>   	           
   	        </xsl:otherwise>
   	     </xsl:choose>
   	     </xsl:variable>   	  
   	     <!--Identifying the level of list - start-->   
            <xsl:attribute name="level">
               <xsl:value-of select="count(ancestor::ol)"/>
            </xsl:attribute>
   	     <!--Identifying the level of list - end-->               
   	     <!--Appending style type - starts-->
            <xsl:variable name="subLevel">
                <xsl:for-each select="./parent::ol/ancestor::*">
                    <xsl:choose>
                        <xsl:when test="name(.) = 'ul'">
                            <xsl:variable name="ancestorListType" select="./@type | ./@list-style-type"/><!--Current list style style-->
                            <xsl:choose>   	        
                                    <xsl:when test="$ancestorListType = 'disc' or $ancestorListType = 'customBullet' or $ancestorListType = 'bullet'">
                                       <xsl:text>BL_</xsl:text><!--default bullet list-->
                                    </xsl:when>
                                    <xsl:when test="$ancestorListType = 'square'">
                                       <xsl:text>SQL_</xsl:text><!--square bullet list-->
                                    </xsl:when>
                                    <xsl:otherwise>
                                       <xsl:text>DL_</xsl:text>   	           
                                    </xsl:otherwise>
                             </xsl:choose>
                        </xsl:when>
                        <xsl:when test="name(.) = 'ol'">
                            <xsl:variable name="ancestorListType" select="./@class | ./@type"/><!--Current list style style-->
                            <xsl:choose>   	        
                                <xsl:when test="$ancestorListType = 'lower-alpha' or $ancestorListType = 'customNumber'">
                                   <xsl:text>AL_</xsl:text><!--lower alpha list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'upper-alpha'">
                                   <xsl:text>UAL_</xsl:text><!--upper alpha list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'lower-roman'">
                                   <xsl:text>LR11_</xsl:text><!--lower roman list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'upper-roman'">
                                   <xsl:text>UR_</xsl:text><!--upper roman list-->
                                </xsl:when>
                                <xsl:otherwise>
                                   <xsl:text>NL_</xsl:text>   	           
                                </xsl:otherwise>
                         </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise/>
                    </xsl:choose>
                </xsl:for-each>
            </xsl:variable>
            <xsl:attribute name="aid:pstyle">
            <xsl:variable name="previousText">
                <xsl:value-of  select="./parent::ol/preceding-sibling::*[1]"/>
            </xsl:variable>
               <xsl:variable name="startsWithValue">
                    <xsl:choose>
                        <xsl:when test="not(./parent::ol/@start)">
                            <xsl:number value="0" format="1" />
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="./parent::ol/@start - 1"/>
                        </xsl:otherwise>
                    </xsl:choose>
               </xsl:variable>
               <xsl:variable name="listCount" select="count(parent::ol/child::li) + $startsWithValue" />
                        <!--Checking for parent whether it is numer list starts-->
                           <xsl:if test="ancestor::table[@class='APP_TBL']">
                                <xsl:text>APP_</xsl:text>
                           </xsl:if>
                        <!--Checking for parent whether it is numer list ends-->
      			<xsl:choose>
      				<xsl:when test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/@start)">
      				  <xsl:value-of select="$precedingBlockType"/>
      				  <xsl:value-of select="$subLevel"/>
      				  <xsl:value-of select="$styleType"/>      			      				
                            <xsl:text>-T</xsl:text>
      	           <!--Two digit lists-->			
      				  <xsl:if test="$listCount &gt; 9 and ($listCount &lt; 100)">
      				     <xsl:text>2</xsl:text>   
      				  </xsl:if>
      	           <!--Three digit lists-->			      				  
      				  <xsl:if test="$listCount &gt; 99 and $listCount &lt; 999">
      				     <xsl:text>3</xsl:text>   
      				  </xsl:if>
      				</xsl:when>
                        <xsl:when test="preceding-sibling::li and not(following-sibling::li)">
      				  <xsl:value-of select="$precedingBlockType"/>
      				  <xsl:value-of select="$subLevel"/>
      				  <xsl:value-of select="$styleType"/>      			                  
                        <xsl:text>-B</xsl:text>
      	           <!--Two digit lists-->			
      				  <xsl:if test="$listCount &gt; 9 and ($listCount &lt; 100)">
      				     <xsl:text>2</xsl:text>   
      				  </xsl:if>
      	           <!--Three digit lists-->			      				  
      				  <xsl:if test="$listCount &gt; 99 and $listCount &lt; 999">
      				     <xsl:text>3</xsl:text>   
      				  </xsl:if>
                        <xsl:if test="parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
      				     <xsl:text>-BEFORE-HEAD</xsl:text>   
      				  </xsl:if>                      
                        <xsl:if test="ancestor::div[@class='jrnlAbsGroup'] and count(./parent::ol/following-sibling::*)=0">
                                <xsl:text>-ABS_LAST</xsl:text>
                        </xsl:if>
                    </xsl:when>
                    <xsl:when test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/@start)">
      				  <xsl:value-of select="$precedingBlockType"/>
      				  <xsl:value-of select="$subLevel"/>
      				  <xsl:value-of select="$styleType"/>      			                  
      	            <xsl:text>-O</xsl:text>					
                    </xsl:when>
                    <xsl:otherwise>
      	           <xsl:choose>      			      	           
      	           <!--Two digit lists-->			      	           
                      <xsl:when test="$listCount &gt; 9 and not($listCount &gt; 100)">
      				  <xsl:value-of select="$precedingBlockType"/>
                          <xsl:value-of select="$subLevel"/>
                          <xsl:value-of select="$styleType"/>  
                          <xsl:choose>
                            <xsl:when test="count(preceding-sibling::li) &gt;= 9 or (./parent::ol/@start &gt;= 9)">
                                <xsl:text>2-1</xsl:text>   
                            </xsl:when>
                            <xsl:when test="count(preceding-sibling::li) &lt; 9">
                                <xsl:text>2-0</xsl:text>   
                            </xsl:when>
                            <xsl:otherwise/>
                          </xsl:choose>
                      </xsl:when>
      	           <!--Three digit lists-->			      				        	                  	                     				  
         				  <xsl:when test="$listCount &gt; 99 and $listCount &lt; 999">
                                <xsl:value-of select="$precedingBlockType"/>
                                  <xsl:value-of select="$subLevel"/>
                                  <xsl:value-of select="$styleType"/>      			         				  
                               <xsl:if test="count(preceding-sibling::li) &gt;= 99">
                                  <xsl:text>3-2</xsl:text>   
                               </xsl:if>
                               <xsl:if test="count(preceding-sibling::li) &lt; 99 and not(count(preceding-sibling::li) &lt; 9)">
                                  <xsl:text>3-1</xsl:text>   
                               </xsl:if>                                                
                               <xsl:if test="count(preceding-sibling::li) &lt; 9">
                                  <xsl:text>3-0</xsl:text>   
                               </xsl:if>                                                
         				  </xsl:when>
         				  <xsl:otherwise>
                                <xsl:value-of select="$precedingBlockType"/>
            				  <xsl:value-of select="$subLevel"/>
            				  <xsl:value-of select="$styleType"/>      			         				  
         				  <!--leaving 'otherwise empty'-->
         				  </xsl:otherwise>         				  
      	           </xsl:choose>
                  </xsl:otherwise>
      			</xsl:choose>
            </xsl:attribute> 
   	     <!--Appending style type - ends-->                                                    
            <xsl:choose>
               <xsl:when test="$precedingNodeClassName='EXM_TBL' or $precedingNodeClassName='jrnlEXM_LANG' or $precedingNodeClassName='jrnlEXM_AU'">
                  <xsl:attribute name="style">
                     <xsl:text>EXM_RL</xsl:text>
                  </xsl:attribute>                 
               </xsl:when>
               <xsl:otherwise>
                  <xsl:attribute name="style">
                     <xsl:text></xsl:text>
                  </xsl:attribute>                   
               </xsl:otherwise>            
            </xsl:choose>            
                <xsl:if test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
                <xsl:if test="preceding-sibling::li and not(following-sibling::li) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
            <xsl:apply-templates/>
   	  </nl>
        <xsl:choose>
            <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ul/following-sibling::*[1])">
            </xsl:when>
            <xsl:when test="ancestor::td and not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
            </xsl:when>
            <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ol/following-sibling::*[1])">
            </xsl:when>
            <xsl:when test="(parent::ol/parent::li or parent::ul/parent::li) and not(following-sibling::li)">
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="Entermark" />
            </xsl:otherwise>
        </xsl:choose>
   	</xsl:if>
   	<xsl:if test="parent::ul">
   	  <xsl:choose>
   	     <xsl:when test="parent::ul/@type='disc' or parent::ul/@class='customBullet' or parent::ul/@list-style-type='disc'  or parent::ul/@type='bullet'" >
         	  <bl>
                <xsl:attribute name="data-word-spacing" select="./p[@class='jrnlListPara']/@data-word-spacing"/>
         	  <!--Identifying the level of list - start-->      	  
               <xsl:attribute name="level">
                  <xsl:value-of select="count(ancestor::ol)"/>
               </xsl:attribute>
         	  <!--Identifying the level of list - ends-->            
      	     <!--Appending style type - starts-->
         		<xsl:variable name="subLevel">
                    <xsl:for-each select="./parent::ul/ancestor::*">
                        <xsl:choose>
                            <xsl:when test="name(.) = 'ul'">
                                <xsl:variable name="ancestorListType" select="./@type | ./@list-style-type"/><!--Current list style style-->
                                <xsl:choose>   	        
                                        <xsl:when test="$ancestorListType = 'disc' or $ancestorListType = 'customBullet' or $ancestorListType = 'bullet'">
                                           <xsl:text>BL_</xsl:text><!--default bullet list-->
                                        </xsl:when>
                                        <xsl:when test="$ancestorListType = 'square'">
                                           <xsl:text>SQL_</xsl:text><!--square bullet list-->
                                        </xsl:when>
                                        <xsl:otherwise>
                                           <xsl:text>DL_</xsl:text>   	           
                                        </xsl:otherwise>
                                 </xsl:choose>
                            </xsl:when>
                            <xsl:when test="name(.) = 'ol'">
                                <xsl:variable name="ancestorListType" select="./@class | ./@type"/><!--Current list style style-->
                                <xsl:choose>   	        
                                    <xsl:when test="$ancestorListType = 'lower-alpha' or $ancestorListType = 'customNumber'">
                                       <xsl:text>AL_</xsl:text><!--lower alpha list-->
                                    </xsl:when>
                                    <xsl:when test="$ancestorListType = 'upper-alpha'">
                                       <xsl:text>UAL_</xsl:text><!--upper alpha list-->
                                    </xsl:when>
                                    <xsl:when test="$ancestorListType = 'lower-roman'">
                                       <xsl:text>LR_</xsl:text><!--lower roman list-->
                                    </xsl:when>
                                    <xsl:when test="$ancestorListType = 'upper-roman'">
                                       <xsl:text>UR_</xsl:text><!--upper roman list-->
                                    </xsl:when>
                                    <xsl:otherwise>
                                       <xsl:text>NL_</xsl:text>   	           
                                    </xsl:otherwise>
                             </xsl:choose>
                            </xsl:when>
                            <xsl:otherwise/>
                        </xsl:choose>
                    </xsl:for-each>
         		</xsl:variable>
         		<xsl:variable name="ancestorTbl">
                        <xsl:if test="ancestor::table">
                            <xsl:text>TBL_</xsl:text>
                        </xsl:if>
                        <xsl:if test="ancestor::div[@class='jrnlBoxBlock']"><!--Update-->
                            <xsl:text>BOX_</xsl:text>
                        </xsl:if>
                        <xsl:if test="ancestor::div[@class='jrnlAbsGroup']"><!--Update-->
                            <xsl:text>ABS_</xsl:text>
                        </xsl:if>
         		</xsl:variable>                
               <xsl:attribute name="aid:pstyle">
         			<xsl:choose>
         				<xsl:when test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::*[1]/preceding-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/preceding-sibling::*[1][name()='jrnlAckHead'])">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
         	            <xsl:text>BL-T</xsl:text>		
         				</xsl:when>
                        <xsl:when test="preceding-sibling::li and not(following-sibling::li)">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
                            <xsl:text>BL-B</xsl:text>					
                            <xsl:if test="parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
                                <xsl:text>-BEFORE-HEAD</xsl:text>   
                            </xsl:if>                      
                            <xsl:if test="ancestor::div[@class='jrnlAbsGroup'] and count(./parent::ol/following-sibling::*)=0">
                                    <xsl:text>-ABS_LAST</xsl:text>
                            </xsl:if>
                        </xsl:when>
                        <xsl:when test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
                            <xsl:text>BL-O</xsl:text>					
                            <xsl:if test="parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
                             <xsl:text>-BEFORE-HEAD</xsl:text>   
                           </xsl:if>                      
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$ancestorTbl"/>
                            <xsl:value-of select="$subLevel"/>
                            <xsl:text>BL</xsl:text>
                         </xsl:otherwise>
                    </xsl:choose>
               </xsl:attribute>   	     
                <xsl:if test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
                <xsl:if test="preceding-sibling::li and not(following-sibling::li) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
      	     <!--Appending style type - ends-->                                                    
               <xsl:apply-templates/>
              </bl>    	        	     
               <xsl:choose>
                    <xsl:when test="ancestor::td and not(following-sibling::li) and parent::ol/following-sibling::*[1][@class='jrnlTblBody']">
                        <xsl:call-template name="Entermark" />               
                    </xsl:when>
                    <xsl:when test="ancestor::td and not(following-sibling::li) and parent::ul/following-sibling::*[1][@class='jrnlTblBody']">
                        <xsl:call-template name="Entermark" />               
                    </xsl:when>
                    <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ol/following-sibling::*[1])">
                    </xsl:when>
                    <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ul/following-sibling::*[1])">
                    </xsl:when>
                    <xsl:when test="ancestor::td and not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
                    </xsl:when>
                    <xsl:when test="(parent::ol/parent::li or parent::ul/parent::li) and not(following-sibling::li)">
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="Entermark" />               
                    </xsl:otherwise>
               </xsl:choose>
           </xsl:when><!--Ending bullet list-->
            <xsl:when test="parent::ul/@type='square'"><!--square list-->
                <sq>
                   <xsl:attribute name="data-word-spacing" select="./p[@class='jrnlListPara']/@data-word-spacing"/>
                   <xsl:attribute name="aid:pstyle">
                    <!--Checking for parent whether it is numer list starts-->
                       <xsl:if test="parent::ul/parent::li/parent::ol">
                            <xsl:text>NL_</xsl:text>
                       </xsl:if>
                    <!--Checking for parent whether it is numer list ends-->
                        <xsl:choose>
                            <xsl:when test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul)">
                            <xsl:text>SQL-T</xsl:text>		
                            </xsl:when>
                         <xsl:when test="preceding-sibling::li and not(following-sibling::li)">
                            <xsl:text>SQL-B</xsl:text>					
                            </xsl:when>
                         <xsl:when test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
                            <xsl:text>SQL-O</xsl:text>					
                            </xsl:when>
                            <xsl:otherwise>
                            <xsl:text>SQL</xsl:text>
                         </xsl:otherwise>
                        </xsl:choose>
                        <xsl:if test="preceding-sibling::li and not(following-sibling::li) and parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
      				     <xsl:text>-BEFORE-HEAD</xsl:text>   
      				  </xsl:if>                      
                   </xsl:attribute>   	     
                 <!--Appending style type - ends-->                                                    
                    <xsl:if test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                        <xsl:attribute name="data-top-space">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                        <xsl:attribute name="data-top-space">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                        <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                    </xsl:if>
                    <xsl:if test="preceding-sibling::li and not(following-sibling::li) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                        <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                    </xsl:if>
                   <xsl:apply-templates/>
                </sq>   
                <xsl:call-template name="Entermark" />   	         	         
            </xsl:when>
            <xsl:when test="parent::ul/@type='arrow'"><!--arrow list-->
                <arw>
                   <xsl:attribute name="data-word-spacing" select="./p[@class='jrnlListPara']/@data-word-spacing"/>
                   <xsl:attribute name="aid:pstyle">
                    <!--Checking for parent whether it is numer list starts-->
                       <xsl:if test="parent::ul/parent::li/parent::ol">
                            <xsl:text>NL_</xsl:text>
                       </xsl:if>
                    <!--Checking for parent whether it is numer list ends-->
                        <xsl:choose>
                            <xsl:when test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul)">
                            <xsl:text>ARWL-T</xsl:text>		
                            </xsl:when>
                         <xsl:when test="preceding-sibling::li and not(following-sibling::li)">
                            <xsl:text>ARWL-B</xsl:text>					
                            </xsl:when>
                         <xsl:when test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
                            <xsl:text>ARWL-O</xsl:text>					
                            </xsl:when>
                            <xsl:otherwise>
                              <!--<xsl:value-of select="$subLevel"/>-->
                            <xsl:text>ARWL</xsl:text>
                         </xsl:otherwise>
                        </xsl:choose>
                        <xsl:if test="preceding-sibling::li and not(following-sibling::li) and parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
      				     <xsl:text>-BEFORE-HEAD</xsl:text>   
      				  </xsl:if>                      
                   </xsl:attribute>   	     
                 <!--Appending style type - ends-->    
                    <xsl:if test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                        <xsl:attribute name="data-top-space">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                        <xsl:attribute name="data-top-space">true</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                        <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                    </xsl:if>
                    <xsl:if test="preceding-sibling::li and not(following-sibling::li) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                        <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                        <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                    </xsl:if>
                   <xsl:apply-templates/>
                </arw>   
                   <xsl:call-template name="Entermark" />   	         	         
            </xsl:when>
   	     <xsl:otherwise>
         	  <dl>
               <xsl:attribute name="data-word-spacing" select="./p[@class='jrnlListPara']/@data-word-spacing"/>
         	  <!--Identifying the level of list - start-->      	  
               <xsl:attribute name="level">
                  <xsl:value-of select="count(ancestor::ul)"/>
               </xsl:attribute>
         	  <!--Identifying the level of list - ends-->            
      	     <!--Appending style type - starts-->
            <xsl:variable name="subLevel">
                <xsl:for-each select="./parent::ul/ancestor::*">
                    <xsl:choose>
                        <xsl:when test="name(.) = 'ul'">
                            <xsl:variable name="ancestorListType" select="./@type | ./@list-style-type"/><!--Current list style style-->
                            <xsl:choose>   	        
                                    <xsl:when test="$ancestorListType = 'disc' or $ancestorListType = 'customBullet' or $ancestorListType = 'bullet'">
                                       <xsl:text>BL_</xsl:text><!--default bullet list-->
                                    </xsl:when>
                                    <xsl:when test="$ancestorListType = 'square'">
                                       <xsl:text>SQL_</xsl:text><!--square bullet list-->
                                    </xsl:when>
                                    <xsl:otherwise>
                                       <xsl:text>DL_</xsl:text>   	           
                                    </xsl:otherwise>
                             </xsl:choose>
                        </xsl:when>
                        <xsl:when test="name(.) = 'ol'">
                            <xsl:variable name="ancestorListType" select="./@class | ./@type"/><!--Current list style style-->
                            <xsl:choose>   	        
                                <xsl:when test="$ancestorListType = 'lower-alpha' or $ancestorListType = 'customNumber'">
                                   <xsl:text>AL_</xsl:text><!--lower alpha list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'upper-alpha'">
                                   <xsl:text>UAL_</xsl:text><!--upper alpha list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'lower-roman'">
                                   <xsl:text>LR11_</xsl:text><!--lower roman list-->
                                </xsl:when>
                                <xsl:when test="$ancestorListType = 'upper-roman'">
                                   <xsl:text>UR_</xsl:text><!--upper roman list-->
                                </xsl:when>
                                <xsl:otherwise>
                                   <xsl:text>NL_</xsl:text>   	           
                                </xsl:otherwise>
                         </xsl:choose>
                        </xsl:when>
                        <xsl:otherwise/>
                    </xsl:choose>
                </xsl:for-each>
            </xsl:variable>
         		<xsl:variable name="ancestorTbl">
                        <xsl:if test="ancestor::table">
                            <xsl:text>TBL_</xsl:text>
                        </xsl:if>
                        <xsl:if test="ancestor::div[@class='jrnlBoxBlock']">
                            <xsl:text>BOX_</xsl:text>
                        </xsl:if>
         		</xsl:variable>                
               <xsl:attribute name="aid:pstyle">
         			<xsl:choose>
         				<xsl:when test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul)">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
         	            <xsl:text>DL-T</xsl:text>			
         				</xsl:when>
                     <xsl:when test="preceding-sibling::li and not(following-sibling::li)">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
         	            <xsl:text>DL-B</xsl:text>					
         				</xsl:when>
                     <xsl:when test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
         	            <xsl:text>DL-O</xsl:text>					
         				</xsl:when>
         				<xsl:otherwise>
         				  <xsl:value-of select="$ancestorTbl"/>
         				  <xsl:value-of select="$subLevel"/>
         	            <xsl:text>DL</xsl:text>
                     </xsl:otherwise>
         			</xsl:choose>
                        <xsl:if test="preceding-sibling::li and not(following-sibling::li) and parent::*[1]/following-sibling::*[1][name()='jrnlHead1'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead2'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead3'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead4'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead5'] or parent::*[1]/following-sibling::*[1][name()='jrnlHead6'] or parent::*[1]/following-sibling::*[1][name()='jrnlRefHead'] or parent::*[1]/following-sibling::*[1][name()='jrnlAckHead']">
      				     <xsl:text>-BEFORE-HEAD</xsl:text>   
      				  </xsl:if>                      
               </xsl:attribute>   	     
      	     <!--Appending style type - ends-->                                                    
                <xsl:if test="not(preceding-sibling::li) and (following-sibling::li or child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-top-gap" select="@data-top-gap"/>
                    <xsl:attribute name="data-top-space">true</xsl:attribute>
                </xsl:if>
                <xsl:if test="not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
                <xsl:if test="preceding-sibling::li and not(following-sibling::li) and not(child::ul or child::ol or parent::ol/ancestor::ol or parent::ol/ancestor::ul or parent::ul/ancestor::ol)">
                    <xsl:attribute name="data-bottom-space">true</xsl:attribute>
                    <xsl:attribute name="data-bottom-gap" select="preceding-sibling::li/@data-top-gap"/>
                </xsl:if>
               <xsl:apply-templates/>
               </dl>    	     
               <xsl:choose>
                    <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ol/following-sibling::*[1])">
                    </xsl:when>
                    <xsl:when test="ancestor::td and preceding-sibling::li and not(following-sibling::li) and not(parent::ul/following-sibling::*[1])">
                    </xsl:when>
                    <xsl:when test="ancestor::td and not(preceding-sibling::li) and not(following-sibling::li)  and not(child::ol or child::ul)">
                    </xsl:when>
                    <xsl:when test="ancestor::td and (child::ol or child::ul) and not(following-sibling::*[1])">
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:call-template name="Entermark" />               
                    </xsl:otherwise>
               </xsl:choose>
   	     </xsl:otherwise>
   	  </xsl:choose>
      </xsl:if>
</xsl:template>
<!--Skiping nodes which are not required for proof-->
<xsl:template match="//jrnlAffRef" /><!--Specific Springer 'Duffy' book-->
<!--<xsl:template match="//RefSlNo" />-->
<xsl:template match="//alt-title" />

</xsl:stylesheet>
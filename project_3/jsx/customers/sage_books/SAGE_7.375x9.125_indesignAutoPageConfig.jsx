﻿var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136", 
    "defaultUnits":"pt",
    "baseLeading":11.5,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":531,
        "height":657
    },
    "retainBoxWidth":414,
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":9
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[54,108,588,450
    ],
    "geoBoundsRecto":[54,612,588,954
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":387, "height":515,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":342, "height":533,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":72,
                "bottom":70,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":54,
                "bottom":70,
                "inside":81,
                "outside":108
                }
            }        
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":45,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        },
     "TYPE1":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":72,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
     "BM_TYPE1":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":72,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
     "BM_TYPE2":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":72,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
     "BM_TYPE3":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":72,
        "rectoPageValue":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":340.85, 
      "horizontalCenter":true
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    },
    "figure":{
      "footer": {
        "continuedText": "(Continued)",
         "repeat-header": true,
        "repeatLabel":true,
        "figureLabel": false,
        "continuedTextStyle": "FIG_Cont",
        "figureBottomDefaultGap": 6
        },
      "header": {
        "continuedText":"(Continued)",
        "repeat-header": true,
        "repeatLabel":false,
        "figureContinuedTextOnLastPart":true,
        "repeat-sub-header": false,
        "spaceBelow": 6,
        "figureContinuedStyle": "FIG_ContHead"
            }
        }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead2,jrnlHead3,jrnlRefHead,NL-T,NL-O,QUOTE-O",
            "after":"NL-O,QUOTE-O"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead2,jrnlHead3,jrnlRefHead,NL-T,NL-O,QUOTE-O",
            "after":"NL-O,QUOTE-O"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlArtTitle,jrnlHead1,jrnlHead2,jrnlHead3",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "docFontsList":[
       {
          "Adobe Garamond Pro": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
        {
          "Din": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
            }
          }
        },
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Roman"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Italic"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Raleway", "fontStyle":"Medium"},
            {"fontFamily":"Din", "fontStyle":"Italic"},
            {"fontFamily":"Din", "fontStyle":"Roman"},
            {"fontFamily":"Din", "fontStyle":"Bold Italic"},
            {"fontFamily":"Din", "fontStyle":"Bold"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRTR']", "frame-name":"CRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVTL']", "frame-name":"CVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null}    
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"120,120,120"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"236,236,236"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"217,217,217"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                 "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"120,120,120"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"236,236,236"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"217,217,217"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "8px",
                    "font-family" : "'DIN-Regular', DIN-Regular"
                },
                "fontPath"  : "DIN-Regular/DIN-Regular.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'DIN-Bold',DIN-Bold",
                    "font-size" : "8.5px",
                    "line-height" : "11.5px",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'DIN-Regular',DIN-Regular",
                    "font-size" : "8px",
                    "line-height" : "11px",
                    "padding" : "0px 0px 0px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "342pt"
              },
              "font" : {
                  "size"    : "10.25pt",
                  "ledding" : "11.5pt",
                  "path"    : "/AGaramondPro-Regular/",
                  "ext"     : "otf",
                  "bold"    : "AGaramondPro-Bold",
                  "italic"  : "AGaramondPro-Italic",
                  "bold_italic":"AGaramondPro-BoldItalic",
                  "main"    : "AGaramondPro-Regular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "342pt"
              },
              "font" : {
                "size"    : "1pt",
                "ledding" : "11pt",
                "path"    : "/DIN-Regular/",
                "ext"     : "otf",
                  "bold"    : "DIN-Bold",
                  "italic"  : "DINOT-Italic",
                  "bold-italic":"DINOT-BoldItalic",
                  "main":"DIN-Regular",
              }
           }
        },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "RELATED_ARTICLE_INFO": true
        }
    },
"runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":198, "height":498,"floatsCited":false,"gutter":0},
                  {"width":198, "height":498,"floatsCited":false,"gutter":18}
                    ],
                "columnDetails":[
                  {"width":198, "height":498,"floatsCited":false,"gutter":0},
                  {"width":198, "height":498,"floatsCited":false,"gutter":18}
                    ],
                "openerPageMargin":{
                 "top":81,
                "bottom":84,
                "inside":75,
                "outside":36
                },
            "otherPageMargin":{
                 "top":81,
                "bottom":84,
                "inside":75,
                "outside":36
                }
            }
        },
     {"xpath":"//div[@class='jrnlFootNoteFNGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":198, "height":498,"floatsCited":false,"gutter":0},
                  {"width":198, "height":498,"floatsCited":false,"gutter":18}
                    ],
                "columnDetails":[
                  {"width":198, "height":498,"floatsCited":false,"gutter":0},
                  {"width":198, "height":498,"floatsCited":false,"gutter":18}
                    ],
                "openerPageMargin":{
                 "top":81,
                "bottom":84,
                "inside":75,
                "outside":36
                },
            "otherPageMargin":{
                 "top":81,
                "bottom":84,
                "inside":75,
                "outside":36
                }
            }
        },
    ] 
}
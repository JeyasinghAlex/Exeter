var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136", 
    "defaultUnits":"pt",
    "baseLeading":11,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "boxBreakAt":{
        "KEY":"startOfParagraph",
        "xPath":"//p[@pstyle='jrnlBoxTitle']"
        },
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":609.449,
        "height":788.031
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":8.504
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            },
        "cover":{
            "print":{
                "crop_marks":true,
                "bleed_marks":false,
                "registration_marks":true,
                "colour_bars":false,
                "page_information":false,
                "offset":8.504
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
        "toc":{
            "print":{
                "crop_marks":true,
                "bleed_marks":false,
                "registration_marks":true,
                "colour_bars":false,
                "page_information":false,
                "offset":8.504
                },
            "online":{
                "crop_marks":false, 
                "bleed_marks":false, 
                "registration_marks":false, 
                "colour_bars":false, 
                "page_information":false,
                "offset":0
                }
            }
        },
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true,
        "Copyediting":true, 
        "Copyediting Check":true, 
        "Typesetter Check":true, 
        "Publisher Check":true, 
        "Author Review":true, 
        "Publisher Review":true, 
        "Author Revision":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[71.815,51.024,733.815,558.023818897638
    ],
    "geoBoundsRecto":[71.815,660.873818897638,733.815,1167.87401574803
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":241, "height":590,"floatsCited":false,"gutter":0},
                  {"width":241, "height":590,"floatsCited":false,"gutter":25}
                ],
                "columnDetails":[
                  {"width":241, "height":662,"floatsCited":false,"gutter":0},
                  {"width":241, "height":662,"floatsCited":false,"gutter":25}
                ],
                "openerPageMargin":{
                 "top":72,
                "bottom":56,
                "inside":51.425,
                "outside":51.024
                },
            "otherPageMargin":{
                 "top":71.815,
                "bottom":54.425,
                "inside":51.425,
                "outside":51.024
                }
            }             
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":true,
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
    }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,45],
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
          "Plantin Std ": {
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
          "Frutiger LT Pro": {
            "47 Light Condensed": {
                "Symbol (T1)": "Regular"
              },
                "48 Light Condensed Italic": {
                    "Symbol (T1)": "Italic"
              },
                "57 Condensed": {
                    "Symbol (T1)": "Regular"
            },
                "58 Condensed Italic": {
                    "Symbol (T1)": "Italic"
            },
                "67 Bold Condensed": {
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
            {"fontFamily":"Plantin Std ", "fontStyle":"Roman"},
            {"fontFamily":"Plantin Std ", "fontStyle":"Italic"},
            {"fontFamily":"Plantin Std ", "fontStyle":"Bold"},
            {"fontFamily":"Plantin Std ", "fontStyle":"Bold Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"47 Light Condensed"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"48 Light Condensed Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"57 Condensed"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"58 Condensed Italic"},
            {"fontFamily":"Frutiger LT Pro", "fontStyle":"67 Bold Condensed"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='front']//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//div[@class='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCopyrightStmtInfo']", "frame-name":"COPYRIGHTSTMT_INFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
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
                    "colourValue":"34,34,33"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"217,217,217"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
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
                    "colourValue":"34,34,33"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"217,217,217"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            }
        },
    "stubColObj":{
        "top": {
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "STUB_COLUMN": true,
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    },
   "tocDetails":{
       "tocAdjustParagraphSpaceStyleList":{
            "increase":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "softBreak":["jrnlArtTitle"],                
            "limitationPercentage":{
                "minimum":40,
                "maximum":60
            },
            "pointSizeModify":{                
                "maximum":0.5
            }
        },
       "fontFamily":{
            "Gotham":{
                "Light":{  
                "roman":"Light",
                "bold":"Bold",
                "italic":"Light Italic",
                "bolditalic":"Bold Italic"
                },
                "Bold":{
                "roman":"Light",
                "bold":"Bold",
                "italic":"Light Italic",
                "bolditalic":"Bold Italic" 
                },
                "LightItalic":{
                "roman":"Light",
                "bold":"Bold Italic",
                "italic":"Light Italic",
                "bolditalic":"Bold Italic" 
                },
                "BoldItalic":{
                "roman":"Light",
                "bold":"Bold",
                "italic":"Light Italic",
                "bolditalic":"Bold Italic" 
                }   
            }
        }
    }
}
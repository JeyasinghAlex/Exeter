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
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":595.276,
        "height":793.701
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":true, 
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
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "toc":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
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
    "geoBoundsVerso":[55.5,28.5,741.200787401575,566.775590551
    ],
    "geoBoundsRecto":[55.5,623.775590551,741.200787401575,1162.051181102
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "EDITORIAL":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{
            "openerPageColumnDetails":[
                  {"width":207.745, "height":685.701,"floatsCited":false,"gutter":0},
                  {"width":207.745, "height":685.701,"floatsCited":false,"gutter":12.5}
                ],
                "columnDetails":[
                  {"width":260.087, "height":685.701,"floatsCited":false,"gutter":0},
                  {"width":260.087, "height":685.701,"floatsCited":false,"gutter":18.101}
                ],
               "openerPageMargin":{
               "top":55.5,
                "bottom":52.5,
                "inside":138.622,
                "outside":28.5
                },
            "otherPageMargin":{
                    "top":55.5,
                    "bottom":52.5,
                    "inside":28.5,
                    "outside":28.5
                }
            }
    },
 "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
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
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":358.851, 
      "horizontalCenter":true//if this is true float could be center horizontally after rotated
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
//~         "continuedText":"Table [ID]. [CAPTION][ensp](<i>Continued</i>)",
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[80,85,90]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
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
          "ClassGarmnd BT": {
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
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Roman"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Italic"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Bold"},
            {"fontFamily":"ClassGarmnd BT", "fontStyle":"Bold Italic"},
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
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO_CONMED", "action":"move", "styleOverride":null},
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
                    "colourValue":"100,82,37,28"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,7,0"
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
                    "colourValue":"19,55,94"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"208,216,224"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "EDITORIAL":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,82,37,28"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,7,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"74,24,0,0"
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
                    "colourValue":"19,55,94"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"208,216,224"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"30,157,216"
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
        "bottom": {
            "METAINFO": false,
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        },
        "top": {
            "STUB_COLUMN": true,
            "STUB_STMT": false
        }
    },
    "tocDetails":{
       "tocAdjustParagraphSpaceStyleList":{
            "increase":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "decrease":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "softBreak":["jrnlArtTitle"],                
            "limitationPercentage":{
                "minimum":40,
                "maximum":80
            },
            "pointSizeModify":{                
                "maximum":0.5
            }
        },
       "fontFamily":{
            "ZurichBT":{
                "LightCondensed":{  
                "roman":"Light Condensed",
                "bold":"Condensed",
                "italic":"Light Condensed Italic",
                "bolditalic":"Condensed Italic"
                },
                "Condensed":{  
                "roman":"Light Condensed",
                "bold":"Bold Condensed",
                "italic":"Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "BoldCondensed":{
                "roman":"Bold Condensed",
                "bold":"Bold Condensed",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "BoldCondensedItalic":{
                "roman":"Bold Condensed",
                "bold":"Bold Condensed",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "LightCondensedItalic":{
                "roman":"Light Condensed",
                "bold":"Bold Condensed Italic",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "Roman":{  
                "roman":"Roman",
                "bold":"Bold",
                "italic":"Italic",
                "bolditalic":"Bold Italic"
                },
                "Italic":{
                "roman":"Roman",
                "bold":"Bold Italic",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                },
                "Bold":{
                "roman":"Roman",
                "bold":"Bold Italic",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                },
                "LightItalic":{
                "roman":"Light",
                "bold":"Light Italic",
                "italic":"Roman",
                "bolditalic":"Italic" 
                },
                "Light":{
                "roman":"Light",
                "bold":"Roman",
                "italic":"Light Italic",
                "bolditalic":"Italic" 
                }   
            },
            "ZurichLightCondensedBT":{
                "LightCondensed":{  
                "roman":"Light Condensed",
                "bold":"Condensed",
                "italic":"Italic",
                "bolditalic":"Condensed Italic"
                },
                "Condensed":{  
                "roman":"Light Condensed",
                "bold":"Bold Condensed",
                "italic":"Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "BoldCondensed":{
                "roman":"Bold Condensed",
                "bold":"Bold Condensed",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "BoldCondensedItalic":{
                "roman":"Bold Condensed",
                "bold":"Bold Condensed",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "LightCondensedItalic":{
                "roman":"Light Condensed",
                "bold":"Bold Condensed Italic",
                "italic":"Bold Condensed Italic",
                "bolditalic":"Bold Condensed Italic"
                },
                "Regular":{  
                "roman":"Roman",
                "bold":"Bold",
                "italic":"Italic",
                "bolditalic":"Bold Italic"
                },
                "Italic":{
                "roman":"Roman",
                "bold":"Bold Italic",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                },
                "Bold":{
                "roman":"Roman",
                "bold":"Bold Italic",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                },
                "LightItalic":{
                "roman":"Light",
                "bold":"Light Italic",
                "italic":"Roman",
                "bolditalic":"Italic" 
                },
                "Light":{
                "roman":"Light",
                "bold":"Roman",
                "italic":"Light Italic",
                "bolditalic":"Italic" 
                }   
            }
        }
    },
    "coverDetails":{
            "spineCrop":60,
            "removeSpineForOnline":true
      }
}
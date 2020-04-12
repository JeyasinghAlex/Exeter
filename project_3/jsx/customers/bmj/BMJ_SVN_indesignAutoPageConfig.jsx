var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136",
    "defaultUnits":"pt",
    "baseLeading":12,
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
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "toc":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "advert":{
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
      "right":12.4,
      "gutter":12.5
    },
    "geoBoundsVerso":[48.5,40.5,690.819915771485,554.775590551182
    ],
    "geoBoundsRecto":[48.5,635.775590551181,690.819915771485,1150.05159055118
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "OLAE":"LAYOUT1",
    "REVIEW":"LAYOUT1",
    "PROTOCOL":"LAYOUT1",
    "EDITORIAL":"LAYOUT1",
    "RETRACTION":"LAYOUT2",
    "MISCELLANEOUS":"LAYOUT2",
    "CORRECTION":"LAYOUT2"
        },
    "pageColumnDetails":{
        "LAYOUT1":{
               "openerPageColumnDetails":[
                  {"width":197.676, "height":690.84,"floatsCited":false,"gutter":0},
                  {"width":197.676, "height":690.84,"floatsCited":false,"gutter":12.5}
                ],
                "columnDetails":[
                  {"width":247.888, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":247.888, "height":690.81,"floatsCited":false,"gutter":18.5}
                ],
               "openerPageMargin":{
               "top":51,
                "bottom":51.5,
                "inside":146.92,
                "outside":40.5
                },
            "otherPageMargin":{
                "top":48.5,
                "bottom":54,
                "inside":40.5,
                "outside":40.5
                }
            },
         "LAYOUT2":{
            "openerPageColumnDetails":[
                  {"width":365.276, "height":690.84,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":365.276, "height":690.81,"floatsCited":false,"gutter":0}
                ],
               "openerPageMargin":{
               "top":51,
                "bottom":51.5,
                "inside":115,
                "outside":115
                },
            "otherPageMargin":{
                "top":48.5,
                "bottom":54,
                "inside":115,
                "outside":115
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
      "twoThirdWidth":342.8, 
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
            "before":"jrnlHead1,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4",
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
    "nonDefaultLayers":["THANK"
    ],
    
    "docFontsList":[
       {
          "ITC New Baskerville": {
            "Roman": {
                "Symbol": "Medium"
              },
            "Italic": {
                "Symbol": "Italic"
              },
            "Bold": {
                "Symbol": "Bold"
              }
          }
      },
        {
          "Helvetica Neue LT Std (OTF)": {
            "55 Roman": {
                "ITC Zapf Dingbats": "Medium"
            }
          }
      },
        {
          "Myriad Pro": {
            "Regular": {
                "ITC Zapf Dingbats": "Medium"
              }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"ITC New Baskerville", "fontStyle":"Roman"},
            {"fontFamily":"Helvetica Neue LT Std", "fontStyle":"55 Roman"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
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
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "OLAE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
          "REVIEW":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
           "PROTOCOL":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },        
         "RETRACTION":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },        
         "MISCELLANEOUS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },        
         "CORRECTION":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
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
                    "colourValue":"88,53,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"17,10,0,0"
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
                    "colourValue":"10,113,185"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"205,215,238"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },         
        
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "9px",
                    "font-family" : "'Helvetica Neue LT Std', HelveticaNeueLTStd"
                }
            },
            "thead": {
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-75 Bold',HelveticaNeueLTStd-75Bold",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Bd.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-55 Roman',HelveticaNeueLTStd-55Roman",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Roman_0.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "514.276pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/ITCNewBaskervilleRoman/",
                     "ext"     : "ttf",
                  "bold"    : "ITCNewBaskervilleBold",
                  "italic"  : "ITCNewBaskervilleItalic",
                  "bold_italic":"ITCNewBaskervilleBoldItalic",
                  "main"    : "ITCNewBaskervilleRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "514.276pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                  "bold"    : "HelveticaNeueLTStd-Bd",
                  "italic"  : "HelveticaNeueLTStd-It",
                  "bold-italic":"HelveticaNeueLTStd-BdIt",
                  "main":"HelveticaNeueLTStd-Roman_0",
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
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        }
    },
    "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='MISCELLANEOUS']",
            "continueType":"samePage",
            "rulesplit":true,
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                    {"width":365.276, "height":690.84,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":365.276, "height":690.81,"floatsCited":false,"gutter":0}
                ],
               "openerPageMargin":{
               "top":51,
                "bottom":51.5,
                "inside":115,
                "outside":115
                },
            "otherPageMargin":{
                "top":48.5,
                "bottom":54,
                "inside":115,
                "outside":115
                    }
                }
            },
        {"xpath":"//div[@class='CORRECTION']",
            "continueType":"samePage",
            "rulesplit":true,
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                      {"width":365.276, "height":690.84,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":365.276, "height":690.81,"floatsCited":false,"gutter":0}
                ],
               "openerPageMargin":{
               "top":51,
                "bottom":51.5,
                "inside":115,
                "outside":115
                },
            "otherPageMargin":{
                "top":48.5,
                "bottom":54,
                "inside":115,
                "outside":115
                     }             
                }
            },
        {"xpath":"//div[@class='COMMENTARY']",
            "continueType":"samePage",
            "rulesplit":true,
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                      {"width":365.276, "height":690.84,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":365.276, "height":690.81,"floatsCited":false,"gutter":0}
                ],
               "openerPageMargin":{
               "top":51,
                "bottom":51.5,
                "inside":115,
                "outside":115
                },
            "otherPageMargin":{
                "top":48.5,
                "bottom":54,
                "inside":115,
                "outside":115
                     }             
                }
            }
        ],
     "tocDetails":{   
       "singlePageToc": true,
       "maximumTocFrameHeight":433.655,
       "backGroundColor":true,
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
                "maximum":2
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
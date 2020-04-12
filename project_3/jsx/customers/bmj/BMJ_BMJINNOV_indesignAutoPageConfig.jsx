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
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT","COMMENTARY"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "minNoLinesOnPag":3,
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
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[44,56.5,735.700787401575,538.775590551181
    ],
    "geoBoundsRecto":[44,651.775590551181,735.700787401575,1134.05118110236
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "OLAE":"LAYOUT1",
    "REVIEW":"LAYOUT1",
    "COMMENTARY":"LAYOUT1",
    "LETTER":"LAYOUT1",
    "VOFE":"LAYOUT1",
    "THANK":"LAYOUT2",
    "MISCELLANEOUS":"LAYOUT3"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":178.166, "height":694,"floatsCited":false,"gutter":0},
                  {"width":178.166, "height":694,"floatsCited":false,"gutter":14.852}
                ],
            "columnDetails":[
                  {"width":232.087, "height":691.7,"floatsCited":false,"gutter":0},
                  {"width":232.087, "height":691.7,"floatsCited":false,"gutter":18.101}
                ],
            "openerPageMargin":{
                "top":45,
                "bottom":55.5,
                "inside":167.592,
                "outside":56.5 
                },
            "otherPageMargin":{
                "top":44,
                "bottom":58,
                "inside":56.5,
                "outside":56.5 
                }             
             },
        "LAYOUT2":{        
                "openerPageColumnDetails":[
                  {"width":109.319, "height":694,"floatsCited":false,"gutter":0},
                  {"width":109.319, "height":694,"floatsCited":false,"gutter":15},
                  {"width":109.319, "height":694,"floatsCited":false,"gutter":15},
                  {"width":109.319, "height":694,"floatsCited":false,"gutter":15}
                ],
                "columnDetails":[
                  {"width":109.319, "height":691.7,"floatsCited":false,"gutter":0},
                  {"width":109.319, "height":691.7,"floatsCited":false,"gutter":15},
                  {"width":109.319, "height":691.7,"floatsCited":false,"gutter":15},
                  {"width":109.319, "height":691.7,"floatsCited":false,"gutter":15}
                ],
            "openerPageMargin":{
                "top":45,
                "bottom":55.5,
                "inside":167.592,
                "outside":56.5 
                },
            "otherPageMargin":{
                "top":44,
                "bottom":58,
                "inside":56.5,
                "outside":56.5 
                }             
            },
        "LAYOUT3":{        
                "openerPageColumnDetails":[
                  {"width":374, "height":694,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":374, "height":691.7,"floatsCited":false,"gutter":0}
                ],
            "openerPageMargin":{
                "top":45,
                "bottom":55.5,
                "inside":110.638,
                "outside":110.638 
                },
            "otherPageMargin":{
                "top":44,
                "bottom":58,
                "inside":110.638,
                "outside":110.638 
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
      "twoThirdWidth":361.407, 
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead1_After_OL,jrnlHead1_After_UL,jrnlHead2,jrnlHead2_After_OL,jrnlHead2_After_UL,jrnlHead3,jrnlHead3_After_OL,jrnlHead3_After_UL,jrnlHead4,jrnlHead4_After_OL,jrnlHead4_After_UL,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead1_After_OL,jrnlHead1_After_UL,jrnlHead2,jrnlHead2_After_OL,jrnlHead2_After_UL,jrnlHead3,jrnlHead3_After_OL,jrnlHead3_After_UL,jrnlHead4,jrnlHead4_After_OL,jrnlHead4_After_UL,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
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
          "Frutiger LT Std": {
            "48 Light Condensed Italic": {
                "Symbol (T1)": "Italic"
              },
                "65 Bold": {
                    "Symbol (T1)": "Bold"
              },
                "55 Roman": {
                    "Symbol (T1)": "Regular"
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
            {"fontFamily":"Frutiger LT Std", "fontStyle":"48 Light Condensed Italic"},
            {"fontFamily":"Frutiger LT Std", "fontStyle":"55 Roman"},
            {"fontFamily":"Frutiger LT Std", "fontStyle":"65 Bold"},
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
                    "colourValue":"100,75,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"20,15,0,0"
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
                    "colourValue":"0,84,166"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"199,205,232"
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
                    "colourValue":"100,75,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"20,15,0,0"
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
                    "colourValue":"0,84,166"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"199,205,232"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "LETTER":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"60,30,100,40"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"18,9,30,12"
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
                    "colourValue":"79,101,38"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"202,209,190"
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
                    "colourValue":"60,30,100,40"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"18,9,30,12"
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
                    "colourValue":"79,101,38"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"202,209,190"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
         "VOFE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"54,76,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"11,15,0,0"
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
                    "colourValue":"134,89,165"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"231,222,237"
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
                    "colourValue":"45,90,50,2"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"14,27,15,1"
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
                    "colourValue":"153,64,99"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"224,198,208"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
          "COMMENTARY":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"54,76,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"11,15,0,0"
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
                    "colourValue":"134,89,165"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"231,222,237"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
          "THANK":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"54,76,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"11,15,0,0"
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
                    "colourValue":"134,89,165"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"231,222,237"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "8.5px",
                    "font-family" : "'Frutiger LT Pro', Frutiger LT Pro-47 Light Condensed"
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-lightcn.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'Frutiger LT Pro-67 Bold Condensed',FrutigerLTPro-67BoldCondensed",
                    "font-size" : "8.5px",
                    "line-height" : "9.5px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-boldcn_0.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Frutiger LT Pro-47 Light Condensed',FrutigerLTPro-47LightCondensed",
                    "font-size" : "8.5px",
                    "line-height" : "9.5px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "frutigerltpro-condensed/frutigerltpro-lightcn.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "482.276 pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/ClassGarmnd_BT_Font/",
                     "ext"     : "ttf",
                  "bold"    : "CLSGARAB",
                  "italic"  : "CLSGARAI",
                  "bold_italic":"CLSGARBI",
                  "main"    : "CLSGARAN"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "482.276 pt"
              },
              "font" : {
                "size"    : "8.5pt",
                "ledding" : "9.5pt",
                "path"    : "/frutigerltpro-condensed/",
                "ext"     : "otf",
                  "bold"    : "frutigerltpro-boldcn_0",
                  "italic"  : "frutigerltpro-lightcnita",
                  "bold-italic":"frutigerltpro-boldcnita",
                  "main":"frutigerltpro-lightcn",
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
    "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='MISCELLANEOUS']",
            "continueType":"samePage",
            "rulesplit":true,
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                    {"width":374, "height":694,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":374, "height":691.7,"floatsCited":false,"gutter":0}
                ],
            "openerPageMargin":{
                "top":45,
                "bottom":55.5,
                "inside":110.638,
                "outside":110.638 
                },
            "otherPageMargin":{
                "top":44,
                "bottom":58,
                "inside":110.638,
                "outside":110.638
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
                      {"width":374, "height":694,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":374, "height":691.7,"floatsCited":false,"gutter":0}
                ],
            "openerPageMargin":{
                "top":45,
                "bottom":55.5,
                "inside":110.638,
                "outside":110.638 
                },
            "otherPageMargin":{
                "top":44,
                "bottom":58,
                "inside":110.638,
                "outside":110.638
                     }             
                }
            }
        ],
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
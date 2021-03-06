﻿var config = {
    "defaultUnits":"pt",
    "baseLeading":13,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
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
        "width":612,
        "height":792
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
            }
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[86.5,55.4976,748.44,547.4976
    ],
    "geoBoundsRecto":[86.5,676.4976,748.405212402343,1168.4976
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "ARTICLES":"LAYOUT2",
    "EDITORIAL":"LAYOUT3",
    "NEWS":"LAYOUT4"      
    },
    "pageColumnDetails":{
     "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":0},
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":234, "height":664,"floatsCited":false,"gutter":0},
                  {"width":234, "height":664,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":97.5,
                    "bottom":92,
                    "inside":64.5,
                    "outside":55.4
                },
            "otherPageMargin":{
                "top":86.5,
                "bottom":43.5,
                "inside":64.5,
                "outside":55.5
                }
            },
   "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":0},
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":234, "height":664,"floatsCited":false,"gutter":0},
                  {"width":234, "height":664,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":97.5,
                    "bottom":92,
                    "inside":64.5,
                    "outside":55.4
                },
            "otherPageMargin":{
                "top":86.5,
                "bottom":43.5,
                "inside":64.5,
                "outside":55.5
                }
            },
   "LAYOUT3":{        
            "openerPageColumnDetails":[
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":0},
                  {"width":234, "height":604.5,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":234, "height":664,"floatsCited":false,"gutter":0},
                  {"width":234, "height":664,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":97.5,
                    "bottom":92,
                    "inside":64.5,
                    "outside":55.4
                },
            "otherPageMargin":{
                "top":86.5,
                "bottom":43.5,
                "inside":64.5,
                "outside":55.5
                }
            },
   "LAYOUT4":{        
            "openerPageColumnDetails":[
                  {"width":234, "height":456,"floatsCited":false,"gutter":0},
                  {"width":234, "height":456,"floatsCited":false,"gutter":24}
                ],
                "columnDetails":[
                  {"width":234, "height":664,"floatsCited":false,"gutter":0},
                  {"width":234, "height":664,"floatsCited":false,"gutter":24}
                ],
                 "openerPageMargin":{
                    "top":97.5,
                    "bottom":92,
                    "inside":64.5,
                    "outside":55.4
                },
            "otherPageMargin":{
                "top":86.5,
                "bottom":43.5,
                "inside":64.5,
                "outside":55.5
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
            "calcCitationHeight":true,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":340.85, 
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
        "continuedText": "(<i>(Continued)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID]. [CAPTION][ensp](<i>(Continued)</i>)",
//~         "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,BL-T,NL-T,QUOTE-T,TBL_INLINE,jrnlRefHead",
            "after":"BL-B,NL-B,QUOTE-O,QUOTE-B,TBL_INLINE"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,BL-T,NL-T,QUOTE-T,TBL_INLINE,jrnlRefHead",
            "after":"BL-B,NL-B,QUOTE-O,QUOTE-B,TBL_INLINE"
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
          "Minion": {
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
          "Optima": {
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
            {"fontFamily":"Minion", "fontStyle":"Bold"},
            {"fontFamily":"Minion", "fontStyle":"Italic"},
            {"fontFamily":"Minion", "fontStyle":"Roman"},
            {"fontFamily":"Minion", "fontStyle":"Bold Italic"},
            {"fontFamily":"Optima", "fontStyle":"Italic"},
            {"fontFamily":"Optima", "fontStyle":"Roman"},
            {"fontFamily":"Optima", "fontStyle":"Italic"},
            {"fontFamily":"Optima", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,30"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                   "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
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
                    "colourValue":"188,190,192"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
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
                    "colourValue":"0,0,0,30"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                   "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
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
                    "colourValue":"188,190,192"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
       "ARTICLES":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,30"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                   "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
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
                    "colourValue":"188,190,192"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
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
                    "colourValue":"0,0,0,30"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                   "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
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
                    "colourValue":"188,190,192"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },    
       "NEWS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,30"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,20"
                    },
                   "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
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
                    "colourValue":"188,190,192"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"209,211,212"
                    },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
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
                    "font-size" : "8px",
                    "font-family" : "'OptimaLTStd', OptimaLTStd"
                },
                "fontPath"  : "OptimaLTStd/OptimaLTStd.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'OptimaLTStd-Bold',OptimaLTStd-Bold",
                    "font-size" : "8px",
                    "line-height" : "10.5px",
                    "padding" : "2px 0px 1px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'OptimaLTStd',OptimaLTStd",
                    "font-size" : "8.5px",
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
                  "size" : "603pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "13pt",
                  "path"    : "/MinionPro/",
                     "ext"     : "otf",
                  "bold"    : "MinionPro-Bold",
                  "italic"  : "MinionPro-Italic",
                  "bold_italic":"MinionPro-Bold",
                  "main"    : "MinionPro-Regular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "603pt"
              },
              "font" : {
                "size"    : "8.5pt",
                "ledding" : "11pt",
                "path"    : "/OptimaLTStd/",
                "ext"     : "ttf",
                  "bold"    : "OptimaLTStd-Bold",
                  "italic"  : "OptimaLTStd-Italic",
                  "bold_italic":"OptimaLTStd-Bold",
                  "main"    : "OptimaLTStd-Roman"
              }
           }
        },
    "stubColObj":{
        "bottom": {
            "METAINFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        },
        "top": {
            "STUB_COLUMN": true,
            "STUB_STMT": false
        }
    },
    "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                    {"width":492, "height":664,"floatsCited":false,"gutter":0}
                    ],
                    "columnDetails":[
                    {"width":492, "height":664,"floatsCited":false,"gutter":0}
                      ],
                    "openerPageMargin":{
                    "top":97.5,
                    "bottom":92,
                    "inside":64.5,
                    "outside":55.4
                },
            "otherPageMargin":{
                "top":86.5,
                "bottom":43.5,
                "inside":64.5,
                "outside":55.5
                    }
                }
            }
        ]
}
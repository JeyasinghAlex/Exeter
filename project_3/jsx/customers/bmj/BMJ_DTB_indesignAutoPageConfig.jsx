var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136",
    "defaultUnits":"pt",
    "baseLeading":10.5,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "tableColumnHeadSpanRule":false,
    "floatTypeOnFirstPage":"KEY,KEY_BACK,TYPE7",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "allowhyperlinkForPrint":true,
    "pageSize":{
        "width":595.276,
        "height":841.89
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
      "top":12,
      "bottom":12,
      "left":12,
      "right":12,
      "gutter":12
    }, 
    "geoBoundsVerso":[109.984251968503,39.6850393700786,801.354330708661,555.590551181103
    ],
    "geoBoundsRecto":[109.984251968503,634.96062992126,794.89,1150.86614173228
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "REVIEW":"LAYOUT1",   
    "DGRW":"LAYOUT1",   
    "MISCELLANEOUS":"LAYOUT2",
    "CORRECTION":"LAYOUT2",
    "DBST":"LAYOUT3",
    "EDITORIAL":"LAYOUT3",
    "DBCY":"LAYOUT3"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":247.701, "height":691.354,"floatsCited":false,"gutter":0},
                  {"width":247.701, "height":691.354,"floatsCited":false,"gutter":20.503}
                ],
                "columnDetails":[
                  {"width":247.701, "height":691.354,"floatsCited":false,"gutter":0},
                  {"width":247.701, "height":691.354,"floatsCited":false,"gutter":20.503}
                ],
                 "openerPageMargin":{
                    "top":109.984,
                    "bottom":40.535,
                    "inside":39.685,
                    "outside":39.685
                },
            "otherPageMargin":{
               "top":109.984,
               "bottom":40.535,
               "inside":39.685,
               "outside":39.685
                }
            },
        "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                "columnDetails":[
                  {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                 "openerPageMargin":{
                    "top":109.984,
                    "bottom":40.535,
                    "inside":39.685,
                    "outside":39.685
                },
            "otherPageMargin":{
               "top":109.984,
               "bottom":40.535,
               "inside":39.685,
               "outside":39.685
                }
            },
        "LAYOUT3":{        
            "openerPageColumnDetails":[
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":0},
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":14},
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":14},
                ],
                "columnDetails":[
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":0},
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":14},
                  {"width":162.635, "height":691.354,"floatsCited":false,"gutter":14},
                ],
                 "openerPageMargin":{
                    "top":109.984,
                    "bottom":40.535,
                    "inside":39.685,
                    "outside":39.685
                },
            "otherPageMargin":{
               "top":109.984,
               "bottom":40.535,
               "inside":39.685,
               "outside":39.685
                }
            }
         },
         "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
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
            "minimum":[5,10,20],
            "maximum":[10,20,30]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4",
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
          "InterFace": {
            "Regular": {
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
          "MetaBlackLF": {
            "Regular": {
                "Symbol (T1)": "Regular"
              },
                "Italic": {
                    "Symbol (T1)": "Italic"
              },
                "Bold": {
                    "Symbol (T1)": "Regular"
            },
                "Bold Italic": {
                    "Symbol (T1)": "Italic"
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
            {"fontFamily":"InterFace", "fontStyle":"Regular"},
            {"fontFamily":"InterFace", "fontStyle":"Italic"},
            {"fontFamily":"InterFace", "fontStyle":"Bold"},
            {"fontFamily":"InterFace", "fontStyle":"BoldItalic"},
            {"fontFamily":"InterFace", "fontStyle":"Light"},            
            {"fontFamily":"MetaBlackLF", "fontStyle":"Regular"},
            {"fontFamily":"MetaBlackLF", "fontStyle":"Italic"},
            {"fontFamily":"MetaBlackLF", "fontStyle":"Bold"},
            {"fontFamily":"MetaBlackLF", "fontStyle":"BoldItalic"},
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
         {"xpath" : "//div[@class='jrnlMulLogo']", "frame-name":"MULTIMEDIA", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
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
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
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
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                   }
                },   
            "DGRW":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
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
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                   }
                },
             "DBCY":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                   }
                },
            "DBST":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"100,80,0,10"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"50,40,0,5"
                     },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"10,8,0,1"
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
                    "colourValue":"3,70,148"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"126,137,190"
                   },
                 "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"221,223,239"
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
            "spaceAbove":18,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                    {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                "columnDetails":[
                  {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                 "openerPageMargin":{
                    "top":109.984,
                    "bottom":40.535,
                    "inside":39.685,
                    "outside":39.685
                },
            "otherPageMargin":{
               "top":109.984,
               "bottom":40.535,
               "inside":39.685,
               "outside":39.685 
                    }
                }
            },
        {"xpath":"//div[@class='CORRECTION']",
            "continueType":"samePage",
            "spaceAbove":18,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                      {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                "columnDetails":[
                  {"width":372, "height":691.354,"floatsCited":false,"gutter":0},
                ],
                 "openerPageMargin":{
                    "top":109.984,
                    "bottom":40.535,
                    "inside":39.685,
                    "outside":39.685
                },
            "otherPageMargin":{
               "top":109.984,
               "bottom":40.535,
               "inside":39.685,
               "outside":39.685
                     }             
                }
            }
        ]
}
var config = {
    "defaultUnits":"pt",
    "baseLeading":13,
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
    "applyTableLeftRightBorder":false,
    "applyTableBorderWidth":0.3,
    "applyTableBorderColor":"WHITE",
    "calcParaBoundsForStages": {
    "Pre-editing": true,
    "Typesetter QA": true,
    "Author Proof": true,
    "Author Revision": true,
    "Typesetter Check": true,
    "Publisher Check": true,
    "Author Review": true,
    "Publisher Review": true
    },
    "pageSize":{
        "width":439.37,
        "height":666.142
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":14.173
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
      "left":18,
      "right":18,
      "gutter":18
    },
    "geoBoundsVerso":[55.9842519685039,56.6929133858268,594.566929133859,382.677165354331
    ],
    "geoBoundsRecto":[55.9842519685039,496.062992125984,594.566929133858,822.047244094488
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "MULTI":"LAYOUT2"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":325.984, "height":538.583,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":325.984, "height":538.583,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":55.984,
                "bottom":71.575,
                "inside":56.693,
                "outside":56.693
                },
            "otherPageMargin":{
               "top":55.984,
                "bottom":71.575,
                "inside":56.693,
                "outside":56.693
                }
            },
         "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":325.984, "height":538.583,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":325.984, "height":538.583,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":55.984,
                "bottom":71.575,
                "inside":51.024,
                "outside":62.362
                },
            "otherPageMargin":{
               "top":55.984,
                "bottom":71.575,
                "inside":51.024,
                "outside":62.362
                }
             }            
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":"top"
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
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
        "continuedText": "(<i>(cont.)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID].[emsp](<i>(cont.)</i>)",
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
            "before":"",
            "after":""
         },
        "decrease":{
            "before":"",
            "after":""
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5,TXT,TXI",
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
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlRRH']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
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
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "MULTI":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
     "tableSetter": {
        "table": {
          "css": {
            "font-size": "9px",
            "font-family": "'Brill-Roman', BrillRoman"
          },
          "fontPath": "Brill/Brill_Roman_2_06_051.ttf"
        },
        "thead": {
          "css": {
            "font-family": "'Brill-Bold',BrillBold'",
            "font-size": "9px",
            "line-height": "11px",
            "padding": "0px 4px 0px 0px"
          },
          "align": "left",
          "valign": "bottom"
        },
        "tbody": {
          "css": {
            "font-family": "'Brill-Roman', BrillRoman",
            "font-size": "9px",
            "line-height": "11px",
            "padding": "0px 4px 0px 0px"
          },
          "align": "left",
          "valign": "top"
        }
      },
      "equation": {
        "default": {
          "page": {
            "size": "325.984pt"
          },
          "font": {
            "size": "11pt",
            "ledding": "13pt",
            "path": "/Brill/",
            "ext": "ttf",
            "bold": "Brill-Bold",
            "italic": "Brill-Italic",
            "bold_italic": "Brill-BoldItalic",
            "main": "Brill-Roman"
          }
        },
        "jrnlTblBlock": {
          "page": {
            "size": "325.984pt"
          },
          "font": {
            "size": "9pt",
            "ledding": "11pt",
            "path": "/Brill/",
            "ext": "ttf",
            "bold": "Brill-Bold",
            "italic": "Brill-Italic",
            "bold_italic": "Brill-BoldItalic",
            "main": "Brill-Roman"
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
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    }
}
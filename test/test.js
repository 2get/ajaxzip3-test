var assert = chai.assert;

describe("AjaxZip3.zip2addr", function() {
  var zip1, zip2, pref, addr, area, strt;
  var input_zip1, input_zip2, input_pref, input_addr, input_area, input_strt;

  before(function() {
    zip1 = '150';
    zip2 = '8512';
    pref = '東京都';
    addr = '渋谷区';
    area = '桜丘町';
    strt = '２６番１号';

    input_zip1 = document.getElementById('zip1');
    input_zip2 = document.getElementById('zip2');
    input_pref = document.getElementById('pref');
    input_addr = document.getElementById('addr');
    input_area = document.getElementById('area');
    input_strt = document.getElementById('strt');
  })

  afterEach(function() {
    input_zip1.value = '';
    input_zip2.value = '';
    input_pref.value = '';
    input_addr.value = '';
    input_area.value = '';
    input_strt.value = '';
  })

  context("郵便番号を3桁-4桁形式で入力される場合", function() {
    beforeEach(function() {
      input_zip1.value = zip1;
      input_zip2.value = zip2;
    })

    context('都道府県と以降の住所を分ける場合', function() {
      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr", function(done) {
          AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr + area", function(done) {
          AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr + area, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'addr', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr + area + strt", function(done) {
          AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr + area + strt, input_addr.value);
            done();
          }, 200);
        })
      })
    })

    context('都道府県と以降の住所を分けない場合', function() {
      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr')", function() {
        it("住所 = pref + addr", function(done) {
          AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr', 'addr')", function() {
        it("住所 = pref + addr + area", function(done)  {
          AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr + area, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr', 'addr', 'addr')", function() {
        it("住所 = pref + addr + area + strt", function(done) {
          AjaxZip3.zip2addr('zip1', 'zip2', 'addr', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr + area + strt, input_addr.value);
            done();
          }, 200);
        })
      })
    })

    describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'area', 'strt')", function() {
      it("都道府県 = pref, 市町村区 = addr, 町域 = area, 丁目番地 = strt", function(done) {
        AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'area', 'strt');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          assert.equal(area, input_area.value);
          assert.equal(strt, input_strt.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'area')", function() {
      it("都道府県 = pref, 市町村区 = addr, 町域 = area", function(done) {
        AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr', 'area');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          assert.equal(area, input_area.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr')", function() {
      it("都道府県 = pref, 市町村区 = addr", function(done) {
        AjaxZip3.zip2addr('zip1', 'zip2', 'pref', 'addr');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', 'zip2', 'pref')", function() {
      it("都道府県 = pref", function(done) {
        AjaxZip3.zip2addr('zip1', 'zip2', 'pref');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          done();
        }, 200);
      })
    })
  })

  context("ワンボックスで郵便番号7桁を入力させる場合", function() {
    beforeEach(function() {
      input_zip1.value = zip1 + zip2;
    })

    describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'area', 'strt')", function() {
      it("都道府県 = pref, 市区町村 = addr, 町域 = area, 丁目番地 = strt", function(done) {
        AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'area', 'strt');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          assert.equal(area, input_area.value);
          assert.equal(strt, input_strt.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'area')", function() {
      it("都道府県 = pref, 市区町村 = addr, 町域 = area", function(done) {
        AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'area');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          assert.equal(area, input_area.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr')", function() {
      it("都道府県 = pref, 市区町村 = addr", function(done) {
        AjaxZip3.zip2addr('zip1', '', 'pref', 'addr');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          assert.equal(addr, input_addr.value);
          done();
        }, 200);
      })
    })

    describe("AjaxZip3.zip2addr('zip1', '', 'pref')", function() {
      it("都道府県 = pref", function(done) {
        AjaxZip3.zip2addr('zip1', '', 'pref');

        setTimeout(function() {
          assert.equal(pref, input_pref.value);
          done();
        }, 200);
      })
    })

    context('都道府県と以降の住所を分ける場合', function() {
      describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'pref', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr + area", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr + area, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'addr', 'addr')", function() {
        it("都道府県 = pref, 住所 = addr + area + strt", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'pref', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref, input_pref.value);
            assert.equal(addr + area + strt, input_addr.value);
            done();
          }, 200);
        })
      })
    })

    context('都道府県と以降の住所を分けない場合', function() {
      describe("AjaxZip3.zip2addr('zip1', '', 'addr', 'addr')", function() {
        it("住所 = pref + addr", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', '', 'addr', 'addr', 'addr')", function() {
        it("住所 = pref+ addr + area", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr + area, input_addr.value);
            done();
          }, 200);
        })
      })

      describe("AjaxZip3.zip2addr('zip1', '', 'addr', 'addr', 'addr', 'addr')", function() {
        it("住所 = pref + addr + area + strt", function(done) {
          AjaxZip3.zip2addr('zip1', '', 'addr', 'addr', 'addr', 'addr');

          setTimeout(function() {
            assert.equal(pref + addr + area + strt, input_addr.value);
            done();
          }, 200);
        })
      })
    })
  })
});
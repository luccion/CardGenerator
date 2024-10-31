function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        generateCardList(results.data);
        generateCards(results.data);
      },
    });
  }
}

function generateCardList(data) {
  const cardList = document.getElementById('card-list');
  cardList.innerHTML = ''; // 清空之前的卡牌
  let counter = 0;
  data.forEach((cardData) => {
    cardList.innerHTML += createCardPreview(cardData);
    counter++;
  });
  const cardCounter = document.getElementById('totalCount');
  cardCounter.innerHTML = counter;
}

function createCardPreview(cardData) {
  return `
                <div class="card-preview">
                    <div class="card-title">${cardData.name}</div>     
                </div>
            `;
}

function generateCards(data) {
  const cardContainer = document.getElementById('card-container');
  const pageReporter = document.getElementById('pagesReporter');
  cardContainer.innerHTML = ''; // 清空之前的卡牌

  let pageCount = 0;
  let page;
  data.forEach((cardData, index) => {
    if (index % 10 === 0) {
      page = document.createElement('div');
      page.classList.add('page');
      cardContainer.appendChild(page);
      pageCount++;
    }
    page.innerHTML += createCard(cardData);
  });
  pageReporter.innerHTML = pageCount;
}

function createCard(cardData) {
  return `
                <div class="card">
                  <div class="card-head">
                    <div class="card-head-left">
                      <div class="card-title">${cardData.name}</div>
                      <div class="card-type">${cardData.type}</div>
                    </div>
                    <div class="card-cost">${cardData.cost}</div>
                  </div>
                  <div class="card-image">
                       ${readImage(cardData.image)}
                  </div>
                  <div class="card-feet">
                    <div class="card-description">${cardData.description}</div>                   
                    <div class="card-comments">${cardData.comment}</div>                  
                    <div class="card-keyword">${cardData.keyword}</div>
                  </div>              
                </div>
            `;
}

function readImage(imageSrc) {
  let imgElement = '';
  if (imageSrc != '') {
    imgElement = `<img src="${readImage(cardData.image)}" alt="Card Image" />`;
  }
  return imgElement;
}
async function exportToPDF() {
  const loadingSpinner = document.getElementById('loading-spinner');
  const exportBtn = document.getElementById('export-btn');

  // 显示加载指示器
  loadingSpinner.style.display = 'inline-block';
  exportBtn.disabled = true; // 禁用按钮以防重复点击

  try {
    await generatePDF(); // 等待 PDF 生成完成
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // 隐藏加载指示器
    loadingSpinner.style.display = 'none';
    exportBtn.disabled = false; // 重新启用按钮
  }
}

async function generatePDF() {
  const printArea = document.getElementById('print-area');
  const pages = printArea.getElementsByClassName('page');

  const pdf = new jspdf.jsPDF({
    orientation: 'landscape', // 可根据需要修改为 "portrait"
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];

    const canvas = await html2canvas(page, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const imgHeight = canvas.height;
    const imgWidth = canvas.width;

    const aspectRatio = imgWidth / imgHeight;
    const pdfImgWidth = pageWidth;
    let pdfImgHeight = pdfImgWidth / aspectRatio;

    if (pdfImgHeight > pageHeight) {
      const scaleFactor = pageHeight / pdfImgHeight;
      pdfImgHeight *= scaleFactor;
      pdfImgWidth *= scaleFactor;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, pdfImgWidth, pdfImgHeight);

    if (index < pages.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save('cards.pdf');
}

function checkCardLayout(containerWidth, containerHeight, cardWidth, cardHeight, cardsPerRow, cardsPerColumn) {
  // 计算容器的总宽度和总高度
  const totalCardWidth = cardWidth * cardsPerRow;
  const totalCardHeight = cardHeight * cardsPerColumn;

  // 计算容器的可用宽度和高度
  const availableWidth = containerWidth;
  const availableHeight = containerHeight;

  // 输出检查结果
  if (totalCardWidth <= availableWidth && totalCardHeight <= availableHeight) {
    console.log('卡牌布局适合 A4 页面。');
  } else {
    console.log('卡牌布局不适合 A4 页面。');
    console.log(`建议调整：`);
    if (totalCardWidth > availableWidth) {
      console.log(`宽度超出：${totalCardWidth}mm > ${availableWidth}mm`);
    }
    if (totalCardHeight > availableHeight) {
      console.log(`高度超出：${totalCardHeight}mm > ${availableHeight}mm`);
    }
  }
}

// 使用示例
const containerWidth = 210; // A4 页面宽度（mm）
const containerHeight = 297; // A4 页面高度（mm）
const cardWidth = 86; // 卡牌宽度（mm）
const cardHeight = 58; // 卡牌高度（mm）
const cardsPerRow = 2; // 每行卡牌数量
const cardsPerColumn = 5; // 每列卡牌数量

checkCardLayout(containerWidth, containerHeight, cardWidth, cardHeight, cardsPerRow, cardsPerColumn);

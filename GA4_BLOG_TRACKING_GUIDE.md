# 📊 GA4 Blog Tracking Rehberi - ES6 to ES5 Converter

## ✅ Eklenen Tracking Events

Tüm blog yazılarınızda şu events otomatik olarak track ediliyor:

### 🎯 **Blog Performance Events:**
1. **`blog_post_view`** - Blog yazısı görüntüleme
2. **`blog_reading_progress`** - Okuma ilerlemesi (%25, 50, 75, 100)
3. **`blog_engagement_time`** - Sayfada geçirilen süre
4. **`blog_to_tool_conversion`** - Blog'dan tool'a geçiş (en önemli!)
5. **`internal_blog_click`** - Blog yazıları arası geçiş

---

## 📈 GA4 Dashboard'da Görüntüleme

### **1. Realtime Reports**
- **GA4 → Reports → Realtime**
- "Events" bölümünde şu event'leri göreceksiniz:
  - `blog_post_view`
  - `blog_reading_progress` 
  - `blog_to_tool_conversion`

### **2. Events Report**
- **GA4 → Reports → Engagement → Events**
- Bu events'i filter edebilirsiniz:

```
Event name = blog_post_view        # En çok görüntülenen yazılar
Event name = blog_reading_progress  # Okuma completion oranları
Event name = blog_to_tool_conversion # Conversion tracking
```

---

## 🎨 Custom Reports Oluşturma

### **Blog Performance Dashboard:**

#### **Report 1: Blog Popularity**
1. **GA4 → Explore → Blank Report**
2. **Dimensions:** `blog_title`, `blog_category`
3. **Metrics:** `Event count` (blog_post_view)
4. **Visualization:** Table

**Sonuç:** Hangi yazılar daha çok okunuyor

#### **Report 2: Reading Engagement**
1. **GA4 → Explore → Blank Report**
2. **Dimensions:** `blog_title`, `reading_percentage`
3. **Metrics:** `Event count` (blog_reading_progress)
4. **Filter:** Event name = blog_reading_progress
5. **Visualization:** Bar chart

**Sonuç:** Hangi yazılarda %100 okuma oranı daha yüksek

#### **Report 3: Blog to Tool Conversion**
1. **GA4 → Explore → Blank Report**
2. **Dimensions:** `blog_title`, `conversion_type`
3. **Metrics:** `Event count` (blog_to_tool_conversion)
4. **Filter:** Event name = blog_to_tool_conversion
5. **Visualization:** Table

**Sonuç:** Hangi blog yazısı daha çok conversion sağlıyor

---

## 🔍 Specific Queries & Filters

### **En Çok Okunan Blog Yazıları:**
```
Event name = blog_post_view
Group by: blog_title
Sort by: Event count (descending)
```

### **Reading Completion Rate:**
```
Event name = blog_reading_progress
reading_percentage = 100
Group by: blog_title
Metric: Event count / Unique users
```

### **Blog-to-Tool Conversion Rate:**
```
Conversion Events: blog_to_tool_conversion
Source: blog_title
Conversion Rate = (blog_to_tool_conversion) / (blog_post_view) * 100
```

---

## 📊 Expected Metrics

### **Performance Indicators:**

| Metric | Good | Excellent | Tracking Event |
|--------|------|-----------|----------------|
| Reading Progress 25% | >60% | >80% | blog_reading_progress |
| Reading Progress 100% | >20% | >40% | blog_reading_progress |
| Blog-to-Tool Conversion | >5% | >15% | blog_to_tool_conversion |
| Avg. Engagement Time | >2 min | >4 min | blog_engagement_time |

### **Blog Category Performance:**
- **Tutorial** → High view count, medium conversion
- **Step-by-Step Guide** → Medium view, high conversion
- **Compatibility Guide** → Medium view, medium conversion  
- **Tool Comparison** → Lower view, very high conversion

---

## 🎯 Advanced Tracking Insights

### **1. User Flow Analysis:**
```
GA4 → Explore → Path exploration
Starting point: blog_post_view
Ending point: blog_to_tool_conversion
```

### **2. Cohort Analysis:**
```
GA4 → Explore → Cohort exploration
First touch: blog_post_view (by blog_title)
Return event: Any tool usage event
```

### **3. Funnel Analysis:**
```
Step 1: blog_post_view
Step 2: blog_reading_progress (25%)
Step 3: blog_reading_progress (75%)
Step 4: blog_to_tool_conversion
```

---

## 💡 Actionable Insights

### **If Reading Progress is Low:**
- Yazının giriş kısmını daha engaging yapın
- Daha kısa paragraflar kullanın
- Visual elements ekleyin

### **If Conversion Rate is Low:**
- Daha fazla CTA button ekleyin
- Tool linklerini daha prominent yapın
- Value proposition'u güçlendirin

### **If Engagement Time is Short:**
- İçerik kalitesini artırın
- İnternal linking'i güçlendirin
- Related articles bölümünü genişletin

---

## 🚀 Custom Dimension Ekleme (Opsiyonel)

GA4'te daha detaylı tracking için:

### **Custom Dimensions:**
1. **blog_word_count** - Yazı uzunluğu
2. **blog_publish_date** - Yayın tarihi
3. **user_blog_session_count** - Kullanıcının blog session sayısı

### **Custom Metrics:**
1. **blog_conversion_value** - Blog conversion değeri
2. **blog_engagement_score** - Engagement puanı

---

## 📈 Monthly Reporting Template

### **Blog Performance Summary:**

```
Report Period: [Month/Year]

TOP PERFORMING ARTICLES:
1. [Article Name] - [View Count] views, [Conversion Rate]% conversion
2. [Article Name] - [View Count] views, [Conversion Rate]% conversion
3. [Article Name] - [View Count] views, [Conversion Rate]% conversion

ENGAGEMENT METRICS:
- Avg. Reading Progress: [%]
- Avg. Time on Blog: [minutes]
- Blog-to-Tool Conversion Rate: [%]

INSIGHTS & ACTIONS:
- [Insight 1]: [Action]
- [Insight 2]: [Action]
- [Insight 3]: [Action]
```

---

Bu tracking sistemi ile blog'unuzun performance'ını detaylı şekilde ölçebilir ve SEO + conversion optimizasyonu yapabilirsiniz! 🎯

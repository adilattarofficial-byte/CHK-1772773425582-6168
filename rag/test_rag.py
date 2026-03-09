from rag.retrieval import ask_documents

pdf_path = "documents/academic_calendar.pdf"

question = "When are the exams?"

docs = ask_documents(pdf_path, question)

print("Number of docs retrieved:", len(docs))

for doc in docs:
    print("------")
    print(doc.page_content)
from rag.vectorstore import build_vector_store


def ask_documents(pdf_path, question):

    vector_store = build_vector_store(pdf_path)

    docs = vector_store.similarity_search(question, k=3)

    return docs
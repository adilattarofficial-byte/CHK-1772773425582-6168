from rag.vectorstore import build_vector_store


def ask_documents(folder_path, question):

    vector_store = build_vector_store(folder_path)

    docs = vector_store.similarity_search(question, k=3)

    return docs